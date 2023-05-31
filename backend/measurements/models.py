"""
Klasa reprezentująca utworzoną tabelę w bazie danych z odpowiednimi atrybutami

- Measurement Tabela zawierająca informacje na temat wymiarów użytkownika

"""
from django.db import models
from users.models import CustomUser

# Create your models here.


class Measurement(models.Model):

    userId = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='measurements')
    date = models.DateField(auto_now_add=True)
    chestSize = models.IntegerField(blank=False, null=False)
    waistSize = models.IntegerField(blank=False, null=False)
    bicepsSize = models.IntegerField(blank=False, null=False)
    thighSize = models.IntegerField(blank=False, null=False)

    def __str__(self) -> str:
        return self.userId + ' - ' + self.date