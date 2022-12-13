import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
    
const TableUpload = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">HHHH</StyledTableCell>
            <StyledTableCell align="center">GGGG</StyledTableCell>
            <StyledTableCell align="center">KKKK</StyledTableCell>
            <StyledTableCell align="center">MMMM</StyledTableCell>
            <StyledTableCell align="center">LLLL</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[1,2,3,4,6].map((value,index) => (
            <StyledTableRow key={value}>
              <StyledTableCell align="center" component="th" scope="row">
                {value}
              </StyledTableCell>
              <StyledTableCell align="center">{value}</StyledTableCell>
              <StyledTableCell align="center">{value}</StyledTableCell>
              <StyledTableCell align="center">{value}</StyledTableCell>
              <StyledTableCell align="center">{value}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableUpload;
