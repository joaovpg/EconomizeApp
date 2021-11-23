from django.db import models
from authentication.models import User

# Create your models here.


class Contass(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=45)
    idUsuario = models.ForeignKey(to=User, on_delete=models.CASCADE)


class Categoriass(models.Model):
    id = models.AutoField(primary_key=True)
    tipo = models.CharField(max_length=45)
    idUsuario = models.ForeignKey(to=User, on_delete=models.CASCADE)


class Investimentos(models.Model):
    id = models.AutoField(primary_key=True)
    descricao = models.CharField(max_length=45)
    valor = models.DecimalField(max_digits=19, decimal_places=2)
    data = models.DateField()
    tipo = models.CharField(max_length=255)
    idUsuario = models.ForeignKey(to=User, on_delete=models.CASCADE)
    idConta = models.ForeignKey(to=Contass, on_delete=models.CASCADE)
    idCategorias = models.ForeignKey(
    to=Categoriass, on_delete=models.CASCADE, default=True)
