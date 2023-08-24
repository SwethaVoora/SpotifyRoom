import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams to access route parameters
import { Grid, Typography, Button,  } from "@material-ui/core";
import { Link } from "react-router-dom";


const Room = ({leaveRoomCallback}) => {
  const [roomDetails, setRoomDetails] = useState({
    votesToSkip : 2,
    guestCanPause : false,
    isHost : false
  });

  // console.log(roomCode)
  const {roomCode} = useParams();
  const navigate = useNavigate();
  

  const getRoomDetails = () => {
    // http://127.0.0.1:8000/api/get-room?code=ABCDEF
    fetch('/api/get-room' + '?code=' + roomCode)
      .then((response) => { 
        if(!response.ok){
          leaveRoomCallback();
          navigate('/');
        }
        return response.json()})
      .then((data) => {
        setRoomDetails({
          votesToSkip : data.votes_to_skip,
          guestCanPause : data.guest_can_pause,
          isHost : data.is_host
        })
      })
      .catch((error) => {
        console.error("Error getting room details:", error);
        console.log("Error1!!")
      });
  }

  useEffect(() => {
    getRoomDetails();
  }, []);


  const leaveButtonPressed = () => {
    console.log("Leave Button Pressed");
    const requestOptions = {
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
    };

    fetch('/api/leave-room', requestOptions)
      .then((response) => {
        leaveRoomCallback();
        navigate('/');
      })
      .catch((error) => {
        console.error("Error leaving room:", error);
        console.log("Error!!");
      });
  }

  return ( 
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code : {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Code : {roomDetails.votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
        Guest Can Pause : {roomDetails.guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Host : {roomDetails.isHost.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
          Leave Room
        </Button>
      </Grid>
    </Grid>

    // <div>
    //   <h3>{roomCode}</h3>
    //   <p>Votes : {roomDetails.votesToSkip}</p>
    //   <p>Guest can pause : {roomDetails.guestCanPause.toString()}</p>
    //   <p>Host : {roomDetails.isHost.toString()}</p>
    // </div>
   );
}
 
export default Room;