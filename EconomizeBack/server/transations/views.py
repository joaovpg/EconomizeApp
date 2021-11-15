from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import TransationsSerializer, ContasSerializer, CategoriasSerializer, SubcategoriaSerializer
from .models import Categorias, Contas, Subcategoria, Transations, User
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
    serializer_class = ContasSerializer


class ListTransationsView(generics.ListCreateAPIView):
    queryset = Transations.objects.all()
    serializer_class = TransationsSerializer


class TransationsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transations.objects.all()
    serializer_class = TransationsSerializer


class ListCategoriasView(generics.ListCreateAPIView):
    queryset = Categorias.objects.all()
    serializer_class = CategoriasSerializer


class CategoriasDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categorias.objects.all()
    serializer_class = CategoriasSerializer


class ListSubcategoriaView(generics.ListCreateAPIView):
    queryset = Subcategoria.objects.all()
    serializer_class = SubcategoriaSerializer


class SubcategoriaDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subcategoria.objects.all()
    serializer_class = SubcategoriaSerializer
