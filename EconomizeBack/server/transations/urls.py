from django.urls import path
from .views import ListContasView, ContasDetailView, ListTransationsView, TransationsDetailView, ListCategoriasView, CategoriasDetailView, ListSubcategoriaView, SubcategoriaDetailView

urlpatterns = [
    path('contas/', ListContasView.as_view(), name="contas"),
]
