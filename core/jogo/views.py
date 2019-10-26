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

# https://docs.djangoproject.com/en/2.2/topics/auth/default/#the-login-required-decorator
from django.contrib.auth.decorators import login_required

# https://docs.djangoproject.com/en/2.2/topics/serialization/#serialization-formats-json
from django.core.serializers import serialize
from django.core.serializers.json import DjangoJSONEncoder

# Json
import json

# csv
import csv


def index(request):
    return render(request, 'jogo/index.html')


def index_old(request):
    return render(request, 'jogo/index_old.html')


def sobre(request):
    return render(request, 'jogo/sobre.html')


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


# Interface por onde o jogador pode ver todos os seus jogos
def index_jogo(request, apelido):
    # procurar jogador no BD com este UUID
    try:
        jogador = Jogador.objects.get(apelido=apelido)
    except ObjectDoesNotExist:  # não encontrei o jogador no BD, redirecionar para o cadastro
        return redirect('/cadastro_jogador')

    jogos = jogador.pk_jogos.all()

    return render(request, 'jogo/index_jogo.html', {'jogos': jogos, 'jogador': jogador})


# esta função cadastra um novo jogador no BD
def novoJogo(request, id_jogador):
    max_jogos = 4
    try:
        jogador = Jogador.objects.get(id=id_jogador)
    except ObjectDoesNotExist:
        return redirect('/cadastro_jogador')

    # limitando apenas 2 jogos por jogador
    if jogador.pk_jogos.count() >= max_jogos:
        messages.error(request, f'Você só pode ter no máximo {max_jogos} jogos, entre em contato para mais informações.')
        return redirect(f'/index_jogo/{jogador.apelido}')
    else:
        # criando um novo jogo
        jogo = Jogo()
        jogo.save()
        jogador.pk_jogos.add(jogo)

        return redirect('/')  # começar jogo!


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
                data['vida']['personagem'].append(float(j.vida_personagem))
                data['probabilidades']['personagem'].append(float(j.probabilidade_ataque))
            else:
                data['vida']['boss'].append(float(j.vida_personagem))
                data['probabilidades']['boss'].append(float(j.probabilidade_ataque))

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
    """
    ---> Essa função realiza a busca por apelidos em tempo real e
    retorna os resultados, de modo a promover um autocomplete.
    :param request: django url params
    :return:
    """
    if request.is_ajax():                                                   # Se a requisição foi feita por Ajax
        apelido = request.GET.get('term', '')                               # Pega o que está sendo escrito

        try:
            busca = Jogador.objects.filter(apelido__icontains=apelido)[:5]  # Busca no banco
        except ObjectDoesNotExist:
            return HttpResponse('')
        resultados = []

        for pessoa in busca:                                                # Cria um dicionário
            apelido_json = {}
            apelido_json['label'] = pessoa.apelido
            apelido_json['value'] = pessoa.apelido
            resultados.append(apelido_json)
        data = json.dumps(resultados)                                       # Transforma os resultados da busca em um json
    else:
        data = 'fail'

    mimetype = 'application/json; charset=utf8'
    return HttpResponse(data, content_type=mimetype)                        # Retorna os resultados


def pesquisar_jogo(request):
    """
    --> Função para buscar um jogador e redirecioná-lo para a dashboard, através
    do seu UUID, referente à última pk. Sendo assim, irá ser feita uma busca pelo
    apelido e em seguida o último jogo.
    :param request: django url params
    :return:
    """
    pesquisa = request.GET.get('search')
    if pesquisa:                                              # Se houver pesquisa
        try:
            jogador = Jogador.objects.get(apelido=pesquisa)   # Tenta buscar o jogador por apelido
        except ObjectDoesNotExist:
            messages.warning(request, 'O jogador não cadastrado, por favor, realize o cadastro.')
            return redirect('/cadastro_jogador')  # Se não existir o jogador, retorna 404

        jogos = jogador.pk_jogos.all()                        # Pega todas as chaves de todos os jogos
        if not jogos:                                         # Se não houver nenhum jogo relacionado
            messages.warning(request, 'Ops, você não tinha nenhum jogo cadastrado.')
            return redirect(f'/index_jogo/{jogador.apelido}')      # Renderiza a página de erro
        else:
            i = len(jogos) - 1                                # Pega a última chave
            return redirect(dashboard, jogos[0])              # Redireciona para a página do dashboard com a última chave
    else:
        return render(request, 'jogo/pesquisar_jogo.html')    # Se não houver pesquisa, permanece na página de busca


@login_required
def get_csv_dashboard(request, uuid):
    """
    --> Esta função gera um arquivo csv de todas as rodadas relacionadas ao jogo identificado pelo seu uuid.
    :param request: django url params
    :param uuid:
    :return: retorna o csv para que o usuário possa baixar
    """
    # procurar jogador no BD com este UUID
    try:
        jogo = Jogo.objects.get(id_jogo=uuid)
    except ObjectDoesNotExist:  # não encontrei o jogador no BD, redirecionar para o cadastro
        return redirect('/pesquisar_jogo/')

    rodadas = jogo.pk_rodada.all().order_by('tempo_rodada')

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="contact.csv"'

    writer = csv.writer(response, delimiter=',')
    writer.writerow(['vida_personagem', 'vida_boss', 'dano_atacante', 'probabilidade_ataque', 'probabilidade_defesa', 'numero_dado', 'numero_rodada', 'tempo_rodada', 'numero_fase', 'personagem_atacou'])

    for obj in rodadas:
        writer.writerow([obj.vida_personagem, obj.vida_boss, obj.dano_atacante, obj.probabilidade_ataque, obj.probabilidade_defesa, obj.numero_dado, obj.numero_rodada, obj.tempo_rodada, obj.numero_fase, obj.personagem_atacou])

    return response
