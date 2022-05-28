from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import MessageModelViewSet, UserModelViewSet
from .views import *

router = DefaultRouter()
router.register(r'message', MessageModelViewSet, basename='message-api')
router.register(r'user', UserModelViewSet, basename='user-api')

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('activate/<str:uid>/<str:token>/', activation),
    path('password/reset/confirm/<str:uid>/<str:token>/', password_reset),
    path('email/reset/confirm/<str:uid>/<str:token>/', username_reset),
]
