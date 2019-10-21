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
            # 'data_nascimento': DatePicker,
            'nome_completo': forms.TextInput(
                attrs={
                    'class': 'form-control',
                    'placeholder': 'Digite o seu nome completo'
                }
            ),
            'apelido': forms.TextInput(
                attrs={
                    'class': 'form-control',
                    'placeholder': 'Digite o seu apelido'
                }
            ),
            'genero': forms.Select(
                attrs={
                    'class': 'form-control'
                }
            ),
            'data_nascimento': DatePicker(
                attrs={
                    'class': 'form-control'
                }
            )

        }

        # https://getbootstrap.com/docs/4.3/components/forms/#switches # para quando for fazer o aceito os termos
