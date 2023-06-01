"""
Plik zawiera zarejestrowane modele bazy

"""
from django.contrib import admin
from .models import Measurement


admin.site.register(Measurement)
