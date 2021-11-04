from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin)
# from rest_framework_simplejwt.tokens import RefreshToken

# Create your models here.


class UserManager(BaseUserManager):
    # Cria um usuário comum
    def create_user(self, name, useremail, password=None):
        # Condições de criação
        if name is None:
            raise TypeError('Usuários devem ter um nome')
        if useremail is None:
            raise TypeError('Usuários devem ter um e-mail')

        # Define uma senha para o usuário
        user = self.model(name=name, email=self.normalize_email(useremail))
        user.set_password(password)
        user.save()
        return user

    # Cria um super usuário
    def create_superuser(self, name, useremail, password=None):
        # Condições de criação
        if password is None:
            raise TypeError('A senha não pode ser nula')

        # Define os direitos de super usuário
        user = self.create_user(name, useremail, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=255)
    useremail = models.EmailField(max_length=255, unique=True)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'useremail'
    REQUIRED_FIELDS = ['name']

    objects = UserManager()

    def __str__(self):
        return self.useremail

    # def tokens(self):
    #     refresh = ResfreshToken.for_user(self)
    #     return {
    #         'refresh': str(refresh),
    #         'access': str(refresh.access_token)
    #     }
