from django.shortcuts import render
from rest_framework import generics, status, views
from rest_framework.response import Response
from .serializers import CreateUserSerializer, EmailVerificationSerializer, LoginSerializer
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
import jwt
from django.contrib.sites.shortcuts import get_current_site
from .utils import Util
from django.urls import reverse
from server import settings

# Create your views here.

# View para criar usuário


class CreateUserView(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        user = User.objects.get(useremail=user_data['useremail'])
        token = RefreshToken.for_user(user).access_token

        # Gera link com token para ativação
        current_site = get_current_site(request).domain
        relativeLink = reverse('email-verify')

        # Envia o link para o e-mail do usuário criado
        absurl = 'http://'+current_site+relativeLink+"?token="+str(token)
        email_body = 'Olá '+user.name + \
            '!\nUse o link abaixo para ativar a sua conta: \n\n' + absurl + \
            '\n\nObrigado por utilizar nosso serviço! \nCordialmente, Equipe Economize.'
        data = {'email_body': email_body, 'to_email': user.useremail,
                'email_subject': '[Economize] Verifique seu e-mail'}
        Util.send_email(data)

        return Response(user_data, status=status.HTTP_201_CREATED)


class VerifyEmail(views.APIView):
    serializer_class = EmailVerificationSerializer

    def get(self, request):
        token = request.GET.get('token')

        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms='HS256')
            user = User.objects.get(id=payload['user_id'])

            if not user.is_verified:
                user.is_verified = True
                user.save()
            return Response({'E-mail': 'Ativado com sucesso'}, status=status.HTTP_200_OK)

        except jwt.ExpiredSignatureError as identifier:
            return Response({'Erro': 'Token expirado'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'Erro': 'Token inválido'}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
