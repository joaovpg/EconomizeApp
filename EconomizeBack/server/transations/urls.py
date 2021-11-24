from django.urls import path
from .views import ListContasView, ContasDetailView, ListTransationsView, TransationsDetailView, ListCategoriasView, CategoriasDetailView, getTotalsView, getCategoryTotalView

urlpatterns = [
    path('contas/', ListContasView.as_view()),
    path('contas/<int:id>', ContasDetailView.as_view()),
    path('categorias/', ListCategoriasView.as_view()),
    path('categorias/<int:id>', CategoriasDetailView.as_view()),
    path('transacoes/', ListTransationsView.as_view()),
    path('transacoes/<int:id>', TransationsDetailView.as_view()),
    path('transacoes/total', getTotalsView.as_view()),
    path('transacoes/categoria-total', getCategoryTotalView.as_view()),
]
