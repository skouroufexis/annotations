import os 
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.template import loader
from .models import Images 

import json


from PIL import Image

 
# test call
def test(request):
   return HttpResponse("test") 

# function to upload image to database
def uploadFile(request):    
    data=request.FILES.get('data')
    name=request.POST.get('name')    
    size=request.POST.get('size')    
    
    try:
      # save imagepath to database
      record = Images(imageName=name, imageFile=data)
      record.save()
      print('image saved to database')
         
    except:
      return JsonResponse({"status":"400", "error":"Error Saving image"})
    else:
      return JsonResponse({"status":"200", "error":"Image successfully uploaded", "names":name})
      
# function to retrieve images from database
def getFiles(request):
   try:
      # query the database, get all records
      records = Images.objects.all()
            
      # prepare a response array to be sent as JSON
      response=[]

      for r in records: 
         # reformat imageUrl to be served from Media directory
         imagePath='http://127.0.0.1:8000/media/images/'+r.imageName

         
         item={"id":r.id,"imageName":r.imageName,"imagePath":imagePath,"imageState":r.imageState}
         response.append(item) #populate the response array
   except:
      return JsonResponse({"status":"400", "error":"Error loading images"})   
   else:      
      return JsonResponse({"status":"200", "response":response})

# function to delete image from database
def deleteFile(request):
   try:

      # retrieve the id and imageUrl of image to be deleted
      imageId=request.POST.get('imageId')
      imageName=request.POST.get('imageName')

      # query the database, delete selected record      
      Images.objects.filter(id=imageId).delete()
            
      #delete corresponding image from directory
      
      imagePath='./media/images/'+imageName
      os.remove(imagePath)
   
   except:
      return JsonResponse({"status":"400", "error":"Error deleting image"})   
   else:
      return JsonResponse({"status":"200", "error":"Image successfully deleted"})

# function to modify image in database
def updateFile(request):
   try:

      # retrieve the id and imageUrl of image to be updated
      imageId=request.POST.get('imageId')

      # retrieve the new values of the imageState of the record to be updated
      imageState=request.POST.get('imageState')
      print('IMAGE STATE'+imageState)
      # Update the image record with new values for imageState            
      record = Images.objects.get(id=imageId)
      record.imageState=imageState
      record.save()                           
   except:
      return JsonResponse({"status":"400", "error":"An error occured while editing the image"})   
   else:
      return JsonResponse({"status":"200", "error":"Image successfully edited"})
   



    