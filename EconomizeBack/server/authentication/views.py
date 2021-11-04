from django.shortcuts import render
from rest_framework import generics
from .serializers import CreateUserSerializer
from .models import User

# Create your views here.


class CreateUserView(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request):
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data

        user = User.objects.get(email=user_data['email'])
