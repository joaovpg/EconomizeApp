from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import generics, viewsets
from .serializers import InvestimentsSerializer, ContasSerializer, CategoriasSerializer, ContasDetailSerializer, InvestimentsDetailSerializer, CategoriasDetailSerializer, getTotalsSerializer, getCategoryTotalSerializer
from .models import Categoriass, Contass, Investimentos, User
from rest_framework import permissions
from django_filters import rest_framework as filters
from .filters import InvestimentsFilter, TotalsFilter, CategoryTotalFilter
from django.db.models import Sum
from rest_framework.response import Response
# Create your views here.


class ListContasView(generics.ListCreateAPIView):
    queryset = Contass.objects.all()
    serializer_class = ContasSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        return serializer.save(idUsuario=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(idUsuario=self.request.user)


class ContasDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contass.objects.all()
    serializer_class = ContasDetailSerializer
    lookup_field = "id"
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        return serializer.save(idUsuario=self.request.user)

 #   Filtra as informações pelo id do usuário
    def get_queryset(self):
        return self.queryset.filter(idUsuario=self.request.user)


class ListCategoriasView(generics.ListCreateAPIView):
    queryset = Categoriass.objects.all()
    serializer_class = CategoriasSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        return serializer.save(idUsuario=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(idUsuario=self.request.user)


class CategoriasDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categoriass.objects.all()
    serializer_class = CategoriasDetailSerializer
    lookup_field = "id"
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        return serializer.save(idUsuario=self.request.user)

 #   Filtra as informações pelo id do usuário
    def get_queryset(self):
        return self.queryset.filter(idUsuario=self.request.user)


class ListInvestimentsView(generics.ListCreateAPIView):
    queryset = Investimentos.objects.all().order_by('data')
    serializer_class = InvestimentsSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filterset_class = InvestimentsFilter
    filters_backends = (filters.DjangoFilterBackend)

    def perform_create(self, serializer):
        return serializer.save(idUsuario=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(idUsuario=self.request.user)


class InvestimentsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Investimentos.objects.all()
    serializer_class = InvestimentsDetailSerializer
    lookup_field = "id"
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        return serializer.save(idUsuario=self.request.user)

 #   Filtra as informações pelo id do usuário
    def get_queryset(self):
        return self.queryset.filter(idUsuario=self.request.user)


class getTotalsView(generics.ListAPIView):
    queryset = Investimentos.objects.all().order_by(
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
    queryset = Investimentos.objects.all().order_by(
        'data')
    serializer_class = getCategoryTotalSerializer

    permission_classes = (permissions.IsAuthenticated,)
    filterset_class = CategoryTotalFilter
    filters_backends = (filters.DjangoFilterBackend)

    def perform_create(self, serializer):
        return serializer.save(idUsuario=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(idUsuario=self.request.user)

