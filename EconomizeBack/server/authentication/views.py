from django.shortcuts import render
from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework import permissions
from .serializers import CreateUserSerializer, EmailVerificationSerializer, LoginSerializer, UserDetailSerializer, ChangePasswordSerializer, ResquestResetPasswordSerializer, SetNewPasswordSerializer, LogoutSerializer
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
import jwt
from django.contrib.sites.shortcuts import get_current_site
from .utils import Util
from django.urls import reverse
from django.http import HttpResponseRedirect
from server import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

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
    permission_classes = (permissions.IsAuthenticated,)
    queryset = User.objects.all()

    def perform_create(self, serializer):
        return serializer.save(useremail=self.request.user)

#   Filtra as informações pelo id do usuário
    def get_queryset(self):
        return self.queryset.filter(useremail=self.request.user)


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = User
    lookup_field = "id"
    queryset = User.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():

            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response({
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password update successfully',
            }, status=status.HTTP_200_OK)


# Views para o "Esqueci minha senha"

class RequestResetPasswordView(generics.GenericAPIView):
    serializer_class = ResquestResetPasswordSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        # Solicita o e-mail do usuário
        useremail = request.data.get('useremail', '')

        # Verifica se o e-mail existe na base de dados
        if User.objects.filter(useremail=useremail).exists():
            user = User.objects.get(useremail=useremail)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(request=request).domain
            relativeLink = reverse(
                'password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})

            redirect_url = request.data.get(
                'redirect_url', 'password-reset-complete')
            absurl = 'http://'+current_site+relativeLink

            resetComplete = 'http://'+current_site+'/auth/password-reset-complete'

            email_body = 'Parece que você esqueceu sua senha \n\nUse o primeiro link para pegar o código de redefinição e o segundo para redefinir sua senha\n\n Gere seu código: \n' + \
                absurl + '\n\nFaça a alteração: \n' + resetComplete

            data = {'email_body': email_body, 'to_email': user.useremail,
                    'email_subject': '[Economize] Reset de senha'}
            Util.send_email(data)

            return Response({'success': 'Enviamos um e-mail com um link para redefinir sua senha'}, status=status.HTTP_200_OK)


class PasswordTokenCheckAPI(generics.GenericAPIView):

    def get(self, request, uidb64, token):

        redirect_url = request.GET.get('redirect_url')

        try:
            id = smart_str(urlsafe_base64_decode(uidb64))

            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Token inválido, por favor faz uma nova requisição'})

            return Response({'success:': True, 'message': 'Credenciais válidas', 'uidb64': uidb64, 'token': token}, status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError as identifier:
            return Response({'error': 'Token inválido, por favor faz uma nova requisição'}, status=status.HTTP_400_BAD_REQUEST)


class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response({'success': True, 'message': 'Senha redefinida com sucesso'}, status=status.HTTP_200_OK)


class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
