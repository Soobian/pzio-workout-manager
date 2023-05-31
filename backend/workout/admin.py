"""
Plik zawiera zarejestrowane modele bazy

"""
from django.contrib import admin
from .models import MuscleGroup, Exercise, WorkoutPlan, WorkoutPlanDay, WorkoutPlanDayExercise, WorkoutPlanDayExerciseSets


admin.site.register(MuscleGroup)
admin.site.register(Exercise)
admin.site.register(WorkoutPlan)
admin.site.register(WorkoutPlanDay)
admin.site.register(WorkoutPlanDayExercise)
admin.site.register(WorkoutPlanDayExerciseSets)
