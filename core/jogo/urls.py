from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from jogo.views import *

urlpatterns = [
    # páginas simples
    path('', index, name='index'),  # apresentação do projeto
    path('sobre/', sobre, name='sobre'),
    path('tutorial/', tutorial, name='tutorial'),
    path('obrigado/', obrigado, name='end-game'),  # fim do jogo

    # páginas jogo
    path('jogar/<str:apelido>/<str:uuid>', jogar, name='jogar'),
    path('salvarrodada/', salvarRodada),  # Salva uma nova rodada no BD
    path('get_todas_rodadas/', get_todas_rodadas),  # Retorna um json com as rodadas salvas no BD

    # páginas usuário
    path('pre-cadastro/', pre_cadastro, name='pre-cadastro'),
    path('buscarJogos/', buscarJogos),
    path('index_jogo/<str:apelido>', index_jogo, name='index-jogos'),  # view onde o usr pode ver todos os seus jogos
    path('cadastro_jogador/', cadastro_novo_jogador, name='cadastrar-jogador'),  # cadastro novo jogador
    path('novojogo/<int:id_jogador>', novoJogo, name='novo-jogo'),  # Cadastrar um novo jogo no Banco de dados

    # pesquisar jogo
    path('pesquisar_jogo/', pesquisar_jogo, name='pesquisar_jogo'),  # Url para pesquisar jogos
    path('autocomplete/', autocomplete),  # Url apenas para requisições em Ajax, para o autocomplete
    path('somar_morte/<str:uuid>', somar_morte),

    # dashboard ajax functions
    path('dashboard/<str:apelido>/<str:uuid>', dashboard, name='dashboard'),
    # Arrumar o nome desta url abaixo p/ uma generica de obtenção de dados
    path('dashboard/vida/', dashboard_obterDados),
    path('get_csv_dashboard/<str:uuid>', get_csv_dashboard, name='baixar_csv_jogo'),

    path('teste/', teste),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
