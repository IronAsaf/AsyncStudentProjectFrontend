import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {getExpensesById} from "./logic";
import {useCredentials} from "./userAuthContext";

// Generate Order Data


const Orders = () => {
     function createData(date, name, description, amount) {
        return {date, name, description, amount};
    }



    const rows = [createData(
        Date.now().toString(),
        'Fake Item Name',
        'Some fake item description that is long and has a lot of text.lot of text.lot of text.lot of text.lot of text.lot of text.lot of text.lot of text.lot of text.lot of text.lot of text.lot of text.',
        212.79,
    )];

    function preventDefault(event) {
        event.preventDefault();
    }
    return (
        <>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Cost</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.category}</TableCell>
                            <TableCell align="right">{`$${row.amount}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
export default Orders