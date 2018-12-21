from django.urls import path

from . import views

urlpatterns = [
    path('', views.index),
    path('suggestions/', views.rest_suggestion),
    path('westernconference/', views.westernconference),
    path('easternconference/', views.easternconference),
    path('games/<str:game_id>/', views.game),
    path('playground/', views.playground),

]
