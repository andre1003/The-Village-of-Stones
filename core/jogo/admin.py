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
    list_display = ('PK', 'UUID', 'DATA', 'escolha_final')
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

    def UUID(self, obj):
        return str(obj.id_jogo)

    def DATA(self, obj):
        return str(obj.data_jogo)


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
    pass


# Register your models here.
admin.site.register(Jogo, JogoAdmin)
admin.site.register(Rodada, RodadasAdmin)
admin.site.register(Jogador, JogadorAdmin)
