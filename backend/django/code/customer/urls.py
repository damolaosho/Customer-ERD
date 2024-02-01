from rest_framework_nested import routers

from . import views

router = routers.DefaultRouter()
router.register('registration',views.RegistrationViewSet)
router.register('category',views.CategoryViewSet)
router.register('product',views.ProductViewSet)
router.register('image', views.ProductImageViewSet)
router.register('cart', views.CartViewset)
router.register('order', views.OrderViewSet)


cart_router = routers.NestedDefaultRouter(router,'cart',lookup='cart')
cart_router.register('items',views.CartItemViewSet, basename='cart-items')

urlpatterns = router.urls + cart_router.urls