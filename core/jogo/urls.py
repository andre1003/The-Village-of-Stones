"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from .views import index, novaRodada, get_ult_rodada, busca_resultados, exibir_resultados_jogo

urlpatterns = [
    path('', index),
    path('teste/', novaRodada),
    path('get_ult_rodada/', get_ult_rodada),
    path('pesquisar_resultados/', busca_resultados),
    path('pesquisar_resultados/<int:id_jogo>', exibir_resultados_jogo),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
