from django.contrib import admin
from .models import Jogo, Rodada, Jogador


# https://developer.mozilla.org/pt-BR/docs/Learn/Server-side/Django/Admin_site
# https://docs.djangoproject.com/en/2.2/ref/contrib/admin/
class JogoAdmin(admin.ModelAdmin):
    # readonly_fields = ('id', 'id_jogo')
    list_display = ('PK', 'UUID', 'escolha_final')

    def PK(self, obj):
        return str(obj.id)

    def UUID(self, obj):
        return str(obj.id_jogo)


class JogadorAdmin(admin.ModelAdmin): # Paulo fazendo cagada
    list_display = ('NOME', 'SEXO', 'JOGOU')

    def NOME(self, obj):
        return str(obj.nome_completo)

    def SEXO(self, obj):
        return str(obj.genero)

    def JOGOU(self, obj):
        if obj.pk_jogos:
            return True
        else:
            return False

    JOGOU.boolean = True

    filter_horizontal = ('pk_jogos',)

# Register your models here.
admin.site.register(Jogo, JogoAdmin)
admin.site.register(Rodada)
admin.site.register(Jogador, JogadorAdmin)
