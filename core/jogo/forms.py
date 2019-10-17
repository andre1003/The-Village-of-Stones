from django import forms
from django.forms import widgets

from jogo.models import Jogador


class DatePicker(forms.DateInput):
    input_type = 'date'


# https://docs.djangoproject.com/en/2.2/topics/forms/modelforms/
class NovoJogadorForm(forms.ModelForm):
    # fields = ['nome_completo', 'apelido', 'data_nascimento', 'genero']
    # nome_completo = forms.CharField()
    # apelido = forms.CharField()
    # data_nascimento = forms.DateField(
    #     widget=forms.DateInput(format='%m/%d/%Y', attrs={'class': 'datepicker'}),
    #     input_formats=('%m/%d/%Y', )
    #     )
    # genero = forms.Select()

    class Meta:
        model = Jogador
        fields = ['nome_completo', 'apelido', 'data_nascimento', 'genero']
        widgets = {
            'data_nascimento': DatePicker
        }
