import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams to access route parameters
import { Grid, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";

const Room = ({ leaveRoomCallback }) => {
  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
    showSettings: false,
  });

  // console.log(roomCode)
  const { roomCode } = useParams();
  const navigate = useNavigate();

  const getRoomDetails = () => {
    // http://127.0.0.1:8000/api/get-room?code=ABCDEF
    return (fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => {
        if (!response.ok) {
          leaveRoomCallback();
          navigate("/");
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Before Update")
        setRoomDetails({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });

        // console.log("After Update")
      })
      .catch((error) => {
        console.error("Error getting room details:", error);
      })
  );
  };

  useEffect(() => {
    getRoomDetails()
  }, []);

  const leaveButtonPressed = () => {
    console.log("Leave Button Pressed");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    fetch("/api/leave-room", requestOptions)
      .then((response) => {
        leaveRoomCallback();
        navigate("/");
      })
      .catch((error) => {
        console.error("Error leaving room:", error);
        console.log("Error!!");
      });
  };

  const updateShowSettings = (value) => {
    setRoomDetails((prevDetails) => ({
      ...prevDetails,
      showSettings: value,
    }));
  };

  const RenderSettingsButton = () => {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            updateShowSettings(true);
          }}
        >
          Settings
        </Button>
      </Grid>
    );
  };

  const RenderSettings = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage
            update={true}
            votesToSkip={roomDetails.votesToSkip}
            guestCanPause={roomDetails.guestCanPause}
            roomCode={roomCode}
            updateCallback={getRoomDetails}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              fetch("/api/get-room" + "?code=" + roomCode)
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
                  setRoomDetails({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                  });
                });
              updateShowSettings(false)
              
              }
            }
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  };

  // console.log(roomDetails.showSettings);//debugging purpose

  return roomDetails.showSettings ? (
    <RenderSettings />
  ) : (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code : {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Votes to Skip : {roomDetails.votesToSkip}
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
      {roomDetails.isHost ? <RenderSettingsButton /> : null}
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={leaveButtonPressed}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );

  // <div>
  //   <h3>{roomCode}</h3>
  //   <p>Votes : {roomDetails.votesToSkip}</p>
  //   <p>Guest can pause : {roomDetails.guestCanPause.toString()}</p>
  //   <p>Host : {roomDetails.isHost.toString()}</p>
  // </div>
};

export default Room;
