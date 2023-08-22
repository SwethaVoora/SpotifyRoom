import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to access route parameters

const Room = () => {
  const [roomDetails, setRoomDetails] = useState({
    votesToSkip : 2,
    guestCanPause : false,
    isHost : false
  });

  // console.log(roomCode)
  const {roomCode} = useParams();
  

  const getRoomDetails = () => {
    // http://127.0.0.1:8000/api/get-room?code=ABCDEF
    fetch('/api/get-room' + '?code=' + roomCode)
      .then((response) => response.json())
      .then((data) => {
        setRoomDetails({
          votesToSkip : data.votes_to_skip,
          guestCanPause : data.guest_can_pause,
          isHost : data.is_host
        })
      })
  }

  useEffect(() => {
    getRoomDetails();
  }, []);

  return ( 
    <div>
      <h3>{roomCode}</h3>
      <p>Votes : {roomDetails.votesToSkip}</p>
      <p>Guest can pause : {roomDetails.guestCanPause.toString()}</p>
      <p>Host : {roomDetails.isHost.toString()}</p>
    </div>
   );
}
 
export default Room;