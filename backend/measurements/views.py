"""
Plik zawiera zbiór widoków dostęnych w aplikacji

- MeasurementViewSet   Widok pomiarów użytkownika
- MeasurementHistoryViewSet  Widok Histrorii pomiarów


"""

from rest_framework import viewsets
from .models import Measurement
from .serializers import MeasurementSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

# Create your views here.
class MeasurementViewSet(viewsets.ModelViewSet):
    queryset = Measurement.objects.all()
    serializer_class = MeasurementSerializer
    #permission_classes = [IsAuthenticated] 


class MeasurementHistoryViewSet(generics.ListCreateAPIView):
    serializer_class = MeasurementSerializer
    #permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        user =self.kwargs['user']
        print(user)
        return Measurement.objects.filter(userId=user)