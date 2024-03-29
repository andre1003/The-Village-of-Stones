from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from jogo.views import *

urlpatterns = [
    # páginas simples
    path('', index, name='index'),  # apresentação do projeto
    path('sobre/', sobre, name='sobre'),
    path('tutorial/<str:apelido>', tutorial, name='tutorial'),
    path('obrigado/<str:apelido>', obrigado, name='obrigado'),  # fim do jogo

    # páginas jogo
    path('jogar/<str:apelido>/<str:uuid_jogo>', jogar, name='jogar'),
    path('salvar_rodada/<str:apelido>/<str:uuid_jogo>', salvarRodada),  # Salva uma nova rodada no BD
    path('get_todas_rodadas/', get_todas_rodadas),  # Retorna um json com as rodadas salvas no BD

    # páginas usuário
    path('pre-cadastro/', pre_cadastro, name='pre-cadastro'),
    path('buscarJogos/', buscarJogos),
    path('index_jogo/<str:apelido>', index_jogo, name='index-jogos'),  # view onde o usr pode ver todos os seus jogos
    path('cadastro_jogador/', cadastro_novo_jogador, name='cadastrar-jogador'),  # cadastro novo jogador
    path('novojogo/<str:apelido>', novoJogo, name='novo-jogo'),  # Cadastrar um novo jogo no Banco de dados

    # pesquisar jogo
    path('pesquisar_jogo/', pesquisar_jogo, name='pesquisar_jogo'),  # Url para pesquisar jogos
    path('autocomplete/', autocomplete),  # Url apenas para requisições em Ajax, para o autocomplete
    path('jogador_morreu/<str:apelido>/<str:uuid_jogo>', somar_morte),
    path('jogador_passou_fase/<str:apelido>/<str:uuid_jogo>', somar_tentativa),
    path('escolha_final/<str:apelido>/<str:uuid_jogo>', change_escolha_final),

    # dashboard ajax functions
    path('dashboard/<str:apelido>/<str:uuid_jogo>', dashboard, name='dashboard'),
    # Arrumar o nome desta url abaixo p/ uma generica de obtenção de dados
    path('dashboard/vida/', dashboard_obterDados),
    path('get_csv_dashboard/<str:uuid>', get_csv_dashboard, name='baixar_csv_jogo'),

    path('teste/', teste),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
