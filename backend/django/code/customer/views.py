from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializer import CustomUserSerializer, Categoryserializer, CreateProductSerializer,ProductSerializer ,ProductImageSerializer, CartSerializer, AddCartItemSerializer, UpdateCartItemSerializer, CartItemSerializer, OrderSerializer,CreateOrderSerializer
from .models import CustomUser , Product, Category, ProductImage, Cart , CartItem, Order

# Create your views here.
class RegistrationViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = Categoryserializer

class ProductViewSet(ModelViewSet):
    queryset = Product.objects.prefetch_related("images").all()
    serializer_class = ProductSerializer


class ProductImageViewSet(ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer

class CartViewset(ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

class CartItemViewSet(ModelViewSet):
    http_method_names = ['get','post','patch','delete','head','otpions']
    queryset = CartItem.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AddCartItemSerializer
        elif self.request.method == 'PATCH':
            return UpdateCartItemSerializer
        return CartItemSerializer
    
    def get_serializer_context(self):
        cart_id = self.kwargs['cart_pk']
        if not Cart.objects.filter(pk=cart_id).exists():
            return Response('No cart_id found' )
        return {'cart_id': self.kwargs['cart_pk']}
    
    def get_queryset(self):
        return CartItem.objects.select_related('cart','product').filter(cart_id=self.kwargs['cart_pk'])

class OrderViewSet(ModelViewSet):
    queryset = Order.objects.all()
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
            serializer = CreateOrderSerializer(data=request.data, context= {'user_id': self.request.user.id})
            serializer.is_valid(raise_exception=True)
            order = serializer.save()
            serializer = OrderSerializer(order)
            return Response(serializer.data)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateOrderSerializer
        else:
            return OrderSerializer
    

    def get_queryset(self):
        user = self.request.user
        return Order.objects.prefetch_related('items__product').filter(customer_id=user)
    