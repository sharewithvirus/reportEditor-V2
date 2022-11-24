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
import EditUserManagementModal from './EditUserManagementModal';
const label = { inputProps: { 'aria-label': 'Switch demo' } };


export default function UserManagementTable({ rows, updateStatus, editModelOpen }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{fontWeight:'bold'}}>User Name</TableCell>
            <TableCell align="center" sx={{fontWeight:'bold'}}>Email</TableCell>
            <TableCell align="center" sx={{fontWeight:'bold'}}>Email Status</TableCell>
            <TableCell align="center" sx={{fontWeight:'bold'}}>Department</TableCell>
            <TableCell align="center" sx={{fontWeight:'bold'}}>Permission</TableCell>
            <TableCell align="center" sx={{fontWeight:'bold'}}>Action</TableCell>
            <TableCell align="center" sx={{fontWeight:'bold'}}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {rows.map((row, index) => (
            <RowLine item={row} index={index} updateStatus={(x) => updateStatus(x)} editModelOpen={(x) => editModelOpen(x)}/>
          ))}
        </TableBody>
        {
      open ?  <EditUserManagementModal open={open} handleClose={handleClose}/>
    :
    ""
    }
      </Table>
      
    </TableContainer>
    
  );
}

const RowLine = ({ item, index, updateStatus, editModelOpen }) => {

  return (
    <TableRow
      key={item._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell align="center">{item.userName ? item.userName : ''}</TableCell>
      <TableCell align="center">{item.email ? item.email : ''}</TableCell>
      <TableCell align="center">{item.emailVerified ? "Verified" : "Not Verified"}</TableCell>
      <TableCell align="center">{item.department.name ? item.department.name : ''}</TableCell>
      <TableCell align="center">{item.access.name ? item.access.name : ''}</TableCell>
      <TableCell align="center"><Button variant="outlined" color="primary" sx={{textTransform: "none" }} onClick={() => editModelOpen(index)}>
      Modify
      </Button></TableCell>
      {console.log(item.userStatus)}
      <TableCell align="center"> <Switch {...label} checked={item.userStatus} onChange={() => updateStatus(item._id)} /></TableCell>  

      {/* <TableCell align="right">{row.calories}</TableCell>
      <TableCell align="right">{row.fat}</TableCell>
      <TableCell align="right">{row.carbs}</TableCell>
      <TableCell align="right">{row.protein}</TableCell> */}
    </TableRow>
  )
}