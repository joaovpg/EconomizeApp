from django.shortcuts import render
from rest_framework import generics, status, views
from rest_framework.response import Response
from .serializers import CreateUserSerializer
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.sites.shortcuts import get_current_site
from .utils import Util
from django.urls import reverse


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
        absurl = 'http://'+current_site+relativeLink+"?token="+str(token)

        # Envia o link para o e-mail do usuário criado
        email_body = 'Olá '+user.name + \
            '! \n Use o link abaixo para ativar a sua conta \n'+absurl
        data = {'email_body': email_body, 'to_email': user.useremail,
                'email_subject': '[Economize] Verifique seu e-mail'}
        Util.send_email(data)

        return Response(user_data, status=status.HTTP_201_CREATED)


class VerifyEmail(views.APIView):
    pass
