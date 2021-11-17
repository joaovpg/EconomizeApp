from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import TransationsSerializer, ContasSerializer, CategoriasSerializer, ContasDetailSerializer, TransationsDetailSerializer, CategoriasDetailSerializer
from .models import Categorias, Contas, Transations, User
from rest_framework import permissions
from .permissions import IsOwner
# Create your views here.

 
class ListContasView(generics.ListCreateAPIView):
    queryset = Contas.objects.all()
    serializer_class = ContasSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        return serializer.save(idUsuario=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(idUsuario=self.request.user)


class ContasDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contas.objects.all()
    serializer_class = ContasDetailSerializer
    lookup_field = "id"
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        return serializer.save(idUsuario=self.request.user)

 #   Filtra as informações pelo id do usuário
    def get_queryset(self):
        return self.queryset.filter(idUsuario=self.request.user)

class ListCategoriasView(generics.ListCreateAPIView):
    queryset = Categorias.objects.all()
    serializer_class = CategoriasSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        return serializer.save(idUsuario=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(idUsuario=self.request.user)


class CategoriasDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categorias.objects.all()
    serializer_class = CategoriasDetailSerializer
    lookup_field = "id"
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        return serializer.save(idUsuario=self.request.user)

 #   Filtra as informações pelo id do usuário
    def get_queryset(self):
        return self.queryset.filter(idUsuario=self.request.user)


class ListTransationsView(generics.ListCreateAPIView):
    queryset = Transations.objects.all()
    serializer_class = TransationsSerializer

    def perform_create(self, serializer):
         return serializer.save(idUsuario=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(idUsuario=self.request.user)


class TransationsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transations.objects.all()
    serializer_class = TransationsDetailSerializer
    lookup_field = "id"
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        return serializer.save(idUsuario=self.request.user)

 #   Filtra as informações pelo id do usuário
    def get_queryset(self):
        return self.queryset.filter(idUsuario=self.request.user)
