# Generated by Django 2.2.5 on 2019-09-20 19:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('jogo', '0005_auto_20190920_0151'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jogo',
            name='jogo',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='jogo.Batalha'),
        ),
    ]