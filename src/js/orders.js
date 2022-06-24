import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Box, Grid, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";

const Orders = (props) => {
    const location = useLocation();
    let id = 0;

    return (
        <>
            <Box p={1}>
                <Grid>
                    <Grid p={1}>
                        <Typography component="h2" variant="h3" align='center' p={1}>{location.state.title}</Typography>
                    </Grid>
                    <Grid p={1}>
                        <Table size="medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{}</TableCell>
                                    <TableCell>sum_of_expenses</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    <TableRow>
                                        <TableCell>{}</TableCell>
                                        <TableCell>{}</TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid p={4}>
                        <Table size="medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell align="right">Cost</TableCell>
                                </TableRow>
                            </TableHead>

                        </Table>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
export default Orders