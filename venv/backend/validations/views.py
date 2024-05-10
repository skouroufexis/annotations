from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

import  filetype
from django.template import loader




# Create your views here.

# template = loader.get_template('test.html')
# return HttpResponse(template.render())


def fileType(request):
    # read file data
    data=request.FILES.get('data')
    name=request.POST.get('name')    
    size=request.POST.get('size')

    # determine file type
    type=filetype.guess(data)
    mimeType=type.MIME
    print ('MIME TYPE ',type.MIME)
    print ('NAME ',name)
    print('File extension',type.extension)
    # allowed mime types
    allowedMIMES=['image/jpeg','image/jpg','image/png']

    isAllowed=False

    for m in allowedMIMES:
        
        if mimeType==m: # file is of allowed mime type
            isAllowed=True 

    if isAllowed:
        response={'status':200,'error':'success'}
        
    else:
        response={'status':400,'error':'File type not allowed. Please select an image file (jpg or png)'}

    return JsonResponse(response)


    


