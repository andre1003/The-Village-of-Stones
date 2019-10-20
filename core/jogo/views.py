from django.shortcuts import render, HttpResponse, Http404
from django.core.exceptions import ObjectDoesNotExist
from jogo.models import Rodada, Jogo, Jogador
from jogo.forms import NovoJogadorForm
from django.shortcuts import HttpResponseRedirect, redirect
from django.urls import reverse
from django.contrib import messages

# https://simpleisbetterthancomplex.com/tutorial/2016/08/29/how-to-work-with-ajax-request-with-django.html
from django.http import JsonResponse

# Sobre redirects
# https://realpython.com/django-redirects/#django-redirects-a-super-simple-example

# https://docs.djangoproject.com/en/2.2/topics/serialization/#serialization-formats-json
from django.core.serializers import serialize
from django.core.serializers.json import DjangoJSONEncoder

# Json
import json


def index(request):
    return render(request, 'jogo/index.html')


def index_old(request):
    return render(request, 'jogo/index_old.html')


def novoJogo(request, id_jogador):
    try:
        jogador = Jogador.objects.get(id=id_jogador)
    except ObjectDoesNotExist:
        return redirect('/cadastro_jogador')

    jogo = Jogo()
    jogo.save()

    jogador.pk_jogos.add(jogo)

    return HttpResponse('Cadastrei um novo jogo')


def salvarRodada(request):
    """
    --> Salva uma nova rodada no BD. Esta função é ativada via AJAX por depender dos parâmetros passados via POST
    :param request: este param armazena os dados da int. do usuário
    :return: retorna http status
    """
    if request.method == 'POST':
        id = request.POST['id_jogo']
        try:
            jogo = Jogo.objects.get(id=id)
        except ObjectDoesNotExist:  # não tem jogo com esse id
            return HttpResponse(status=400)

        # recuperando os valores dados por JSON
        vida_personagem = request.POST['vida_personagem']
        vida_boss = request.POST['vida_boss']
        dano_atacante = request.POST['dano_atacante']
        probabilidade_ataque = request.POST['probabilidade_ataque']
        probabilidade_defesa = request.POST['probabilidade_defesa']
        numero_dado = request.POST['numero_dado']
        numero_rodada = request.POST['numero_rodada']
        numero_fase = request.POST['numero_fase']
        personagem_atacou = request.POST['personagem_atacou']

        # validando o personagem atacou (js entrega 'true' ou 'false) que é diferente do Python
        if personagem_atacou == 'true':
            personagem_atacou = True
        else:
            personagem_atacou = False

        # Criando o obj
        nova_rodada = Rodada(vida_personagem=vida_personagem, vida_boss=vida_boss, dano_atacante=dano_atacante,
                             probabilidade_ataque=probabilidade_ataque, probabilidade_defesa=probabilidade_defesa,
                             numero_dado=numero_dado, numero_rodada=numero_rodada, numero_fase=numero_fase,
                             personagem_atacou=personagem_atacou)
        nova_rodada.save()

        # Relacionando as tabelas
        jogo.pk_rodada.add(nova_rodada)
        # jogo.jogo.add(nova_rodada)

        # Salvando no banco
        jogo.save()

        return HttpResponse('Oi, deu certo!')
    else:
        return Http404('Erro, método inválido!')


def get_todas_rodadas(request):
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

        jogo = serialize('json', jogo.pk_rodada.all().order_by('-tempo_rodada'))

        # return JsonResponse(jogo, safe=False)
        return HttpResponse(jogo, content_type='application/json')
    else:
        return Http404('Erro, método inválido')


#############################
#     Dashboard section     #
#############################
def dashboard(request, uuid):
    try:
        jogo = Jogo.objects.get(id_jogo=uuid)
    except ObjectDoesNotExist:
        messages.warning(request, 'O jogo solicitado ainda não foi cadastrado')
        return render(request, 'jogo/dashboard.html')

    jogos = jogo.pk_rodada.all()

    return render(request, 'jogo/dashboard.html', {'jogos': jogos, 'jogo': jogo})


def dashboard_vidaJogadorBoss(request):
    if request.method == 'GET':
        id_jogo = str(request.GET['id_jogo'])
        try:
            jogo = Jogo.objects.get(id_jogo=id_jogo)
        except ObjectDoesNotExist:
            return Http404(request, 'O jogo não existe')

        jogos = jogo.pk_rodada.all()
        data = {'vida': {'personagem': [], 'boss': []}, 'probabilidades': {'personagem': [], 'boss': []}}

        for j in jogos:
            if j.personagem_atacou:
                data['vida']['personagem'].append(j.vida_personagem)
                data['probabilidades']['personagem'].append(j.probabilidade_ataque)
            else:
                data['vida']['boss'].append(j.vida_personagem)
                data['probabilidades']['boss'].append(j.probabilidade_ataque)

        return JsonResponse(data, safe=False)


def buscarJogos(request):
    apelido = request.GET['apelido']
    # jogador = Jogo.objects.filter(jogador__apelido__icontains=apelido)
    jogador = Jogador.objects.get(apelido=apelido)
    # data = {'jogos': jogador.pk_jogos.all()}
    # data = jogador.pk_jogos.all()
    data = serialize('json', jogador.pk_jogos.all())
    # return JsonResponse(data)
    return HttpResponse(data,  content_type='application/json')


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


def index_jogo(request, id):
    # procurar jogador no BD com este UUID
    try:
        jogador = Jogador.objects.get(id=id)
    except ObjectDoesNotExist:  # não encontrei o jogador no BD, redirecionar para o cadastro
        return redirect('/cadastro')

    jogos = jogador.pk_jogos.all()

    return render(request, 'jogo/index_jogo.html', {'jogos': jogos})


def cadastro_novo_jogador(request):
    if request.method == 'POST':
        form = NovoJogadorForm(request.POST)
        if form.is_valid():
            novo_usuario = form.save()
            # return HttpResponseRedirect('/index-jogos')
            return redirect(f'/index_jogo/{novo_usuario.id}')
        else:
            return render(request, 'jogo/novo_jogo.html', {'form': form})
    else:
        form = NovoJogadorForm()
        return render(request, 'jogo/novo_jogo.html', {'form': form})


##########################
# Ajax para autocomplete #
##########################

def autocomplete(request):
    if request.is_ajax():
        apelido = request.GET.get('term', '')
        try:
            busca = Jogador.objects.filter(apelido__icontains = apelido)
        except:
            return HttpResponse('')
        resultados = []
        for pessoa in busca:
            apelido_json = {}
            apelido_json['label'] = pessoa.apelido
            apelido_json['value'] = pessoa.apelido
            resultados.append(apelido_json)
        data = json.dumps(resultados)
    else:
        data = 'fail'
    return HttpResponse(data, content_type='application/json; charset=utf8')

def pesquisar_jogo(request):
    return render(request, 'jogo/pesquisar_jogo.html')