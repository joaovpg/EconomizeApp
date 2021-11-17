from django.urls import path
from .views import ListContasView, ContasDetailView, ListTransationsView, TransationsDetailView, ListCategoriasView, CategoriasDetailView

urlpatterns = [
    path('contas/', ListContasView.as_view()),
    path('contas/<int:id>', ContasDetailView.as_view()),
    path('categorias/', ListCategoriasView.as_view()),
    path('transacoes/', ListTransationsView.as_view()),
]
