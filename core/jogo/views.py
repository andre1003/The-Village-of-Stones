from django.shortcuts import render, HttpResponse, Http404
from django.core.exceptions import ObjectDoesNotExist
from .models import Teste, Jogo


# Create your views here.
def index(request):
    return render(request, 'jogo/index.html')


# Esta função irá receber o post salvando as variáveis no BD
def novo_evento_batalha(request):
    pass


def teste(request):
    status = 0
    if request.method == 'POST':
        dano_jogador = request.POST['dano_jogador']
        id_jogo = request.POST['id_jogo']

        # pesquisando id_jogo
        try:
            jogo = Jogo.objects.get(id_jogo=id_jogo)
        except ObjectDoesNotExist:
            return Http404(request, 'Jogo não identificado')

        # id_jogo, dano_jogador, jogo
        testee = Teste(jogo=jogo, dano_jogador=dano_jogador, id_jogo=jogo.id_jogo)
        testee.save()

        return HttpResponse(request)

    elif request.method == 'GET':  # consultar todas as batalhas relacionadas a um jogo.id_jogo
        id_jogo = request.GET['id_jogo']

        try:
            jogo = Jogo.objects.filter(id_jogo=id_jogo).select_related('batalha')
        except ObjectDoesNotExist:
            return Http404(request, 'O jogo não existe')

        # return HttpResponse(request, {'status': 'ok'})
        return HttpResponse("Oi, deu certo!")

    else:
        return Http404('Função indevida')
