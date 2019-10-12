# Generated by Django 2.2.5 on 2019-09-28 19:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jogo', '0007_auto_20190928_1948'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='jogo',
            name='jogo',
        ),
        migrations.AddField(
            model_name='jogo',
            name='jogo',
            field=models.ManyToManyField(related_name='rodadas', to='jogo.Rodada'),
        ),
    ]