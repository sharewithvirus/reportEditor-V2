import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function RolesTable({rows, changeVisibility}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{fontWeight:'bold'}}>Role</TableCell>
            <TableCell align="center" sx={{fontWeight:'bold'}}>Department Name</TableCell>
            <TableCell align="center" sx={{fontWeight:'bold'}}>Permission</TableCell>
            {/* <TableCell align="center" sx={{fontWeight:'bold'}}>Action</TableCell> */}
            <TableCell align="center" sx={{fontWeight:'bold'}}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.department.name}</TableCell>
              <TableCell align="center">{row.access === "read_write" ? ("Read And Write") :  row.access === "read" ? ("Read") : row.access === "write" ? "Write" : "" }</TableCell>
              {/* <TableCell align="center"><Button variant="outlined" color="primary" sx={{textTransform: "none"}}>
              Modify
              </Button></TableCell> */}
              <TableCell align="center"> <Switch {...label} checked={row.status} defaultValue={row.status} onChange={() => changeVisibility(row._id)} /></TableCell>  
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
