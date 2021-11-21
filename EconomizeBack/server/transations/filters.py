from django_filters import rest_framework as filters
from .models import Transations


class TransationsFilter(filters.FilterSet):
    data = filters.DateFilter()
    year = filters.NumberFilter(field_name='data', lookup_expr='year')
    month = filters.NumberFilter(field_name='data', lookup_expr='month')

    class Meta:
        model = Transations
        fields = ['data', 'year', 'month']
