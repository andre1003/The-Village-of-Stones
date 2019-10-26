from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from jogo.views import *

urlpatterns = [
    path('', index, name='index'),  # apresentação do projeto
    path('salvarrodada/', salvarRodada),  # Salva uma nova rodada no BD
    path('get_todas_rodadas/', get_todas_rodadas),  # Retorna um json com as rodadas salvas no BD
    path('buscarJogos/', buscarJogos),
    path('index_jogo/<str:apelido>', index_jogo, name='index-jogos'),  # view onde o usr pode ver todos os seus jogos
    path('cadastro_jogador/', cadastro_novo_jogador, name='cadastrar-jogador'),  # cadastro novo jogador
    path('novojogo/<int:id_jogador>', novoJogo, name='novo-jogo'),  # Cadastrar um novo jogo no Banco de dados
    path('sobre', sobre, name='sobre'),

    # pesquisar jogo
    path('pesquisar_jogo/', pesquisar_jogo, name='pesquisar_jogo'),  # Url para pesquisar jogos
    path('autocomplete/', autocomplete),  # Url apenas para requisições em Ajax, para o autocomplete

    # dashboard ajax functions
    path('dashboard/<str:uuid>', dashboard, name='dashboard'),
    # Arrumar o nome desta url abaixo p/ uma generica de obtenção de dados
    path('dashboard/vida/', dashboard_vidaJogadorBoss),
    path('get_csv_dashboard/<str:uuid>', get_csv_dashboard),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
