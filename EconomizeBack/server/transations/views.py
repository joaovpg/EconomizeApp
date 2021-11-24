from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import generics, viewsets
from .serializers import TransationsSerializer, ContasSerializer, CategoriasSerializer, ContasDetailSerializer, TransationsDetailSerializer, CategoriasDetailSerializer, getTotalsSerializer, getCategoryTotalSerializer
from .models import Categorias, Contas, Transations, User
from rest_framework import permissions
from django_filters import rest_framework as filters
from .filters import TransationsFilter, TotalsFilter, CategoryTotalFilter
from django.db.models import Sum
from rest_framework.response import Response
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
    queryset = Transations.objects.all().order_by('data')
    serializer_class = TransationsSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filterset_class = TransationsFilter
    filters_backends = (filters.DjangoFilterBackend)

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


class getTotalsView(generics.ListAPIView):
    queryset = Transations.objects.all().order_by(
        'data').annotate(total_price=Sum('valor'))
    serializer_class = getTotalsSerializer

    permission_classes = (permissions.IsAuthenticated,)
    filterset_class = TotalsFilter
    filters_backends = (filters.DjangoFilterBackend)

    def perform_create(self, serializer):
        return serializer.save(idUsuario=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(idUsuario=self.request.user)


class getCategoryTotalView(generics.ListAPIView):
    queryset = Transations.objects.all().order_by(
        'data')
    serializer_class = getCategoryTotalSerializer

    permission_classes = (permissions.IsAuthenticated,)
    filterset_class = CategoryTotalFilter
    filters_backends = (filters.DjangoFilterBackend)

    def perform_create(self, serializer):
        return serializer.save(idUsuario=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(idUsuario=self.request.user)
