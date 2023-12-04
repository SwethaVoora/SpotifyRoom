from django.shortcuts import render, redirect
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from .util import update_or_create_user_tokens, is_spotify_authenticated, get_user_tokens, execute_spotify_api_request
from api.models import Room


class AuthURL(APIView):
    def get(self, request, fornat=None):
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID
        }).prepare().url

        return Response({'url': url}, status=status.HTTP_200_OK)


def spotify_callback(request, format=None):
    code = request.GET.get('code')
    error = request.GET.get('error')

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')

    if not request.session.exists(request.session.session_key):
        request.session.create()

    update_or_create_user_tokens(
        request.session.session_key, access_token, token_type, expires_in, refresh_token)

    return redirect('frontend:')


class IsAuthenticated(APIView):
    def get(self, request, format=None):
        is_authenticated = is_spotify_authenticated(
            self.request.session.session_key)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)

# from django.shortcuts import render, redirect
# from rest_framework.views import APIView
# from requests import Request, post
# # from dotenv import load_dotenv
# # import os
# from rest_framework import status
# from rest_framework.response import Response
# from .util import update_or_create_user_tokens, is_spotify_authenticated
# from .credentials import CLIENT_ID, CLIENT_SECRET, REDIRECT_URI

# # load_dotenv()

# # CLIENT_ID = os.getenv('CLIENT_ID')
# # CLIENT_SECRET = os.getenv('CLIENT_SECRET')
# # REDIRECT_URI = os.getenv('REDIRECT_URI')

# # Using .env varibles for the Client_Id, Client_Secret
# # This is to authenticate our application for requesting access

# # API endpoint in a URL


# class AuthURL(APIView):
#     def get(self, request, format=None):
#         # What information do we want to access from the user?
#         scope = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

#         url = Request('GET', 'https://accounts.spotify.com/authorize', params={
#             'scope': scope,
#             'response_type': 'code',  # requesting a code back to allow us to authenticate a user
#             'redirect_uri': REDIRECT_URI,
#             'client_id': CLIENT_ID
#         }).prepare().url

#         return Response({'url': url}, status=status)


# # Setting up a redirect_uri - A callback URI -
# # After we send a request, we need a callback/URL for the response of the information
# # to return to.
# def spotify_callback(request, format=None):
#     code = request.GET.get('code')
#     error = request.GET.get('error')

#     # A request to get teh access token and refresh tokens
#     response = post('https://accounts.spotify.com/api/token', data={
#         'grant_type': 'authorization_code',
#         'code': code,
#         'redirect_uri': REDIRECT_URI,
#         'client_id': CLIENT_ID,
#         'client_secret': CLIENT_SECRET
#     }).json()

#     access_token = response.get('access_token')
#     token_type = response.get('token_type')
#     refresh_token = response.get('refresh_token')
#     expires_in = response.get('expires_in')
#     error = response.get('error')

#     if not request.session.exists(request.session.session_key):
#         request.session.create()

#     update_or_create_user_tokens(
#         request.session.session_key, access_token, token_type, expires_in, refresh_token)

#     return redirect('frontend:')


# class IsAuthenticated(APIView):
#     def get(self, request, format=None):
#         is_authenticated = is_spotify_authenticated(
#             self.request.session.session_key)
#         return Response({'status': is_authenticated}, status=status.HTTP_200_OK)
