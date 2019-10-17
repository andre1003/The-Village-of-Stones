# Generated by Django 2.2.5 on 2019-10-17 02:38

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('jogo', '0003_auto_20191016_2245'),
    ]

    operations = [
        migrations.AddField(
            model_name='jogo',
            name='id',
            field=models.AutoField(auto_created=True, default=0, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='jogo',
            name='id_jogo',
            field=models.UUIDField(default=uuid.uuid4, editable=False, unique=True),
        ),
    ]
