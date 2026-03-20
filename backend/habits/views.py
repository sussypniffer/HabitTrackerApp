from django.http import HttpResponse
from rest_framework import viewsets
from .models import Habit, HabitLog
from .serializers import HabitSerializer, HabitLogSerializer

def index(request):
    return HttpResponse("Hello, this is the Habit Tracker app!")

class HabitViewSet(viewsets.ModelViewSet):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer

class HabitLogViewSet(viewsets.ModelViewSet):
    queryset = HabitLog.objects.all()
    serializer_class = HabitLogSerializer