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
import {getExpensesById, postNewExpense} from './logic';
import {useState} from "react";
import {useCredentials} from './userAuthContext';
import {Route, Routes, useNavigate} from "react-router-dom";

const mdTheme = createTheme();

const Dashboard = () => {
    const {userId, password} = useCredentials();

    const [isFetchingData, dataIsFetching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    let stats = {number_of_expences: NaN, sum_of_expenses: NaN};
    let queryInfo = {year: NaN, month: NaN, category: null};
    let title ="Fuck this";
    let fakeRows = [];

    const HandleAddExpenseSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const data = new FormData(event.currentTarget);
        let expense = {
            cost: parseInt(data.get('cost')),
            category: data.get('category'),
            description: data.get('description')
        };
        console.log(expense)
        const response = await postNewExpense(userId, password, expense);
        setIsLoading(false);
        if (response.ok)
            alert("Expense added")
        else
            alert("Failed to add Expense")

    };


    const HandleYearMonthReport = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        queryInfo = { year: data.get("year"), month: data.get("month"), category: null};

        await handleOrders();
        LoadOrders();
    };

    const HandleCategoryReport = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        //console.log(item);
        queryInfo = { year: NaN, month: NaN, category: data.get('category')};

        await handleOrders();
        LoadOrders();
    };

    const navigate = useNavigate();
    const LoadOrders = (event) => {
        //event.preventDefault();
        navigate('/orders', {state:{stats: stats, query:queryInfo, title:title, rows:fakeRows}});
    };

    async function handleOrders() {
        title = "Report for ID: ";
        title+= userId;
        if(queryInfo.category != null)
        {
            //Category report
            title+= " (Category)";
            console.log("inside category report, got category of " + queryInfo.category);
        }
        else if(queryInfo.year == NaN)
        {
            //total report
            const response = await getExpensesById(userId, password);
            let stats = response[''];
            title+= " (Total)";
        }
        else if(queryInfo.year != NaN && queryInfo.month == NaN)
        {
            //year report
            title+= " (Year)";
        }
        else {
            //month report
            title+= " (Month)";
        }
    }

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
                        <Grid container spacing={3} xs={12} item>
                            <Container component="main" maxWidth="false">
                                <CssBaseline/>
                                <Box p={5}>
                                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}} p={2}>
                                        <Typography component="h3" variant="h5">
                                            Add an Expense:
                                        </Typography>
                                        <Box component="form" noValidate onSubmit={HandleAddExpenseSubmit}>
                                            <Grid container spacing={2} p={1}>
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
                                                disabled={isLoading}
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
                                                        id="category"
                                                        label="Category"
                                                        name="category"
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
                                    <Box component="form" noValidate onSubmit={LoadOrders}>
                                        <Grid container spacing={1} p={1}>
                                            <Grid item xs={12} sm={6}>
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    sx={{mt: 1, mb: 2}}
                                                    color="success"
                                                >
                                                    Load Orders
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Routes><Route path="./orders"
                                                   element={<Orders/>}/></Routes>
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