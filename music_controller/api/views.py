from django.shortcuts import render
from rest_framework import generics
from .models import Room
from .serializers import RoomSerializer
# from django.http import HttpResponse

# Create your views here.
# Views are nothing but the endpoints
# ENDPOINTS - whatever comes after the slash - location on the webserver that we are going to.

# each view takes in a request to the endpoint and 
# that endpoint returns a response in a specific format
# like HTML(in this case, it renders), JSON data ...
# def main(request):
#     return HttpResponse("<h1>Hello</h1>")


# creating an api view
class RoomView(generics.ListAPIView):
    # createAPIView not only views all of the different rooms. But also create the Rooms.
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
