# Generated by Django 2.2.5 on 2019-10-17 16:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jogo', '0005_auto_20191017_1329'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jogador',
            name='pk_jogos',
            field=models.ManyToManyField(blank=True, to='jogo.Jogo'),
        ),
    ]