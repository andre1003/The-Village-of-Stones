# Generated by Django 2.2.5 on 2019-10-17 15:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jogo', '0002_auto_20191017_1244'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jogo',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
