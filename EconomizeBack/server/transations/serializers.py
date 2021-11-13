from django.db.models import fields
from rest_framework import serializers
from .models import Contas, Transations, Categorias, Subcategoria

class TransationsSerializer(serializers.ModelSerializer):
    
    id = serializers.IntegerField()
    descricao = serializers.CharField(min_length=1, max_length=68)
    valor = serializers.IntegerField()
    data = serializers.DateTimeField()
    tipo = serializers.CharField(min_length=1, max_length=50)
    
    class Meta:
        model = Transations
        fields = ['id',
                'descricao',
                'valor',
                'data',
                'tipo']

class ContasSerializer(serializers.ModelSerializer):

    nome = serializers.CharField(min_length=1, max_length=68)
    saldo = serializers.IntegerField()
    
    class Meta:
        model = Contas
        fields = ['idUsuario',
                'nome',
                'saldo',
                ]

class CategoriasSerializer(serializers.ModelSerializer):
    
    id = serializers.IntegerField()
    tipo = serializers.CharField(min_length=1, max_length=68)
    
    class Meta:
        model = Contas
        fields = ['id',
                'tipo',
                ]

class SubcategoriaSerializer(serializers.ModelSerializer):
    
    id = serializers.IntegerField()
    nome = serializers.CharField(min_length=1, max_length=68)
    
    class Meta:
        model = Contas
        fields = ['id',
                'nome',
                ]