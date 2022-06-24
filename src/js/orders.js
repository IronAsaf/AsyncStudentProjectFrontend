import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Box, Container, Grid, ThemeProvider, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme} from "@mui/material/styles";

const Orders = () => {
    const mdTheme = createTheme();
    const location = useLocation();
    let id = 0;

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
                    <Container maxWidth="lg" sx={{mt: 5, mb: 4}}>

                        <Grid>
                            <Grid p={1}>
                                <Typography component="h2" variant="h3" align='center'
                                            p={1}>{location.state.title}</Typography>
                            </Grid>
                            <Grid p={1}>
                                <Table size="medium">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Amount of Expenses</TableCell>
                                            <TableCell>Sum</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            <TableRow>
                                                <TableCell>{location.state.stats.numExpenses.toString()}</TableCell>
                                                <TableCell>{location.state.stats.sumExpenses.toString()}</TableCell>
                                            </TableRow>
                                        }
                                    </TableBody>
                                </Table>
                            </Grid>
                            <Grid p={4}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>Category</TableCell>
                                            <TableCell>Cost</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {location.state.rows.map((row) => (
                                            <TableRow key={id+=1}>
                                                <TableCell>{row.date}</TableCell>
                                                <TableCell>{row.description}</TableCell>
                                                <TableCell>{row.category}</TableCell>
                                                <TableCell>{row.cost.toString()}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>

                                </Table>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
export default Orders;