import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Orders from './orders';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {AddExpense, getExpensesById} from './logic';
import {useState, useEffect} from "react";
import {useCredentials} from './userAuthContext';

const mdTheme = createTheme();

const Dashboard = () => {
    const item = {
        date: Date.now().toString(),
        name: 'Fake Item Name',
        description: "sss",
        category: "cate",
        cost: 212.79
    };
    const fakeRows = [
        {
            date: Date.now().toString(),
            name: 'Fake Item Name',
            description: "sss",
            category: "cate",
            cost: 212.79
        }
    ];
    const HandleSubmit = (event) => {
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

    const HandleYearMonthReport = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let item = {
            year: data.get('expenseName'),
            month: data.get('cost'),
        };
        console.log(item);
        AddExpense(item);
    };

    const HandleCategoryReport = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let item = {
            year: data.get('expenseName'),
            month: data.get('cost'),
        };
        console.log(item);
        AddExpense(item);
    };


    const {userId, password} = useCredentials();
    useEffect(async () => {
        //alert(`${userId} ${password}`);
        const response = await getExpensesById(userId, password);
        //alert(`${JSON.stringify(response)}`)

    }, [])

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
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
                    <Typography component="h1" variant="h2" align='center' p={1}>
                        User Dashboard
                    </Typography>

                    <Container maxWidth="lg" sx={{mt: 5, mb: 4}}>
                        <Grid container spacing={3} xs={12}>
                            <Container component="main" maxWidth="false">
                                <CssBaseline/>
                                <Box p={5}>
                                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}} p={2}>
                                        <Typography component="h3" variant="h5">
                                            Add an Expense:
                                        </Typography>
                                        <Box component="form" noValidate onSubmit={HandleSubmit}>
                                            <Grid container spacing={2} p={1}>
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
                                                sx={{mt: 3, mb: 2}}
                                            >
                                                Add Expense
                                            </Button>
                                        </Box></Paper>
                                </Box>
                                <Box p={5}>
                                    <Paper sx={{p: 3, display: 'flex', flexDirection: 'column'}} p={2}>
                                        <Typography component="h3" variant="h5">
                                            Get Report By Date:
                                        </Typography>
                                        <Box component="form" noValidate onSubmit={HandleYearMonthReport}>
                                            <Grid container spacing={1} p={1}>
                                                <Grid item xs={12} sm={4}>
                                                    <TextField
                                                        name="year"
                                                        required
                                                        fullWidth
                                                        id="year"
                                                        label="Year"
                                                        type="number"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    <TextField
                                                        fullWidth
                                                        id="month"
                                                        label="Month"
                                                        name="month"
                                                        type="number"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        sx={{mt: 1, mb: 2}}
                                                        color="success"
                                                    >
                                                        Get Report
                                                    </Button>
                                                </Grid>
                                            </Grid>

                                        </Box>
                                    </Paper>
                                </Box>
                                <Box p={5}>
                                    <Paper sx={{p: 3, display: 'flex', flexDirection: 'column'}} p={2}>
                                        <Typography component="h3" variant="h5">
                                            Get Report By Category:
                                        </Typography>
                                        <Box component="form" noValidate onSubmit={HandleCategoryReport}>
                                            <Grid container spacing={1} p={1}>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        id="cost"
                                                        label="Cost"
                                                        name="cost"
                                                        type="text"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        sx={{mt: 1, mb: 2}}
                                                        color="success"
                                                    >
                                                        Get Report
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Paper>
                                </Box>
                            </Container>

                            <Grid item xs={12}>
                                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}} p={2}>
                                    <Orders rows={fakeRows}/>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>

                </Box>
            </Box>
        </ThemeProvider>
    )
        ;
}

export default Dashboard