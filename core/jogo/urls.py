from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from jogo.views import (index, salvarRodada, get_ult_rodada, busca_resultados, exibir_resultados_jogo, index_old,
                        index_jogo, cadastro_novo_jogador, novoJogo, buscarJogos)

urlpatterns = [
    path('', index),
    path('salvarrodada/', salvarRodada),
    path('get_ult_rodada/', get_ult_rodada),
    path('pesquisar_resultados/', busca_resultados),
    path('pesquisar_resultados/<int:id_jogo>', exibir_resultados_jogo),
    path('buscarJogos', buscarJogos),
    path('index_jogo/<int:id>', index_jogo, name='index-jogos'),  # home onde o usuário pode ver todos os seus jogos
    path('cadastro_jogador/', cadastro_novo_jogador, name='cadastrar-jogador'),
    path('novojogo/<int:id_jogador>', novoJogo),
    path('old/', index_old),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
