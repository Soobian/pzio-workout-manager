"""
Plik zawiera klasy reprezentujące utworzone tabele w bazie danych z odpowiednimi atrybutami

- CustomAccountManager Tabela zawierająca informacje na temat administratora
- CustomUser Tabela przechowująca informacje na temat użytkownika
- UserParameters Tabela zawierająca dodatkowe parametry użytkownika

"""
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


# Create your models here.
class CustomAccountManager(BaseUserManager):
    def create_superuser(self, email, password, **other_fields):
        """
        Funkcja tworząca instancje super użytkownika, czyli administratora
        @param email: adres a-mail
        @param password: hasło
        @return: nowy administrator
        """
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, password, **other_fields)

    def create_user(self, email, password, **other_fields):
        """
        Funkcja tworząca nowego użytkownika
        @param email: adres e-mail
        @param password: silne hasło
        @return: nowy użytkownik
        """
        if not email:
            raise ValueError(_('You must provide an email address.'))

        email = self.normalize_email(email)
        user = self.model(email=email, **other_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    date_joined = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class UserParameters(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True, verbose_name='User')
    firstname = models.TextField(max_length=50, default="")
    height = models.FloatField()
    weight = models.FloatField()
    sex = models.TextField(max_length=10)
    age = models.IntegerField()

    def __str__(self):
        return self.user

    class Meta:
        ordering = ['user']
