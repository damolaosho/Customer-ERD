from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin
from uuid  import uuid4
from .manager import CustomUserManager

# Create your models here.

class CustomUser(AbstractBaseUser,PermissionsMixin):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50,blank=True,null=True,unique=True)
    address = models.CharField(max_length=150)
    phone_number = models.IntegerField()
    profile_image = models.ImageField(upload_to='merchstore/images' )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    objects = CustomUserManager()

    def __str__(self) -> str:
        return self.email
    
class Interaction(models.Model):
    customer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    interaction_date =models.DateTimeField()
    interaction_type = models.CharField(max_length=150)
    interaction_details = models.TextField()
    

class Category(models.Model):
    category_name = models.CharField(max_length=150)

    def __str__(self) -> str:
        return self.category_name

class Product(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    inventory = models.IntegerField()
    category = models.ForeignKey(Category,on_delete=models.PROTECT,related_name='products')

    def __str__(self) -> str:
        return self.name

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    
    image_url = models.ImageField(upload_to='merchstore/product/images')

    def __str__(self) -> str:
        return self.product.name

class Cart(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid4)
    created_at = models.DateTimeField(auto_now_add=True)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items') 
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField()


    class Meta:
        unique_together = [['cart','product']]

class Order(models.Model):
    customer = models.ForeignKey(CustomUser,on_delete=models.PROTECT)
    order_date = models.DateTimeField(auto_now_add=True)
    total_amount = models.IntegerField()

class OrderDetails(models.Model):
    order = models.ForeignKey(Order, on_delete=models.PROTECT, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT,related_name='orderitems')
    quantity = models.PositiveSmallIntegerField()
    sub_total = models.IntegerField()

class Review(models.Model):
    Product=models.ForeignKey(Product,on_delete=models.CASCADE,related_name='reviews')
    customer = models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name='reviews')
    description = models.TextField()
    date = models.DateField(auto_now_add=True)