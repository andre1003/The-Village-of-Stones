from django.db import models


# https://docs.djangoproject.com/en/2.2/ref/models/fields/
class Batalha(models.Model):  # rodadas da batalha
    vida_jogador = models.IntegerField()
    dano_jogador = models.IntegerField()
    vida_boss = models.IntegerField()
    dano_boss = models.IntegerField()
    rodada = models.IntegerField()
    level = models.IntegerField()
    status = models.BooleanField(default=False)  # level finalizado??

    def __str__(self):
        return str(self.id)


class Jogo(models.Model):
    id_jogo = models.CharField(max_length=10)
    data_jogo = models.DateField(auto_now_add=True)
    jogo = models.ForeignKey(Batalha, on_delete=models.CASCADE, related_name='batalha')

    def __str__(self):
        return str(self.id_jogo)


class Teste(models.Model):
    id_jogo = models.CharField(max_length=10)
    dano_jogador = models.IntegerField()
    jogo = models.ForeignKey(Jogo, on_delete=models.PROTECT)

    def __str__(self):
        return self.id_jogo
