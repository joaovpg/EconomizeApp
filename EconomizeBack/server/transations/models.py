from django.db import models
from authentication.models import User

# Create your models here.


class Contas(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=45)
    idUsuario = models.ForeignKey(to=User, on_delete=models.CASCADE)


class Categorias(models.Model):
    id = models.AutoField(primary_key=True)
    tipo = models.CharField(max_length=45)
    idUsuario = models.ForeignKey(to=User, on_delete=models.CASCADE)


class Transations(models.Model):
    id = models.AutoField(primary_key=True)
    descricao = models.CharField(max_length=45)
    valor = models.DecimalField(max_digits=19, decimal_places=2)
    data = models.DateField()
    tipo = models.CharField(max_length=255)
    idUsuario = models.ForeignKey(to=User, on_delete=models.CASCADE)
    idConta = models.ForeignKey(to=Contas, on_delete=models.CASCADE)
    idCategorias = models.ForeignKey(
    to=Categorias, on_delete=models.CASCADE, default=True)
