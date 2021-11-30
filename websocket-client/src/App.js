import React, { useEffect, useState } from 'react';

import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { sendSomething, connect } from "./service/socket";

function App() {

  const [message, setMessage] = useState("");
  const [lstMessage, setLstMessage] = useState(["1", "2"]);

  /**
   * Execute after each rendering
   */
  useEffect(() => {
    fetchMsg();
  }, []);

  const fetchMsg = () => {
    connect((msg) => {
      const result = JSON.parse(msg);
      setLstMessage(result)
    });
  };

  function send() {
    sendSomething();
    // setLstMessage([...lstMessage, "1"])
  }

  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              {lstMessage.map((value) => (
                <Grid item>
                  <Paper sx={{ height: 140, width: 100 }} >
                    {value}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} md={4}>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <Button variant="contained" onClick={send}>Hello World</Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
