import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Box, Grid, Typography} from "@mui/material";
import {useState, useEffect} from "react";
import {getExpensesById} from "./logic";
import {useCredentials} from "./userAuthContext";
import {useLocation} from "react-router-dom";

const Orders = (props) => {

    const location = useLocation();

    const {userId, password} = useCredentials();
    const rows = props.rows;
    const stats = props.stats;
    const queryInfo = props.queryInfo;
    const title = props.title;
    let id = 0;





    return (
        <>{console.log(queryInfo)}
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