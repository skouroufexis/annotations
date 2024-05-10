from django.db import models
import os 

# Create your models here.

# database model for table Images
class Images(models.Model):
    imageName=models.CharField(max_length=255)
    imageFile=models.ImageField(upload_to='media/images',default='media/images/default.png')
    imageState=models.TextField(default='')
    
        


    
  