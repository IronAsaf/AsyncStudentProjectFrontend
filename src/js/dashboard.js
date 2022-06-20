import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Orders from './orders';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AddExpense } from './logic';
import { createData, initiateData } from './orders';
import {useState, useEffect} from "react";
import {useCredentials} from './userAuthContext';

const mdTheme = createTheme();

const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  let item = {
    expenseName: data.get('expenseName'),
    cost: data.get('cost'),
    category: data.get('category'),
    description: data.get('description')
  };
  console.log(item);
  AddExpense(item);
};


function Dashboard() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const {userId, password} = useCredentials();

  useEffect(() => {
    alert(`${userId} ${password}`);
  }, [])

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Typography component="h1" variant="h2" align='center'>
                  User Dashboard
                </Typography>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
        
            <Container component="main" maxWidth="false">
              <CssBaseline />
              <Box>
                <Typography component="h3" variant="h5">
                  Add a Expense:
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      name="expenseName"
                      required
                      fullWidth
                      id="expenseName"
                      label="Expense Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      fullWidth
                      id="cost"
                      label="Cost"
                      name="cost"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      fullWidth
                      id="category"
                      label="Category"
                      name="category"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="description"
                      label="Description"
                      id="description"
                    />
                  </Grid>

                </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Add Expense
                  </Button>
                </Box>
              </Box>
            </Container>
              {
              }
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
          </Container>
          
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard