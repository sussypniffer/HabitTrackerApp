from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from habits.views import HabitViewSet, HabitLogViewSet

router = routers.DefaultRouter()
router.register(r'habits', HabitViewSet)
router.register(r'logs', HabitLogViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]