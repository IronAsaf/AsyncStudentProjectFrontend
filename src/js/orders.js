import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// Generate Order Data
function createData(date, name, description, amount) {
  return {date, name, description, amount };
}

export function initiateData()
{
  let newRows = [];
  
  for (let i = 0; i < 50; i++)
  {
    let itemAdd = createData(
      i,
      Date.now().toString(),
      'Fake Item Name',
      'Some fake item description that is long and has a lot of text.',
      i*212.79 - 200,
    );
    newRows.add(itemAdd);
  }

  return newRows;
}

//fake data
const rows = [createData(
  Date.now().toString(),
  'Fake Item Name',
  'Some fake item description that is long and has a lot of text.lot of text.lot of text.lot of text.lot of text.lot of text.lot of text.lot of text.lot of text.lot of text.lot of text.lot of text.',
  212.79,
)];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
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
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}