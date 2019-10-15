from django.db import models
import uuid


# https://docs.djangoproject.com/en/2.2/ref/models/fields/
class Rodada(models.Model):  # rodadas da batalha
    vida_personagem = models.FloatField()                                         # vida do personagem naquela rodada
    vida_boss = models.FloatField()                                               # vida do boss naquela rodada
    dano_base_personagem = models.FloatField()                                    # dano base do personagem
    dano_final_personagem = models.FloatField()                                   # dano base + acréscimo na redada
    dano_total_boss = models.FloatField()                                         # dano boss naquela rodada
    porcent_def_personagem = models.DecimalField(max_digits=3, decimal_places=2)  # % de defesa do personagem
    porcent_def_boss = models.DecimalField(max_digits=3, decimal_places=2)        # % de defesa do boss
    id_boss = models.IntegerField()                                               # identificação do boss
    tempo_rodada = models.DateTimeField(auto_now_add=True)                        # tempo em que a rodada foi finalizada
    rodada_batalha = models.PositiveIntegerField()                                # contadora rodada_atual
    level_fase = models.IntegerField()                                            # qual é a fase dessa rodada

    def __str__(self):
        return str(self.id)


class Jogador(models.Model):
    SEXO_CHOICES = [
        ('MASC', 'Masculino'),
        ('FEMI', 'Feminino'),
    ]
    nome_jogador = models.CharField(null=False, max_length=100)
    idade_jogador = models.PositiveIntegerField()
    sexo = models.CharField(choices=SEXO_CHOICES, max_length=4)

    def __str__(self):
        return self.nome_jogador

    class Meta:
        verbose_name_plural = 'Jogadores'


class Jogo(models.Model):
    id_jogo = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    data_jogo = models.DateField(auto_now_add=True)
    jogo = models.ManyToManyField(Rodada, related_name='rodadas')
    jogador = models.ForeignKey(Jogador, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id_jogo)
