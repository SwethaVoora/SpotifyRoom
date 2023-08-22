import React, { useState } from 'react'
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Link, useNavigate } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const CreateRoomPage = () => {
  const defaultVotes = 2;
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  const navigate = useNavigate();

  const data = {
    guestCanPause,
    votesToSkip
  }

  const handleVotesChange = (e) => {
    setVotesToSkip(e.target.value);
  }

  const handleGuestCanPauseChange = (e) => {
    setGuestCanPause(e.target.value === "true" ? true : false)
  }

  const handleCreateRoomPressed = () => {
    const requestOptions = {
      method : 'POST',
      headers : { 'Content-Type' : 'application/json' }, 
      body : JSON.stringify({
        votes_to_skip : votesToSkip,
        guest_can_pause : guestCanPause
      })
    };
    fetch('/api/create-room', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        navigate('/room/'+ data.code)});
  }
  return ( 
    // <p>This is the Create Room Page.</p> 
    // <div className='center-content'>
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Create a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          {/* fieldset is a container specifically for form fields */}
          <FormHelperText>
            {/* <div align="center"> */}
              {/* div is a container for generic layouts. they can contain anything */}
              Guest Control of Playback State
            {/* </div> */}
          </FormHelperText>
          <RadioGroup row defaultValue="true" onChange={handleGuestCanPauseChange}>
            <FormControlLabel 
              value="true" 
              control={<Radio color="primary"/>}
              label="Play/Pause"
              labelPlacement='bottom'/>
            <FormControlLabel 
              value="false" 
              control={<Radio color="secondary"/>}
              label="No Control"
              labelPlacement='bottom'/>
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField 
            required={true} 
            type='number' 
            defaultValue={defaultVotes}
            // inputProps accepts JSON object. Hence two curly brackets.
            inputProps={{
              min:1,
              style: {textAlign : "center"}
            }}
            onChange={handleVotesChange}></TextField>
            <FormHelperText>
              {/* <div> */}
                Votes Required To Skip Song
              {/* </div> */}
            </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color='primary' variant='contained' onClick={handleCreateRoomPressed}>
          Create a Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color='secondary' variant='contained' to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  // </div>
  );
}
 
export default CreateRoomPage;