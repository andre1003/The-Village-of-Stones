from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from jogo.views import *

urlpatterns = [
    path('', index),
    path('salvarrodada/', salvarRodada),
    path('get_todas_rodadas/', get_todas_rodadas),
    path('pesquisar_resultados/<int:id_jogo>', exibir_resultados_jogo),
    path('buscarJogos/', buscarJogos),
    path('index_jogo/<int:id>', index_jogo, name='index-jogos'),  # home onde o usuário pode ver todos os seus jogos
    path('cadastro_jogador/', cadastro_novo_jogador, name='cadastrar-jogador'),
    path('novojogo/<int:id_jogador>', novoJogo),
    path('old/', index_old),

    # dashboard ajax functions
    path('dashboard/', dashboard),
    path('dashboard/vida/', dashboard_vidaJogadorBoss),
    path('dashboard/probabilidades/', dashboard_probabilidadesJogadorBoss),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
