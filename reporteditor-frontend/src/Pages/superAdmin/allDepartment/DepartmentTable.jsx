
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
import EditDepartmentModal from './EditDepartmentModal';
import { Rewind } from 'react-bootstrap-icons';

const label = { inputProps: { 'aria-label': 'Switch demo' } };


export default function DepartmentTable({ rows, changeStatus, modify }) {

  const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{fontWeight:'bold'}}>Team Name</TableCell>         
            <TableCell align="center" sx={{fontWeight:'bold'}}>Team Type</TableCell>         
            <TableCell align="center" sx={{fontWeight:'bold'}}>Description</TableCell>
            <TableCell align="center" sx={{fontWeight:'bold'}}>Action</TableCell>
            <TableCell align="center" sx={{fontWeight:'bold'}}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.teamType === "research-team" ? "Research Team" : row.teamType === "editing-team" ? "Editing Team" : ''}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center"><Button variant="outlined" color="primary" sx={{textTransform: "none"}} onClick={() => modify(index)}>
              Modify
              </Button></TableCell>
              <TableCell align="center"> <Switch {...label} checked={row.status} onChange={() => changeStatus(row._id)} /></TableCell>  
            </TableRow>
          ))}
        </TableBody>
        {
          open ? <EditDepartmentModal open={open}   handleClose={handleClose}/>
          :
          ""
        }
      </Table>
    </TableContainer>
  );
}
