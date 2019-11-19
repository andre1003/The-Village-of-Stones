from django.contrib import admin
from .models import Jogo, Rodada, Jogador

from import_export.admin import ExportActionMixin, ImportExportActionModelAdmin
from import_export import resources, fields
from import_export.widgets import ManyToManyWidget

# https://medium.com/@hakibenita/how-to-add-custom-action-buttons-to-django-admin-8d266f5b0d41

admin.site.site_header = 'Administração The Village of Stones'

# https://developer.mozilla.org/pt-BR/docs/Learn/Server-side/Django/Admin_site
# https://docs.djangoproject.com/en/2.2/ref/contrib/admin/
class JogoAdmin(admin.ModelAdmin):
    # readonly_fields = ('id', 'id_jogo')
    list_display = ('PK', 'UUID_JOGO', 'DATA', 'SALVOU_HUMANTOWN')
    filter_horizontal = ('pk_rodada',)
    # search_fields = ('id', 'id_jogo',)  # Barra de pesquisa por id (pk), uuid
    # readonly_fields = ('id', 'id_jogo', 'data_jogo', 'total_mortes', 'escolha_final')
    # fields = ('id', 'id_jogo', 'data_jogo', 'total_mortes', 'escolha_final')
    fieldsets = (
        ('Visualizar informações do jogo', {
            'fields': ('total_mortes', 'total_tentativas', 'escolha_final')
        }),
        ('Gerenciar rodadas', {
            'fields': ('pk_rodada',)
        })
    )

    def PK(self, obj):
        return str(obj.id)

    def UUID_JOGO(self, obj):
        return str(obj.id_jogo)

    def DATA(self, obj):
        return str(obj.data_jogo)

    def SALVOU_HUMANTOWN(self, obj):
        return obj.escolha_final

    SALVOU_HUMANTOWN.boolean = True


class JogadorAdmin(admin.ModelAdmin):  # Paulo fazendo cagada
    list_display = ('APELIDO', 'SEXO', 'JOGOU')
    filter_horizontal = ('pk_jogos',)
    search_fields = ('apelido',)
    # readonly_fields = ('id', 'nome_completo', 'data_nascimento', 'genero',)
    fieldsets = (
        ('Visualizar informações do jogador', {
            # 'fields': ('id', 'nome_completo', 'apelido', 'data_nascimento', 'genero',)
            'fields': ('apelido', 'data_nascimento', 'genero',)
        }),
        ('Gerenciar jogos', {
            'fields': ('pk_jogos',)
        })
    )

    def APELIDO(self, obj):
        return str(obj.apelido)

    def SEXO(self, obj):
        return str(obj.genero)

    def JOGOU(self, obj):
        if obj.pk_jogos:
            return True
        else:
            return False

    JOGOU.boolean = True


class RodadasAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = (
        'VIDA_PERSONAGEM', 'VIDA_BOSS', 'DANO_ATACANTE', 'DEFESA_PERSONAGEM',
        'TEMPO_RESPOSTA', 'NUMERO_FASE', 'NUMERO_RODADA', 'PERSONGAGEM_ATACOU', 'TIP0_ATAQUE'
    )

    def VIDA_PERSONAGEM(self, obj):
        return  obj.vida_personagem

    def VIDA_BOSS(self, obj):
        return  obj.vida_boss

    def DANO_ATACANTE(self, obj):
        return  obj.dano_atacante

    def DEFESA_PERSONAGEM(self, obj):
        return  obj.defesa_personagem

    def NUMERO_RODADA(self, obj):
        return  obj.numero_rodada

    def TEMPO_RESPOSTA(self, obj):
        return obj.tempo_resposta

    def NUMERO_FASE(self, obj):
        return obj.numero_fase

    def PERSONGAGEM_ATACOU(self, obj):
        return obj.personagem_atacou

    def TIP0_ATAQUE(self, obj):
        return obj.tipo_ataque

    PERSONGAGEM_ATACOU.boolean = True


# Register your models here.
admin.site.register(Jogo, JogoAdmin)
admin.site.register(Rodada, RodadasAdmin)
admin.site.register(Jogador, JogadorAdmin)
