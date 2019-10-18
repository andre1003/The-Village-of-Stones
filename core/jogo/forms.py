from django import forms
from django.forms import widgets

from jogo.models import Jogador


class DatePicker(forms.DateInput):
    input_type = 'date'


# https://docs.djangoproject.com/en/2.2/topics/forms/modelforms/
class NovoJogadorForm(forms.ModelForm):
    class Meta:
        model = Jogador
        fields = ['nome_completo', 'apelido', 'data_nascimento', 'genero']
        widgets = {
            'data_nascimento': DatePicker
        }
