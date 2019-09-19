from django.db import models


# https://docs.djangoproject.com/en/2.2/ref/models/fields/
class Gampeplay(models.Model):
    vida_jogador = models.IntegerField()
    dano_jogador = models.IntegerField()
    vida_boss = models.IntegerField()
    dano_boss = models.IntegerField()
    rodada = models.IntegerField()

    def __str__(self):
        return str(self.id)


class Jogo(models.Model):
    data_jogo = models.DateField(auto_now_add=True)
    jogo = models.ForeignKey(Gampeplay, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)
