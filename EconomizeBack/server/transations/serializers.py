from django.db.models import fields
from rest_framework import serializers
from .models import Contas, Transations, Categorias

class TransationsSerializer(serializers.ModelSerializer):

    descricao = serializers.CharField(min_length=1, max_length=68)
    valor = serializers.IntegerField()
    data = serializers.DateField()
    tipo = serializers.CharField(min_length=1, max_length=50)

    class Meta:
        model = Transations
        fields = ['id',
                  'descricao',
                  'valor',
                  'data',
                  'tipo',
                  'idCategorias',
                  'idUsuario',
                  'idConta'
            ]


class ContasSerializer(serializers.ModelSerializer):
    
    nome = serializers.CharField(min_length=1, max_length=68)
    saldo = serializers.IntegerField()
    idUsuario = serializers.CharField(read_only=True)

    class Meta:
        model = Contas
        fields = [
            'id',
            'nome',
            'saldo',
            'idUsuario'
        ]

        
class ContasDetailSerializer(serializers.ModelSerializer):

    nome = serializers.CharField(min_length=1, max_length=68)
    saldo = serializers.IntegerField()
    idUsuario = serializers.CharField(read_only=True)

    class Meta:
        model = Contas
        fields = [
            'nome',
            'saldo',
            'idUsuario'
        ]


class CategoriasSerializer(serializers.ModelSerializer):

    tipo = serializers.CharField(min_length=1, max_length=68)

    class Meta:
        model = Categorias
        fields = ['id',
                  'tipo',
                  ]