from django.urls import path
from . import views


# routes for CRUD operations
urlpatterns = [        
    path('uploadFile/', views.uploadFile),
    path('getFiles/', views.getFiles),
    path('deleteFile/', views.deleteFile),
    path('updateFile/', views.updateFile)
]