# Generated by Django 5.0.4 on 2024-05-08 22:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0004_alter_images_imagefile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='images',
            name='imageFile',
            field=models.ImageField(default='images/default.png', upload_to='images'),
        ),
    ]
