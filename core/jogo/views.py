from django.shortcuts import render, HttpResponse, Http404
from django.core.exceptions import ObjectDoesNotExist
from .models import Rodada, Jogo

# https://simpleisbetterthancomplex.com/tutorial/2016/08/29/how-to-work-with-ajax-request-with-django.html
from django.http import JsonResponse

# https://docs.djangoproject.com/en/2.2/topics/serialization/#serialization-formats-json
from django.core.serializers import serialize
from django.core.serializers.json import DjangoJSONEncoder


def index(request):
    return render(request, 'jogo/index.html')


# Rodada efetuada, esta função irá salvar ela no banco
def novaRodada(request):
    """
    --> Salva uma nova rodada no BD. Esta função é ativada via AJAX por depender dos parâmetros passados via POST
    :param request: este param armazena os dados da int. do usuário
    :return: retorna http status
    """
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
    else:
        return Http404('Erro, método inválido!')


def get_ult_rodada(request):
    """
    --> Esta função retorna um JSON referente a todos os objetos rodadas salvos no BD em um JSON
    :param request: este param armazena os dados de navegação do usuário
    :return: retorna um JSON contendo todos os objs do banco, ordenados pela data mais recente
    """
    if request.method == 'GET':
        id_jogo = request.GET['id_jogo']
        try:
            jogo = Jogo.objects.get(id_jogo=id_jogo)
        except ObjectDoesNotExist:
            return Http404(request, 'O jogo não existe')

        jogo = serialize('json', jogo.jogo.all().order_by('-tempo_rodada'))

        # return JsonResponse(jogo, safe=False)
        return HttpResponse(jogo, content_type='application/json')
    else:
        return Http404('Erro, método inválido')


def busca_resultados(request):
    pass


def exibir_resultados_jogo(request, id_jogo):
    try:
        jogo = Jogo.objects.get(id_jogo=id_jogo)
    except ObjectDoesNotExist:
        return render(request, 'jogo/resultados_jogo.html', status=404)

    context = {
        'jogo': jogo,
        'rodadas': jogo.jogo.all().order_by('tempo_rodada')
    }

    return render(request, 'jogo/resultados_jogo.html', context, status=200)
