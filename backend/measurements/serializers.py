"""
Plik zawiera serializatory modeli bazy danych

- MeasurementSerializer   Serializator dla parametrów użytkownika

"""
from rest_framework import serializers
from .models import Measurement



class MeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measurement
        fields = ('id', 'userId', 'date', 'chestSize', 'waistSize', 'bicepsSize', 'thighSize')
        