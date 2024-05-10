from django.urls import path
from . import views

urlpatterns = [        
    path('fileType/', views.fileType)
]