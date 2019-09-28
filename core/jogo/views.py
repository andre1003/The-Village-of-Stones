from django.shortcuts import render, HttpResponse, Http404
from django.core.exceptions import ObjectDoesNotExist
from .models import Rodada, Jogo

# https://simpleisbetterthancomplex.com/tutorial/2016/08/29/how-to-work-with-ajax-request-with-django.html
from django.http import JsonResponse

# https://docs.djangoproject.com/en/2.2/topics/serialization/#serialization-formats-json
from django.core.serializers import serialize
from django.core.serializers.json import DjangoJSONEncoder

# class LazyEncoder(DjangoJSONEncoder):
#     def default(self, obj):
#         if isinstance(obj, YourCustomType):
#             return str(obj)
#         return super().default(obj)


# Create your views here.
def index(request):
    return render(request, 'jogo/index.html')


# Rodada efetuada, esta função irá salvar ela no banco
def novaRodada(request):
    if request.method == 'POST':
        id_jogo = request.POST['id_jogo']
        try:
            jogo = Jogo.objects.get(id_jogo=id_jogo)
        except ObjectDoesNotExist:
            return Http404(request, 'Objeto não encontrado')

        # Rodadas fields: vida_personagem, vida_boss, dano_base_personagem, dano_final_personagem, dano_total_boss,
        #                 porcent_def_personagem, porcent_def_boss, id_boss, tempo_rodada, rodada_batalha, level_fase

        # recuperando os valores dados por JSON
        vida_personagem = request.POST['vida_personagem']
        vida_boss = request.POST['vida_boss']
        dano_base_personagem = request.POST['dano_base_personagem']
        dano_final_personagem = request.POST['dano_final_personagem']
        dano_total_boss = request.POST['dano_total_boss']
        porcent_def_personagem = request.POST['porcent_def_personagem']
        porcent_def_boss = request.POST['porcent_def_boss']
        id_boss = request.POST['id_boss']
        # tempo_rodada = request.method['tempo_rodada']  # este valor é setado pelo banco
        rodada_batalha = request.POST['rodada_batalha']
        level_fase = request.POST['level_fase']

        # Criando o obj
        nova_rodada = Rodada(
            vida_personagem=vida_personagem, vida_boss=vida_boss, dano_base_personagem=dano_base_personagem,
            dano_final_personagem=dano_final_personagem, dano_total_boss=dano_total_boss,
            porcent_def_personagem=porcent_def_personagem, porcent_def_boss=porcent_def_boss, id_boss=id_boss,
            rodada_batalha=rodada_batalha, level_fase=level_fase)
        nova_rodada.save()

        # Relacionando as tabelas
        jogo.jogo.add(nova_rodada)
        # jogo.jogo.add(nova_rodada)

        # Salvando no banco
        # jogo.save()

        return HttpResponse('Oi, deu certo!')

# def json_teste(request):
#     id_jogo = request.GET.get('id_jogo', None)
#     # data = {
#     #     'is_taken': Teste.objects.filter(id_jogo=id_jogo).exists(),
#     #     'data': serializers.serialize('json', Teste.objects.all(), cls=LazyEncoder)
#     # }
#     # if data['is_taken']:
#     #     data['dano_jogador'] = Teste.objects.filter(id_jogo=id_jogo)
#
#     data = serialize('json', Teste.objects.all())
#     # return JsonResponse({'data': data})
#     return HttpResponse(data, content_type='application/json')
#     # return JsonResponse(data, safe=False)
#
#
# def teste(request):
#     status = 0
#     if request.method == 'POST':
#         dano_jogador = request.POST['dano_jogador']
#         id_jogo = request.POST['id_jogo']
#
#         # pesquisando id_jogo
#         try:
#             jogo = Jogo.objects.get(id_jogo=id_jogo)
#         except ObjectDoesNotExist:
#             return Http404(request, 'Jogo não identificado')
#
#         # id_jogo, dano_jogador, jogo
#         testee = Teste(jogo=jogo, dano_jogador=dano_jogador, id_jogo=jogo.id_jogo)
#         testee.save()
#
#         return HttpResponse(request)
#
#     elif request.method == 'GET':  # consultar todas as batalhas relacionadas a um jogo.id_jogo
#         id_jogo = request.GET['id_jogo']
#
#         try:
#             jogo = Jogo.objects.filter(id_jogo=id_jogo)
#         except ObjectDoesNotExist:
#             return Http404(request, 'O jogo não existe')
#
#         # return HttpResponse(request, {'status': 'ok'})
#         return HttpResponse("Oi, deu certo!")
#
#     else:
#         return Http404('Função indevida')
