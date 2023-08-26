import React, { useEffect, useState } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import { BrowserRouter as Router, Link, Route, redirect, Routes, useNavigate, Navigate } from "react-router-dom";
import Room from "./Room";
import {Grid, Button, ButtonGroup, Typography } from '@material-ui/core'

const HomePage = () => {

  const [roomCode, setRoomCode] = useState(null);
  // const navigate = useNavigate();

  const RenderHomePage = () => {

  
    const getRoomCode = () => {
      fetch('/api/user-in-room')
      .then((response) => response.json())
      .then((data) => {
        setRoomCode(data.code);
      
    // After setting the roomCode, you can check and navigate if needed
        // if (data.code != null) {
        //   navigate('/room/' + data.code);
        // }
      });
    }
  
    useEffect(() => {
      getRoomCode();
    }, []);
  
  
    // fetch('/api/user-in-room')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setRoomCode(data.code);
      
    // // After setting the roomCode, you can check and navigate if needed
    //     if (data.code != null) {
    //       navigate('/room/' + data.code);
    //     }
    //   });
  
    // if(roomCode != null){
      // navigate('/room/' + roomCode)
    // }
  
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant='h3' component='h3'>
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to='/join' component={Link}>
              Join a Room
            </Button>
            <Button color="secondary" to='/create' component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  const clearRoomCode = () => {
    setRoomCode(null);
  }

  return (
    // <h1> This is the Home Page.</h1>
    <Router>
    <Routes>
      <Route exact path="/" element={(roomCode == null) ? <RenderHomePage/> : (<Navigate to={`/room/${roomCode}`}/>)} />
      {/* <Route path="/" element={<RenderHomePage/>} /> */}
      <Route path="/join" element={<RoomJoinPage/>} />
      <Route path="/create" element={<CreateRoomPage/>} />
      <Route path="/room/:roomCode" element={<Room leaveRoomCallback={clearRoomCode}/>}/>
    </Routes> 
  </Router>
  );
}
 
export default HomePage;