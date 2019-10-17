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


# Register your models here.
admin.site.register(Jogo, JogoAdmin)
admin.site.register(Rodada)
admin.site.register(Jogador)
