from django.shortcuts import render, HttpResponse, Http404
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from jogo.models import Rodada, Jogo, Jogador
from jogo.forms import NovoJogadorForm
from django.shortcuts import redirect
from django.contrib import messages

# https://simpleisbetterthancomplex.com/tutorial/2016/08/29/how-to-work-with-ajax-request-with-django.html
from django.http import JsonResponse

# Artigo para compreender melhor as funções redirects do Django
# https://realpython.com/django-redirects/#django-redirects-a-super-simple-example

# https://docs.djangoproject.com/en/2.2/topics/auth/default/#the-login-required-decorator
from django.contrib.auth.decorators import login_required

# https://docs.djangoproject.com/en/2.2/topics/serialization/#serialization-formats-json
from django.core.serializers import serialize               # Função que auxilia a serializar o model

# Biblioteca python que ajuda a manipular json
import json

# Biblioteca python que ajuda a manipular csv
import csv


def index(request):
    """
    --> Esta função é responsável por renderizar a página de apresentação do jogo
    :param request: requisição do usuário
    :return: renderiza a página index.html
    """
    return render(request, 'jogo/index.html')


def pre_cadastro(request):
    return render(request, 'jogo/pre-cadastro.html')


def tutorial(request):
    return render(request, 'jogo/tutorial.html')


def obrigado(request):
    return render(request, 'jogo/obrigado.html')


def jogar(request, apelido, uuid):
    """
    --> Esta função é responsável por renderizar a página de jogo
    :param uuid: uuid jogo do usuário (para buscar no banco)
    :param request: requisição do usuário
    :return: renderiza a página de jogo do usuário
    """
    # verificando se o jogo está cadastrado
    jogo = None
    try:
       jogo = Jogo.objects.get(id_jogo=uuid)
    except ObjectDoesNotExist:
        messages.warning(request, 'Jogo não cadastrado')
        return redirect(f'/index_jogo/{apelido}')
    except ValidationError:
        messages.warning(request, 'Identificador de jogo inválido.')
        return redirect(f'/index_jogo/{apelido}')
    else:
        return render(request, 'jogo/jogar.html', {'jogo': jogo})  # renderizar a tela de jogo


def sobre(request):
    """
    --> Esta função é responsável por renderizar a página sobre.html
    :param request: requisição do usuário
    :return: renderiza a página sobre.html
    """
    return render(request, 'jogo/sobre.html')


