"""
Plik zawiera zbiór serializatorów modeli bazy danych

- CustomUserSerializer:   Serializator użykowników
- UserParametersSerializer:  Serializator dla parametrów użytkownika

"""
from rest_framework import serializers
from users.models import CustomUser
from .models import UserParameters




class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class UserParametersSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserParameters
        fields = ('user', 'firstname', 'height', 'weight', 'sex', 'age')
