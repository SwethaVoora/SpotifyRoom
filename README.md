# SpotifyRoom
SpotifyRoom is a collaborative music listening web application built with Django and React, allowing users to create and join rooms to enjoy music together from Spotify.

## Features
- **User Authentication**: Users can sign in with their Spotify account to create or join music rooms.
- **Host Control**: Hosts have the ability to play, pause, skip tracks, and manage the room's settings.
- **Non-Host Control**: Non-host participants can suggest tracks and vote on skipping tracks.
- **Real-time Music Playback**: Utilizes the Spotify API for seamless music playback and synchronization among room participants.
- **Frontend-Backend Separation**: The project uses React for the frontend and Django for the backend, ensuring a clear separation of concerns.

## Technologies Used
**Frontend**: React, React Router, Material-UI
**Backend**: Django, Django Rest Framework
**Authentication**: Spotify OAuth, JWT (JSON Web Tokens)
**Third-party API**: Spotify Web API


## Usage
- **Creating a Room**: Sign in with Spotify, create a room, and invite others by sharing the room code.
- **Joining a Room**: Enter a room code to join an existing room.
- **Room Controls**: As a host, control music playback and room settings. As a participant, suggest tracks and vote on skipping tracks.
