"""
Plik zawiera klasy reprezentujące utworzone tabele w bazie danych z odpowiednimi atrybutami

- MuscleGroup: Tabela reprezentująca grupy mięśni
- Exercise: Tabela przechowująca informacje na temat ćwiczeń
- WorkoutPlan: Tabela zawierająca informacje na temat dostępnych planów ćwiczeniowych
- WorkoutPlanDay: Tabela zawierająca szczegółowe dane na temat danych planów ćwiczeniowych
- WorkoutPlanDayExercise: Tabela zbiorów ćwiczeń dostępnych w ramach danego planu ćwiczeń
- WorkoutPlanDayExerciseSets: Tabela zawierająca dokładne dane na temat sposobu wykonania ćwiczenia

"""
from django.db import models
from users.models import CustomUser
#from exercise.models import Exercise



class MuscleGroup(models.Model):
    name = models.TextField(max_length=100, blank=False, null=False)
    description = models.TextField(max_length=500, blank=False, null=False)
    photo_link = models.TextField(max_length=500, blank=False, null=True)

    def __str__(self) -> str:
        return self.name


class Exercise(models.Model):
    name = models.TextField(max_length=100, blank=False, null=False)
    description = models.TextField(max_length=500, blank=False, null=False)
    photo_link = models.TextField(max_length=500, blank=False, null=True)
    musclegroups = models.ManyToManyField(MuscleGroup)

    def __str__(self) -> str:
        return self.name


class WorkoutPlan(models.Model):
    LEVELS = (
        (1, 'Beginner'),
        (2, 'Intermediate'),
        (3, 'Advanced'),
    )

    userId = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.TextField(max_length=30, blank=False, null=False)
    level = models.IntegerField(choices=LEVELS, null=False)
    description = models.TextField(max_length=500, blank=False, null=False)
    photo_link = models.TextField(max_length=500, blank=False, null=False)

    def __str__(self) -> str:
        return self.name


class WorkoutPlanDay(models.Model):
    workoutPlanId = models.ForeignKey(WorkoutPlan, related_name='workoutplanday', on_delete=models.CASCADE)
    name = models.TextField(max_length=30, blank=False, null=False)
    description = models.TextField(max_length=500, blank=False, null=False)

    def __str__(self) -> str:
        return self.name


class WorkoutPlanDayExercise(models.Model):
    workoutPlanDayId = models.ForeignKey(WorkoutPlanDay, related_name='workoutplanexercises', on_delete=models.CASCADE)
    exerciseId = models.ForeignKey(Exercise, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return str(self.workoutPlanDayId) + str(self.exerciseId)


class WorkoutPlanDayExerciseSets(models.Model):
    workoutPlanDayExerciseId = models.ForeignKey(WorkoutPlanDayExercise, related_name='workoutplanexercisessets', on_delete=models.CASCADE)
    reps = models.IntegerField(blank=False, null=False)
    series = models.IntegerField(blank=False, null=False, default=5)

    def __str__(self) -> str:
        return self.workoutPlanDayExerciseId
