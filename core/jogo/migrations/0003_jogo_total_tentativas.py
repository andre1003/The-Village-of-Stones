# Generated by Django 2.2.5 on 2019-11-16 03:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jogo', '0002_remove_jogador_nome_completo'),
    ]

    operations = [
        migrations.AddField(
            model_name='jogo',
            name='total_tentativas',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
