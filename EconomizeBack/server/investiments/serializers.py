from django.db.models import fields
from rest_framework import serializers
from .models import Contass, Investimentos, Categoriass
from django.db.models import Sum


class ContasSerializer(serializers.ModelSerializer):

    nome = serializers.CharField(min_length=1, max_length=68)
    idUsuario = serializers.CharField(read_only=True)

    class Meta:
        model = Contass
        fields = [
            'id',
            'nome',
            'idUsuario'
        ]


class ContasDetailSerializer(serializers.ModelSerializer):

    nome = serializers.CharField(min_length=1, max_length=68)
    idUsuario = serializers.CharField(read_only=True)
    idCategorias = serializers.CharField(read_only=True)

    class Meta:
        model = Contass
        fields = [
            'id',
            'nome',
            'idUsuario',
            'idCategorias'
        ]


class CategoriasSerializer(serializers.ModelSerializer):

    tipo = serializers.CharField(min_length=1, max_length=68)

    class Meta:
        model = Categoriass
        fields = ['id',
                  'tipo',
                  ]


class CategoriasDetailSerializer(serializers.ModelSerializer):

    tipo = serializers.CharField(min_length=1, max_length=68)

    class Meta:
        model = Categoriass
        fields = ['id',
                  'tipo',
                  ]


class InvestimentsSerializer(serializers.ModelSerializer):

    descricao = serializers.CharField(min_length=1, max_length=68)
    valor = serializers.DecimalField(max_digits=19, decimal_places=2)
    data = serializers.DateField()
    tipo = serializers.CharField(min_length=1, max_length=50)

    class Meta:
        model = Investimentos
        fields = ['id',
                  'descricao',
                  'valor',
                  'data',
                  'tipo',
                  'idCategorias',
                  'idUsuario',
                  'idConta'
                  ]


class InvestimentsDetailSerializer(serializers.ModelSerializer):

    descricao = serializers.CharField(min_length=1, max_length=68)
    valor = serializers.DecimalField(max_digits=19, decimal_places=2)
    data = serializers.DateField()
    tipo = serializers.CharField(min_length=1, max_length=50)

    class Meta:
        model = Investimentos
        fields = ['id',
                  'descricao',
                  'valor',
                  'data',
                  'tipo',
                  'idCategorias',
                  'idUsuario',
                  'idConta'
                  ]


class getTotalsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Investimentos
        fields = ['id',
                  'valor',
                  'data',
                  'tipo',
                  'idUsuario',
                  ]

class getCategoryTotalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Investimentos
        fields = ['id',
                  'valor',
                  'data',
                  'idCategorias',
                  'idUsuario',
                  ]