# Generated by Django 5.0.4 on 2024-05-08 20:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='images',
            name='imageUrl',
        ),
        migrations.AddField(
            model_name='images',
            name='imageFile',
            field=models.ImageField(default='', upload_to='images'),
        ),
    ]
