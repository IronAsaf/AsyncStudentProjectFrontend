import React, { Component } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {handleUserSignIn, LoadDash} from "./logic";


class SignIn extends Component
{
    constructor(props)
    {
      super(props);
      this.state = { apiResponse: "" };
      this.userData = {userID:0, userPassword:""};
    }
      
      callAPI()
      {
          // call the API here
          //fetch("http://localhost:9000")
        /*fetch("http://localhost:9000/testapi")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));*/
      }

      componentWillMount()
      {
        console.log("mounting");
        this.callAPI();
      }
      
      render() {
        const theme = createTheme();

        const handleSubmit = (event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          this.userData.userID = data.get('userId');
          this.userData.userPassword = data.get('password');
          console.log(this.userData)
          handleUserSignIn(this.userData);
        };
      
        return (
        <div className='signin'>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign In
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="userId"
                        label="ID"
                        name="userId"
                        type="number"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                    </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => LoadDash()}
                  >
                    Sign In
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider></div>
        );
      }
}

export default SignIn;