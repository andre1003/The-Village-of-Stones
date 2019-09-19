from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, 'jogo/index.html')


# Esta função irá receber o post salvando as variáveis no BD
def novo_evento_batalha(request):
    pass
