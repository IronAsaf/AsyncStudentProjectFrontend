import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Box, Grid, Typography} from "@mui/material";
import {useState, useEffect} from "react";
import {getExpensesById} from "./logic";
import {useCredentials} from "./userAuthContext";

const Orders = (props) => {
    const {userId, password} = useCredentials();
    useEffect(async () => {
        alert(`${userId} ${password}`);
        const response = await getExpensesById(userId, password);
        alert(`${JSON.stringify(response)}`)

    }, [])
    const rows = props.rows;
    const stats = props.stats;
    let id = 0;
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