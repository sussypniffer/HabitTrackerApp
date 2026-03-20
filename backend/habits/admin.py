from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Habit, HabitLog

admin.site.register(Habit)
admin.site.register(HabitLog)