"""
Plik zawiera adresy url dla odpowiednich widoków

"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import MeasurementViewSet, MeasurementHistoryViewSet


router = routers.DefaultRouter()
router.register('measurements', MeasurementViewSet)


urlpatterns = [
    path('user/<int:user>', MeasurementHistoryViewSet.as_view(), name='history'),
    path('', include(router.urls)),
]