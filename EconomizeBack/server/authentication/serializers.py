from rest_framework import serializers
from .models import User
from django.contrib import auth


class CreateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ['name, useremail, password']

    def validate(self, attrs):
        name = attrs.get('name', '')

        if not name.isemail():
            raise serializers.ValidationError(
                'O nome deve conter caracteres alfanuméricos')

        return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
