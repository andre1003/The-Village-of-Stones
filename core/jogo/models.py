from django.db import models
import uuid


# https://docs.djangoproject.com/en/2.2/ref/models/fields/
class Rodada(models.Model):  # rodadas da batalha
    vida_personagem = models.FloatField()                                         # vida do personagem naquela rodada
    vida_boss = models.FloatField()                                               # vida do boss naquela rodada
    dano_atacante = models.FloatField()                                    # dano base do personagem
    probabilidade_ataque = models.DecimalField(max_digits=3, decimal_places=2)  # % de defesa do personagem
    probabilidade_defesa = models.DecimalField(max_digits=3, decimal_places=2)        # % de defesa do boss
    numero_dado = models.PositiveSmallIntegerField()
    numero_rodada = models.PositiveIntegerField()
    tempo_rodada = models.DateTimeField(auto_now_add=True)                        # tempo em que a rodada foi finalizada
    numero_fase = models.IntegerField()                                            # qual é a fase dessa rodada
    personagem_atacou = models.BooleanField()

    def __str__(self):
        return str(self.id)


class Jogo(models.Model):
    id_jogo = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    data_jogo = models.DateField(auto_now_add=True)
    total_mortes = models.PositiveIntegerField(default=0)
    escolha_final = models.BooleanField(null=True)  # salvou HumanTown?
    pk_rodada = models.ManyToManyField(Rodada, blank=True)
    # pk_jogador = models.ForeignKey(Jogador, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id_jogo)


class Jogador(models.Model):
    SEXO_CHOICES = [
        ('MASC', 'Masculino'),
        ('FEMI', 'Feminino'),
    ]
    nome_completo = models.CharField(max_length=100)
    apelido = models.CharField(max_length=32, unique=True)
    data_nascimento = models.DateField()
    genero = models.CharField(choices=SEXO_CHOICES, max_length=4)
    pk_jogos = models.ManyToManyField(Jogo, blank=True)

    def __str__(self):
        return self.nome_completo

    class Meta:
        verbose_name_plural = 'Jogadores'
