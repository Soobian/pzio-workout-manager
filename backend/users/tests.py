from django.urls import include, path
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase, URLPatternsTestCase
from rest_framework import status


class ExerciseTestCase(APITestCase, URLPatternsTestCase):
    urlpatterns = [
        path('api/user/create', include('users.urls')),
    ]

    def setUp(self):
        self.url_user_create = reverse('users:create_user')
        self.url_user_prameters = reverse('users:parameters-list')

    def test_user_POST(self):
        """POST METHOD"""

        response = self.client.post(
            self.url_user_create,
            {"email": "sth@sth.pl", "password": "haslo345"},
            format='json'
        )
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

    def test_user_parameters_GET(self):
        """GET METHOD"""

        response = self.client.get(
            self.url_user_prameters,
            format='json'
        )
        self.assertEquals(response.status_code, status.HTTP_200_OK)