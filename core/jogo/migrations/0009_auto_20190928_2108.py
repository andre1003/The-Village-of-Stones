# Generated by Django 2.2.5 on 2019-09-28 21:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jogo', '0008_auto_20190928_1955'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rodada',
            name='tempo_rodada',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]