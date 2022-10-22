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

export default function RolesTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{fontWeight:'bold'}}>User Name</TableCell>
            <TableCell align="center" sx={{fontWeight:'bold'}}>Email</TableCell>
            <TableCell align="center" sx={{fontWeight:'bold'}}>Acces</TableCell>
            <TableCell align="center" sx={{fontWeight:'bold'}}>Action</TableCell>
            <TableCell align="center" sx={{fontWeight:'bold'}}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => ( */}
            <TableRow
            //   key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            
              
              <TableCell align="center">Admin</TableCell>
              <TableCell align="center">vikas@example.com</TableCell>
              <TableCell align="center">Admin</TableCell>
              <TableCell align="center"><Button variant="outlined" color="primary" sx={{textTransform: "none"}}>
              Modify
              </Button></TableCell>
              <TableCell align="center"> <Switch {...label} defaultChecked /></TableCell>  

              {/* <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
            <TableRow
            //   key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            
              
              <TableCell align="center">Research-Read Access</TableCell>
              <TableCell align="center">vikas@example.com</TableCell>
              <TableCell align="center">Admin</TableCell>
              <TableCell align="center"><Button variant="outlined" color="primary" sx={{textTransform: "none"}}>
              Modify
              </Button></TableCell>
              <TableCell align="center"> <Switch {...label} defaultChecked /></TableCell>  

              {/* <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
            <TableRow
            //   key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            
              
              <TableCell align="center">Research-Write Access</TableCell>
              <TableCell align="center">vikas@example.com</TableCell>
              <TableCell align="center">Admin</TableCell>
              <TableCell align="center"><Button variant="outlined" color="primary" sx={{textTransform: "none"}}>
              Modify
              </Button></TableCell>
              <TableCell align="center"> <Switch {...label} defaultChecked /></TableCell>  

              {/* <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
            
          {/* ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
