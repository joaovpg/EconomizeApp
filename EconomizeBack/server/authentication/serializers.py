from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from .models import User
from django.contrib import auth

# Serializer de criação de usuário


class CreateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)
    name = serializers.CharField(min_length=3, max_length=68)
    lastname = serializers.CharField(min_length=3, max_length=120)
    useremail = serializers.EmailField(min_length=3, max_length=255)

    class Meta:
        model = User
        fields = ['name', 'lastname', 'useremail', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

# Serializer para verificação de email


class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = User
        fields = ['token']


# Serializer do Login
class LoginSerializer(serializers.ModelSerializer):
    useremail = serializers.EmailField(max_length=255, min_length=3)
    password = serializers.CharField(
        max_length=68, min_length=3, write_only=True)
    tokens = serializers.CharField(max_length=68, min_length=6, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'useremail', 'password', 'tokens']

    # Validações do login
    def validate(self, attrs):
        useremail = attrs.get('useremail', '')
        password = attrs.get('password', '')

        user = auth.authenticate(useremail=useremail, password=password)

        # Verifica se as credências estão corretas
        if not user:
            raise AuthenticationFailed(
                'Usuário ou senha incorretos')

        # Verifica se a conta está desabilitada
        if not user.is_active:
            raise AuthenticationFailed('Conta desabilitada')

        # Verifica se a conta foi verificada
        if not user.is_verified:
            raise AuthenticationFailed('E-mail não foi verificado')

        # Retorna estes dados
        return {
            'id': user.id,
            'useremail': user.useremail,
            'tokens': user.tokens()
        }


class UserDetailSerializer(serializers.ModelSerializer):
    useremail = serializers.EmailField(
        max_length=68, min_length=3, read_only=True)
    name = serializers.CharField(min_length=3, max_length=68)
    lastname = serializers.CharField(min_length=3, max_length=120)

    class Meta:
        model = User
        fields = ['id', 'name', 'lastname', 'useremail']


class ChangePasswordSerializer(serializers.Serializer):
    model = User

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)