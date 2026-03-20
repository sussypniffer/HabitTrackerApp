from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

# habits/models.py
class Habit(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(
        max_length=10,
        choices=[('good', 'Good'), ('bad', 'Bad')],
        default='good'
    )

class HabitLog(models.Model):
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE)
    date = models.DateField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.habit.name} - {self.date}"