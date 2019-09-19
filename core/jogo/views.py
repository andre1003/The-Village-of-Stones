from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect

# Create your views here.
def index(request):
    return render(request, 'jogo/index.html')


# Esta função irá receber o post salvando as variáveis no BD
def novo_evento_batalha(request):
    pass


@csrf_protect
def teste(request):
    if request.method == 'POST':
        dano_total = request.POST['dano_total']

        return render(request, 'jogo/teste.html', {'dano_total': dano_total})
    else:
        return 'Mano não deu certo ó'
