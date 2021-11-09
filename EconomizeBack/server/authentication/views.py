from django.shortcuts import render
from rest_framework import generics, status, views, permissions
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from .serializers import CreateUserSerializer, EmailVerificationSerializer, LoginSerializer, UserDetailSerializer, ChangePasswordSerializer
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
import jwt
from django.contrib.sites.shortcuts import get_current_site
from .utils import Util
from django.urls import reverse
from django.http import HttpResponseRedirect
from server import settings

# Create your views here.

# View para criar usuário


class CreateUserView(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request):
        # Cria o usuário
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # Pega os dados para enviar o e-mail
        user_data = serializer.data
        user = User.objects.get(useremail=user_data['useremail'])

        # Gera link com token para ativação
        token = RefreshToken.for_user(user).access_token
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
            return HttpResponseRedirect("http://localhost:4200/home")
            # return Response({'E-mail': 'Ativado com sucesso'}, status=status.HTTP_200_OK)

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


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserDetailSerializer
    lookup_field = "id"
    queryset = User.objects.all()


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = User
    queryset = User.objects.all();
    lookup_field = "id"

    def get_object(self):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():

            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password update successfully',
            }
