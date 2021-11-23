from django_filters import rest_framework as filters
from .models import Investimentos


class InvestimentsFilter(filters.FilterSet):
    data = filters.DateFilter()
    year = filters.NumberFilter(field_name='data', lookup_expr='year')
    month = filters.NumberFilter(field_name='data', lookup_expr='month')

    class Meta:
        model = Investimentos
        fields = ['data', 'year', 'month']


class TotalsFilter(filters.FilterSet):
    data = filters.DateFilter()
    year = filters.NumberFilter(field_name='data', lookup_expr='year')
    month = filters.NumberFilter(field_name='data', lookup_expr='month')
    tipo = filters.CharFilter(field_name='tipo')

    class Meta:
        model = Investimentos
        fields = ['data', 'year', 'month', 'tipo']
