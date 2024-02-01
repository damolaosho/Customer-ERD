from decimal import Decimal
from django.db import transaction
from rest_framework import serializers
from .models import CustomUser, Category, ProductImage, Product, Cart, CartItem, Order, OrderDetails


class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True,required=True)
    class Meta:
        model = CustomUser
        fields = ['id',"email","first_name","last_name","address","phone_number","profile_image","password"]

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user
    
class Categoryserializer(serializers.ModelSerializer):
    products_count = serializers.IntegerField(read_only=True)
    class Meta:
        model = Category
        fields = ["id","category_name",'products_count']


class ProductImageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ProductImage
        fields = ['image_url']

class CreateProductSerializer(serializers.ModelSerializer):
    # images = serializers.HyperlinkedRelatedField(
    #     queryset=ProductImage.objects.all(),
    #     view_name='productimage-detail'
        
    # )
    class Meta:
        model = Product
        fields = ['id','name','description','price','inventory','category']


    def create(self, validated_data):
        image = validated_data.pop("images",[])
        product = Product.objects.create(**validated_data)
        print(image)
        ProductImage.objects.create(product=product,image_url=image)
        return product
    
class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.category_name",read_only=True)
    images = ProductImageSerializer(read_only=True,many=True)
    image_url = serializers.ImageField(allow_empty_file=False, use_url=False,write_only=True)
    class Meta:
        model = Product
        fields = ['id','name','description','price','inventory','category','category_name','images',"image_url"]

    def create(self, validated_data):
        image = validated_data.pop("image_url",[])
        product = Product.objects.create(**validated_data)
        ProductImage.objects.create(product=product,image_url=image)
        return product
    
class SimpleProductSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Product
        fields = ["id","name","price"]

class CartItemSerializer(serializers.ModelSerializer):
    product = SimpleProductSerializer()
    sub_price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ["id","product","quantity","sub_price"]

    def get_sub_price(self,obj):
        return obj.quantity * obj.product.price
    

class AddCartItemSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField()
    


    def validate_product_id(self, value):
        if not Product.objects.filter(pk=value).exists():
            raise serializers.ValidationError("No product with the given id found")
        return value
    
    def validate_cart_id(self, value):
        if not value:
            if not Cart.objects.filter(pk=value).exists():
                raise serializers.ValidationError("No cart with the given cart_id found")
        return value
    
    def save(self, **kwargs):
        product_id = self.validated_data['product_id']
        quantity = self.validated_data['quantity']
        cart_id = self.context['cart_id']
        try:
            cart_item = CartItem.objects.get(cart_id=cart_id,product_id=product_id)
            cart_item.quantity += quantity
            cart_item.save()
            self.instance = cart_item
        except CartItem.DoesNotExist:
            self.instance = CartItem.objects.create(cart_id=cart_id, **self.validated_data)
        
        return self.instance
        
    class Meta:
        model = CartItem
        fields = ['id','product_id','quantity']

class UpdateCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['quantity']

class CartSerializer(serializers.ModelSerializer):
    id =serializers.UUIDField(read_only=True)
    items = CartItemSerializer(many=True,read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id','items','total_price']

    def get_total_price(self, cart):
        return sum([item.quantity *item.product.price for item in cart.items.all()])


class OrderItemSerializer(serializers.ModelSerializer):
    Product = SimpleProductSerializer()
    class Meta:
        model = OrderDetails
        fields = ['id','product','quantity','sub_total']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    class Meta:
        model = Order
        fields = ['id','items','order_date','customer','total_amount']

class CreateOrderSerializer(serializers.Serializer):
    cart_id = serializers.UUIDField()

 

    def validate_cart_id(self,value):
        if not Cart.objects.filter(pk=value).exists():
            raise serializers.ValidationError('No cart with the given id found')
        if CartItem.objects.filter(cart_id=value).count() == 0:
            raise serializers.ValidationError('The cart is empty.')
        return value

    def save(self, **kwargs):
        #with transaction library any block of code inside the transaction will have to execute all changes before it save it
        with transaction.atomic():
            cart_id = self.validated_data['cart_id']

            user_id =self.context['user_id']
            customer_id= CustomUser.objects.get(id=user_id)
            cart_items = CartItem.objects.select_related('product').filter(cart_id=cart_id)
            total_amount = sum([item.quantity *item.product.price for item in cart_items.all()])
            t = Order()
            print(type(t.total_amount))
            order = Order.objects.create(customer=customer_id,total_amount=(int(total_amount)))

            order_items = [
                OrderDetails(
                order = order, product = item.product, 
                sub_total = item.product.price * item.quantity,
                quantity = item.quantity, 
            ) for item in cart_items
            ]

            OrderDetails.objects.bulk_create(order_items)
            Cart.objects.filter(pk=cart_id).delete()


            return order