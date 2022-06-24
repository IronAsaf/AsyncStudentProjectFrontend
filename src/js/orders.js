import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Box, Grid, Typography} from "@mui/material";

const Orders = (props) => {
    const rows = props.rows;
    const stats = props.stats;
    return (
        <>
            <Box p={1}>
                <Grid>
                    <Grid p={1}>
                        <Typography component="h2" variant="h3" align='center' p={1}>Report</Typography>
                    </Grid>
                    <Grid p={1}>
                        <Table size="medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell>number_of_expences</TableCell>
                                    <TableCell>sum_of_expenses</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    <TableRow>
                                        <TableCell>{stats.number_of_expences}</TableCell>
                                        <TableCell>{stats.sum_of_expenses}</TableCell>
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
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>{row.category}</TableCell>
                                        <TableCell align="right">{`${row.cost}`}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
export default Orders