from django.urls import path
from .views import ListContasView, ContasDetailView, ListInvestimentsView, InvestimentsDetailView, ListCategoriasView, CategoriasDetailView, getTotalsView, getCategoryTotalView

urlpatterns = [
    path('contas/', ListContasView.as_view()),
    path('contas/<int:id>', ContasDetailView.as_view()),
    path('categorias/', ListCategoriasView.as_view()),
    path('categorias/<int:id>', CategoriasDetailView.as_view()),
    path('investiments/', ListInvestimentsView.as_view()),
    path('investiments/<int:id>', InvestimentsDetailView.as_view()),
    path('investiments/total', getTotalsView.as_view()),
    path('investiments/categoria-total', getCategoryTotalView.as_view()),
]