from django.db import models
import uuid


# https://docs.djangoproject.com/en/2.2/ref/models/fields/
class Rodada(models.Model):  # rodadas da batalha
    vida_personagem = models.FloatField()                                         # vida do atacante naquela rodada
    vida_boss = models.FloatField()                                               # vida do defensor naquela rodada
    dano_atacante = models.FloatField()                                           # dano base do atacante personagem
    probabilidade_ataque = models.DecimalField(max_digits=3, decimal_places=2)    # % de acerto do atacante
    probabilidade_defesa = models.DecimalField(max_digits=3, decimal_places=2)    # % de defesa do defensor
    numero_dado = models.PositiveSmallIntegerField()                              # Valor tirado no dado (random())
    numero_rodada = models.PositiveIntegerField()                                 # contadora de rodadas
    tempo_rodada = models.DateTimeField(auto_now_add=True)                        # tempo em que a rodada foi finalizada
    numero_fase = models.IntegerField()                                           # level
    personagem_atacou = models.BooleanField()                                     # personagem quem atacou?

    def __str__(self):
        return str(self.id)


class Jogo(models.Model):
    id_jogo = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)  # identificador jogo
    data_jogo = models.DateField(auto_now_add=True)                              # data que o jogo foi criado no BD
    total_mortes = models.PositiveIntegerField(default=0)                        # total de mortes do jogador
    escolha_final = models.BooleanField(null=True)                               # salvou HumanTown?
    pk_rodada = models.ManyToManyField(Rodada, blank=True)                       # foreign key para rodadas (1~n)
    # fk_jogador = models.ForeignKey(Jogador, on_delete=models.PROTECT)

    def __str__(self):
        return str(self.id_jogo)


class Jogador(models.Model):
    SEXO_CHOICES = [
        ('MASC', 'Masculino'),
        ('FEMI', 'Feminino'),
    ]
    nome_completo = models.CharField(max_length=100)                             # nome completo do jogador
    apelido = models.CharField(max_length=32, unique=True)                       # apelido do jogador
    data_nascimento = models.DateField()                                         # para o cálculo da idade
    data_cadastro = models.DateField(auto_now_add=True)                          # cada que o jogador se cadastrou
    genero = models.CharField(choices=SEXO_CHOICES, max_length=4)                # masc ou fem? String
    pk_jogos = models.ManyToManyField(Jogo, blank=True)                          # foreign key para jogos (1~n)

    def __str__(self):
        return self.nome_completo

    class Meta:
        verbose_name_plural = 'Jogadores'
