from django.shortcuts import render
from rest_framework import generics, status
from .models import Room
from .serializers import RoomSerializer, CreateRoomSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


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

class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Room.objects.filter(code = code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                # host in the model is set to the session key value. Thus, we are using the below boolean expr.
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Bad Request': "Invalid Room Code."}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request' : 'Code parameter not found in request.'}, status=status.HTTP_400_BAD_REQUEST)

class JoinRoom(APIView):
    lookup_url_kwarg = 'code'
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get(self.lookup_url_kwarg)
        if code != None:
            room_result = Room.objects.filter(code=code)
            if len(room_result) > 0 :
                room = room_result[0]
                self.request.session['room_code'] = code
                return Response({'message' : 'Room Joined'}, status=status.HTTP_200_OK)
            return Response({'Not found' : 'Code Invalid'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request' : 'Invalid post data, could not find a code key'}, status=status.HTTP_400_BAD_REQUEST)
    
class CreateRoomView(APIView):
    # APIView helps us override some of the default methods
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key): 
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause','votes_to_skip'])
                self.request.session['room_code'] = room.code
                # self.request.session.flush()
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response(RoomSerializer(room).data, status=status.HTTP_400_BAD_REQUEST)
