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
import {AddExpense, getExpensesById, postNewExpense} from './logic';
import {useState, useEffect} from "react";
import {useCredentials} from './userAuthContext';

const mdTheme = createTheme();

const Dashboard = () => {
    const {userId, password} = useCredentials();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingData, dataIsFetching] = useState(false);
    const stats = {
        number_of_expences: -1,
        sum_of_expenses: -1
    };

    const fakeRows = [
        {
            date: Date.now().toString(),
            description: "Fake item description",
            category: "fake category",
            cost: -1.1
        }
    ];
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


    const HandleYearMonthReport = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let item = {
            year: data.get('expenseName'),
            month: data.get('cost'),
        };
        console.log(item);
    };

    const HandleCategoryReport = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let item = {
            category: data.get('category'),
        };
        console.log(item);

        let it = {sum_of_expenses: 100, number_of_expences: 2020};
        this.setState({stats: it})

    };

    useEffect(async () => {
        //alert(`${userId} ${password}`);
        dataIsFetching(true);
        const response = await getExpensesById(userId, password);

        stats.sum_of_expenses = 22222;
        stats.number_of_expences = 123;

        dataIsFetching(false);
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
                                    <div>
                                        {!isFetchingData && <Orders rows={fakeRows} stats={stats}/>}
                                    </div>
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