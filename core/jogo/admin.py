from django.contrib import admin
from .models import Jogo, Rodada, Jogador


class JogoAdmin(admin.ModelAdmin):
    # readonly_fields = ('id', 'id_jogo')
    list_display = ('PK', 'UUID')

    def PK(self, obj):
        return str(obj.id)

    def UUID(self, obj):
        return str(obj.id_jogo)


# Register your models here.
admin.site.register(Jogo, JogoAdmin)
admin.site.register(Rodada)
admin.site.register(Jogador)
