from django.shortcuts import render, HttpResponse, Http404
from django.core.exceptions import ObjectDoesNotExist
from .models import Teste, Jogo

# https://simpleisbetterthancomplex.com/tutorial/2016/08/29/how-to-work-with-ajax-request-with-django.html
from django.http import JsonResponse

# https://docs.djangoproject.com/en/2.2/topics/serialization/#serialization-formats-json
from django.core.serializers import serialize
from django.core import serializers


# Create your views here.
def index(request):
    return render(request, 'jogo/index.html')


# Esta função irá receber o post salvando as variáveis no BD
def novo_evento_batalha(request):
    pass


def json_teste(request):
    id_jogo = request.GET.get('id_jogo', None)
    data = {
        'is_taken': Teste.objects.filter(id_jogo=id_jogo).exists(),
        'data': Teste.objects.filter(id_jogo=id_jogo)
    }
    # if data['is_taken']:
    #     data['dano_jogador'] = Teste.objects.filter(id_jogo=id_jogo)
    data = serializers.serialize('json', [data, ])
    return JsonResponse(data)


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
            jogo = Jogo.objects.filter(id_jogo=id_jogo)
        except ObjectDoesNotExist:
            return Http404(request, 'O jogo não existe')

        # return HttpResponse(request, {'status': 'ok'})
        return HttpResponse("Oi, deu certo!")

    else:
        return Http404('Função indevida')
