from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from jogo.views import *

urlpatterns = [
    path('', index, name='index'),
    path('salvarrodada/', salvarRodada),
    path('get_todas_rodadas/', get_todas_rodadas),
    path('pesquisar_resultados/<int:id_jogo>', exibir_resultados_jogo),
    path('buscarJogos/', buscarJogos),
    path('index_jogo/<int:uuid>', index_jogo, name='index-jogos'),  # home onde o usuário pode ver todos os seus jogos
    path('cadastro_jogador/', cadastro_novo_jogador, name='cadastrar-jogador'),
    path('novojogo/<int:id_jogador>', novoJogo),
    path('old/', index_old),
    path('sobre', sobre, name='sobre'),

    # pesquisar jogo
    path('pesquisar_jogo/', pesquisar_jogo, name='pesquisar_jogo'),  # Url para pesquisar jogos
    path('autocomplete/', autocomplete),  # Url apenas para requisições em Ajax, para o autocomplete

    # dashboard ajax functions
    path('dashboard/<str:uuid>', dashboard),
    # Arrumar o nome desta url abaixo p/ uma generica de obtenção de dados
    path('dashboard/vida/', dashboard_vidaJogadorBoss),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
