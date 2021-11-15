from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_decode
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from .models import User
from django.contrib import auth
from django.utils.encoding import force_str
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

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
    token_access = serializers.CharField(
        max_length=68, min_length=6, read_only=True)
    token_refresh = serializers.CharField(
        max_length=68, min_length=6, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'useremail', 'password',
                  'token_access', 'token_refresh']

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
            'token_access': user.token_access(),
            'token_refresh': user.token_refresh()
        }


class UserDetailSerializer(serializers.ModelSerializer):
    useremail = serializers.EmailField(
        max_length=68, min_length=3, read_only=True)
    name = serializers.CharField(min_length=3, max_length=68)
    lastname = serializers.CharField(min_length=3, max_length=120)

    class Meta:
        model = User
        fields = ['id', 'name', 'lastname', 'useremail']


# Serializers para o "Esqueci minha senha"

class ChangePasswordSerializer(serializers.Serializer):
    model = User

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class ResquestResetPasswordSerializer(serializers.Serializer):
    useremail = serializers.EmailField(min_length=2, max_length=255)

    class Meta:
        fields = ['useremail']

    def validate(self, attrs):
        return super().validate(attrs)


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('O link de reset é inválido', 401)

            user.set_password(password)
            user.save()

            return (user)

        except Exception as e:
            raise AuthenticationFailed('O link de reset é inválido', 401)
        return super().validate(attrs)


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_message = {
        'bad_token': ('Token expirado ou inválido')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()

        except TokenError:
            self.fail('bad_token')
