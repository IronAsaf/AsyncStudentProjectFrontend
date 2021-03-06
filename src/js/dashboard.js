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
import {
    getExpensesByCategory,
    getExpensesById,
    getExpensesByYear,
    getExpensesByYearAndMonth,
    postNewExpense
} from './logic';
import {useState} from "react";
import {useCredentials} from './userAuthContext';
import {Route, Routes, useNavigate} from "react-router-dom";

const mdTheme = createTheme();

const Dashboard = () => {
    const {userId, password} = useCredentials();
    const [isLoading, setIsLoading] = useState(false);

    let stats = {numExpenses: NaN, sumExpenses: NaN};
    let queryInfo = {year: NaN, month: NaN, category: null};
    let title ="";
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
        let type = "year";
        if(data.get("month") !== "") type = "month";
        let res = await handleOrders(type);
        if(res === false)
            alert("No expenses For the selected date");
        else
            LoadOrders();
    };

    const HandleCategoryReport = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        queryInfo = { year: NaN, month: NaN, category: data.get('category')};

        let res = await handleOrders("category");

        if(res === false)
                alert("No expenses For the selected category");
        else
            LoadOrders();
    };

    const HandleTotalReport = async (event) => {
        event.preventDefault();
        queryInfo = { year: NaN, month: NaN, category: null};

        let res = await handleOrders("total");
        if(res === false)
                alert("No expenses Found");
        else
            LoadOrders();
    };

    const navigate = useNavigate();
    const LoadOrders = (event) => {
        navigate('/orders', {state:{stats: stats, query:queryInfo, title:title, rows:fakeRows}});
    };



    async function handleOrders(type) {
        // this function basically handles the data prep for the next react page - orders
        fakeRows = [];
        title = "Report for ID: " + userId;
        let dataParsedSuccessfully = true;
        switch(type)
        {
            case "category":
                title+= " (Category: " + queryInfo.category + ")";
                const resCate = await getExpensesByCategory(userId, password, queryInfo.category);
                if(resCate === false)
                {
                    dataParsedSuccessfully = false;
                    break;
                }
                stats = {numExpenses: resCate['number_of_expences'], sumExpenses: resCate['sum_of_expenses']};
                fakeRows = resCate['expenses'];
                break;

            case "year":
                title+= " (Year " + queryInfo.year + ")";
                const resYear = await getExpensesByYear(userId, password, queryInfo.year);
                if(resYear === false)
                {
                    dataParsedSuccessfully = false;
                    break;
                }
                stats = {numExpenses: resYear['number_of_expences'], sumExpenses: resYear['sum_of_expenses']};
                fakeRows = resYear['expenses'];
                break;

            case "month":
                title+= " (Year-Month "+ queryInfo.year +"-"+queryInfo.month+ ")";
                const resMonth = await getExpensesByYearAndMonth(userId, password, queryInfo.year, queryInfo.month);
                if(resMonth === false)
                {
                    dataParsedSuccessfully = false;
                    break;
                }
                stats = {numExpenses: resMonth['number_of_expences'], sumExpenses: resMonth['sum_of_expenses']};
                fakeRows = resMonth['expenses'];
                break;

            default:
            case "total":
                const response = await getExpensesById(userId, password);
                if(response === false)
                {
                    dataParsedSuccessfully = false;
                    break;
                }
                fakeRows = response['expenses'];
                stats = {numExpenses: fakeRows.length, sumExpenses: response['sum']};
                title+= " (Total)";
                break;
        }

        return dataParsedSuccessfully;
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
                                    <Box component="form" noValidate onSubmit={HandleTotalReport}>
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