def salvarRodada(request):
    """
    --> Salva uma nova rodada no BD. Esta função é ativada via AJAX por depender dos parâmetros passados via POST
    :param request: este param armazena os dados da interação do usuário (variáveis do jogo)
    :return: retorna http status (200, 400, 404)
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
        nova_rodada.save()  # salvando a nova rodada no banco de dados

        # Relacionando as tabelas
        jogo.pk_rodada.add(nova_rodada)

        # Salvando no banco (jogo - nova relação)
        jogo.save()

        return HttpResponse('Oi, deu certo!')  # valores salvos no BD
    else:
        return Http404('Erro, método inválido!')  # http != 'POST' é recusado


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
    """
    --> Esta view é responsável por renderizar a página onde o usuário vê todos os seus jogos e acessa a dashboard
    :param request: requisito do usuário
    :param apelido: apelido do usuário que será utilizado para realizar a consulta
    :return: retorna cadastro do jogador (caso não tenha sido encontrado no BD), senão é retornada a página de index
    """
    # procurar jogador no BD com este UUID
    try:
        jogador = Jogador.objects.get(apelido=apelido)
    except ObjectDoesNotExist:  # não encontrei o jogador no BD, redirecionar para o cadastro
        return redirect('/cadastro_jogador')

    jogos = jogador.pk_jogos.all()

    return render(request, 'jogo/index_jogo.html', {'jogos': jogos, 'jogador': jogador})


def novoJogo(request, id_jogador):
    """
    --> Esta função cadastra um novo jogo no BD
    :param request: requisição do usuário
    :param id_jogador: chave utilizada para identificar o jogador (primary_key)
    :return:
    """
    max_jogos = 4
    try:
        jogador = Jogador.objects.get(id=id_jogador)
    except ObjectDoesNotExist:
        return redirect('/cadastro_jogador')

    # limitando apenas 4 jogos por jogador (teste, estado inicial)
    if jogador.pk_jogos.count() >= max_jogos:
        messages.warning(request, f'Você só pode ter no máximo {max_jogos} jogos, entre em contato com a nossa equipe '
                                  f'para mais informações.')
        return redirect(f'/index_jogo/{jogador.apelido}')
    else:
        # criando um novo jogo no BD
        jogo = Jogo()
        jogo.save()
        jogador.pk_jogos.add(jogo)

        return redirect(f'/jogar/{jogador.apelido}/{jogo.id_jogo}')  # começar jogo


#############################
#     Dashboard section     #
#############################



def get_dano_total_causado(rodadas):
    lista = {
        'heroi': {1: 0, 2: 0, 3: 0, 4: 0},
        'media': {1: 0, 2: 0, 3: 0, 4: 0},
        'contAtaqueFase': [0, 0, 0, 0]
    }
    level = 1
    cont = 1

    for rodada in rodadas:
        if rodada.numero_fase != level:
            # prox level, incrementar level e salvar as listas
            cont += 1
            level += 1

        if rodada.personagem_atacou:
            lista['contAtaqueFase'][cont - 1] += 1
            lista['heroi'][cont] += rodada.dano_atacante

    return lista


def get_media_dano_jogos(jogo):
    media = {1: 0, 2: 0, 3: 0, 4: 0}
    cont = 0
    aux_level = 1
    i = 0

    for rodada in jogo.pk_rodada.all():
        if rodada.numero_fase != aux_level:
            if i != 0:
                media[aux_level] = (cont / i)
            else:
                media[aux_level] = 0
            aux_level = rodada.numero_fase
            cont = 0
            i = 0

        if rodada.personagem_atacou:
            cont += rodada.dano_atacante
            i += 1

    if i != 0:
        media[aux_level] = (cont / i)
    else:
        media[aux_level] = 0

    return media

def getMediaJogosGeral():
    """
    --> Esta função calcula a média de todos os jogadores no banco de dados.
    Dessa forma, ela  percorre cada jogo de cada jogador obtendo a somatória
    total de dano. No final, essa somatória é dividida pelo número de vezes
    que foi chamada.
    :return:
    :return:
    """

    jogadores = Jogador.objects.all() # Obtém todos os jogadores
    mediaGeral = {1: 0, 2: 0, 3: 0, 4: 0} # Média geral de todos os jogadores
    mediaJogadores = dict() # Dicinário auxiliar para ajudar no cálculo da média
    fases = [0, 0, 0, 0] # Salva o somatório de dano em cada fase
    contAtaqueFases = [0, 0, 0, 0] # Salva o contador de vezes que cada jogador atacou em cada fase

    for jogador in jogadores: # Percorre os jogadores
        for jogo in jogador.pk_jogos.all(): # Percorre os jogos de cada jogador
            soma = get_dano_total_causado(jogo.pk_rodada.all()) # Calcula o somatório do dano de cada fase
            for i in range(1, 5): # Salva os dados de dano e número de ataques
                mediaGeral[i] += soma['heroi'][i]
                contAtaqueFases[i - 1] += soma['contAtaqueFase'][i - 1]

        mediaJogadores[jogador] = mediaGeral # Salva no dicionário auxiliar

    aux = list(mediaJogadores.keys())
    i = aux[-1] # Pega apenas o último item do dicionário (mais atualizado... e o único que funcionou)
    for j in range(1, 5): # Preenche as fases e define a média geral final
        fases[j - 1] = mediaJogadores[i][j]
        if contAtaqueFases[j - 1] != 0:
            mediaGeral[j] = fases[j - 1] / contAtaqueFases[j - 1]

    return mediaGeral


def dashboard(request, apelido, uuid):
    """
    --> Esta função é responsável por renderizar a página de resultados do jogo
    :param request: requisição do jogador
    :param uuid: identificador uuid do jogo (utilizado para consulta)
    :return: retorna a renderização da página em questão
    """
    try:
        jogo = Jogo.objects.get(id_jogo=uuid)
    except ObjectDoesNotExist:
        messages.warning(request, 'O jogo solicitado ainda não foi cadastrado')
        return render(request, 'jogo/dashboard.html')

    jogador = Jogador.objects.get(apelido=apelido)

    data = {
        'jogos': jogo.pk_rodada.all(),
        'jogador': jogador,
        'jogo': jogo,
        'total_jogos': jogador.pk_jogos.all().count(),
    }

    return render(request, 'jogo/dashboard.html', data)


def dashboard_obterDados(request):
    """
    --> Esta função prepara o JSON que irá preencher os gráficos da seção de dashboard
    :param request: requisição do jogador
    :return: JSON com os dados do BD
    """
    if request.method == 'GET':
        id_jogo = str(request.GET['id_jogo'])
        try:
            jogo = Jogo.objects.get(id_jogo=id_jogo)
        except ObjectDoesNotExist:
            return Http404(request, 'O jogo não existe')

        rodadas = jogo.pk_rodada.all()

        # pegando os dados
        dano_total = get_dano_total_causado(jogo.pk_rodada.all())

        if jogo.total_tentativas != 0:
            taxa_vitoria_derrota = (jogo.total_mortes / jogo.total_tentativas) * 100
        else:
            taxa_vitoria_derrota = 0

        media_dano_jogos = get_media_dano_jogos(jogo)
        mediaGeral = getMediaJogosGeral()

        data = {
            'dano_total_causado': dano_total,
            'perc_vit_derrota': taxa_vitoria_derrota,
            'media_dano_jogos': media_dano_jogos,
            'mediaGeral': mediaGeral,
        }

        return JsonResponse(data, safe=False)


def buscarJogos(request):
    """
    --> Esta função busca e retorna os todos os dados dos jogos do jogador via JSON
    :param request: informações do usuário
    :return: jogos do usuário via JSON
    """
    if request.method == 'GET':
        apelido = request.GET['apelido']
        # jogador = Jogo.objects.filter(jogador__apelido__icontains=apelido)
        jogador = Jogador.objects.get(apelido=apelido)
        # data = {'jogos': jogador.pk_jogos.all()}
        # data = jogador.pk_jogos.all()
        data = serialize('json', jogador.pk_jogos.all())
        # return JsonResponse(data)
        return HttpResponse(data,  content_type='application/json')
    else:
        return HttpResponse(status=404)  # erro, método inválido!


def cadastro_novo_jogador(request):
    """
    --> Esta função cadastra um novo jogador no BD
    :param request: dados do jogador
    :return: renderiza a página de jogos do jogador ou renderiza a mesma página caso não tenha conseguido
             completar o cadastro
    """
    if request.method == 'POST':
        form = NovoJogadorForm(request.POST)
        if form.is_valid():
            messages.success(request, 'Obrigado por se cadastrar no nosso jogo.')
            novo_usuario = form.save()  # consegui cadastrar o jogador
            return redirect(f'/index_jogo/{novo_usuario.apelido}')
        else:
            return render(request, 'jogo/novo_jogador.html', {'form': form})
    else:
        form = NovoJogadorForm()
        return render(request, 'jogo/novo_jogador.html', {'form': form})


##########################
# Ajax para autocomplete #
##########################
def autocomplete(request):
    """
    ---> Essa função realiza a busca por apelidos em tempo real e
    retorna os resultados, de modo a promover um autocomplete.
    :param request: django url params
    :return: busca banco para o autocomplete
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
    :return: redireciona pro cadastro do jogador ou renderiza a pesquisa do jogo
    """
    pesquisa = request.GET.get('search')
    if pesquisa:                                              # Se houver pesquisa
        try:
            jogador = Jogador.objects.get(apelido=pesquisa)   # Tenta buscar o jogador por apelido
        except ObjectDoesNotExist:
            messages.error(request, 'Jogador não cadastrado, por favor, tente novamente.')
            messages.info(request, 'Dica: Tente cadastrar este apelido como um novo jogador!')
            return redirect('/cadastro_jogador')  # Se não existir o jogador, redirecionar cadastro

        jogos = jogador.pk_jogos.all()                        # Pega todas as chaves de todos os jogos

        if not jogos:                                         # Se não houver nenhum jogo relacionado
            messages.warning(request, 'Ops, você não tinha nenhum jogo cadastrado.')

        return redirect(f'/index_jogo/{jogador.apelido}')  # Renderiza a página de erro

    else:
        return render(request, 'jogo/pesquisar_jogo.html')    # Se não houver pesquisa, permanece na página de busca


def somar_morte(request, uuid):
    if request.method == 'PATCH':
        try:
            jogo = Jogo.objects.get(id_jogo=uuid)
        except ObjectDoesNotExist:
            return Http404(request, 'O jogo não existe')

        # jogo encontrado!
        jogo.total_mortes += 1
        jogo.save(update_fields=['total_mortes'])
        return HttpResponse(request, status=200)


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


def teste(request):
    """
    --> Esta função é dedicada para testes internos.
    :param request: requisição do browser
    :return: renderiza o template de testes
    """
    return render(request, 'jogo/testes.html')