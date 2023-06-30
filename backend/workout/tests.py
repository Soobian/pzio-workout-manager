from django.urls import include, path
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase, URLPatternsTestCase
from rest_framework import status


class WorkoutTestCase(APITestCase, URLPatternsTestCase):
    urlpatterns = [
        path('api/workout/', include('workout.urls')),
        path('api/', include('workout.urls')),
    ]

    def setUp(self):
        self.url_workout_list = reverse('workout:workout-list')
        self.url_workoutplan_list = reverse('workout:workoutplan-list')
        self.url_set_list = reverse('workout:set-list')
        self.url_reps_list = reverse('workout:reps-list')
        self.url_exercise_list = reverse('workout:exercise-list')

    def test_workout_GET(self):
        """GET METHOD"""

        response = self.client.get(
            self.url_workout_list,
            format='json'
        )
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_workoutplan_GET(self):
        """GET METHOD"""

        response = self.client.get(
            self.url_workoutplan_list,
            format='json'
        )
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_set_GET(self):
        """GET METHOD"""

        response = self.client.get(
            self.url_set_list,
            format='json'
        )
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_reps_GET(self):
        """GET METHOD"""

        response = self.client.get(
            self.url_reps_list,
            format='json'
        )
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_exercise_GET(self):
        """GET METHOD"""

        response = self.client.get(
            self.url_exercise_list,
            format='json'
        )
        self.assertEquals(response.status_code, status.HTTP_200_OK)