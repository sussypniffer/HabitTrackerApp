from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HabitViewSet, HabitLogViewSet

router = DefaultRouter()
router.register(r'habits', HabitViewSet)
router.register(r'logs', HabitLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
]