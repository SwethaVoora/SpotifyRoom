import React from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import { BrowserRouter as Router, Link, Route, Redirect, Routes } from "react-router-dom";
import Room from "./Room";


const HomePage = () => {
  return (
    // <h1> This is the Home Page.</h1>
    <Router>
    <Routes>
      <Route path="/" element={<h1>This is the Home Page</h1>} />
      <Route path="/join" element={<RoomJoinPage/>} />
      <Route path="/create" element={<CreateRoomPage/>} />
      <Route path="/room/:roomCode" element={<Room/>}/>
    </Routes> 
  </Router>
  );
}
 
export default HomePage;