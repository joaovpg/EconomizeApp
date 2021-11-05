from rest_framework import serializers
from .models import User
from django.contrib import auth


class CreateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)
    name = serializers.CharField(min_length=1, max_length=255)

    class Meta:
        model = User
        fields = ['name', 'useremail', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
