# Generated by Django 3.2.8 on 2022-01-15 15:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workout', '0002_auto_20220115_1549'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workoutplandayexercise',
            name='workoutPlanDayId',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='workoutplanexercises', to='workout.workoutplanday'),
        ),
        migrations.AlterField(
            model_name='workoutplandayexercisesets',
            name='workoutPlanDayExerciseId',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='workoutplanexercisessets', to='workout.workoutplandayexercise'),
        ),
    ]
