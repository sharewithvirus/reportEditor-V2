import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Roles from "./Roles";
import { UserDataContext } from "../../../context/userContext";

import { deleteRole } from "../../../Services/roleService";
import DeleteConfirmationModel from "../../../components/DeleteConfirmactionModel";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function RolesTable({ rows, changeVisibility, getData }) {
  const { setIsLoading } = React.useContext(UserDataContext);
  const [open, setOpen] = React.useState(false);
  const [activeRoleId, setActiveRoleId] = React.useState("");

  const handleClose = (id) => {
    console.log("Role Id", id);
    if (id) {
      setActiveRoleId(id);
    }
    setOpen(!open);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const res = await deleteRole(activeRoleId);
    if (res.status === 200) {
      setOpen(false);
      getData();
    }
    setActiveRoleId("");
    setIsLoading(false);
  };

  return (
    <>
      <DeleteConfirmationModel
        open={open}
        id={setActiveRoleId}
        handleClose={(x) => handleClose(x)}
        handleDelete={() => handleDelete()}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Role
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Team Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Permission
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0
              ? rows.map((row, index) => (
                  <TableRow
                    key={`${row.name}${index}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      {row.name ? row.name : ""}
                    </TableCell>
                    <TableCell align="center">
                      {row.department.name ? row.department.name : ""}
                    </TableCell>
                    <TableCell align="center">
                      {row.access === "read_write"
                        ? "Read And Write"
                        : row.access === "read"
                        ? "Read"
                        : row.access === "write"
                        ? "Write"
                        : ""}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{ textTransform: "none" }}
                        onClick={() => handleClose(row._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Switch
                        {...label}
                        checked={row.status ? row.status : ""}
                        defaultValue={row.status}
                        onChange={() => changeVisibility(row._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
