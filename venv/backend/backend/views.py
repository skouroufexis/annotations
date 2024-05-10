from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie








# Create your views here.

def index(request):
    return HttpResponse("welcome")

 




    

  

