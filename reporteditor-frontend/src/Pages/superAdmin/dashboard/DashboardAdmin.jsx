import React from "react";
import { FileEarmarkText } from "react-bootstrap-icons";
import UserManagement from "../userManagement/UserManagement";
import Roles from "../allRoles/Roles";
import Department from "../allDepartment/Department";
import NavBar from "../../../components/NavBar";
import UserActivity from "../../usersActivities/UserActivity";
import { Grid,Box } from "@mui/material";


function DashboardAdmin() {
  return (
    <>

      <NavBar />
      <Box mt={8}>
        <Grid container  >

          <Grid item xs={12} lg={9}>

            <UserManagement />
            <Department />
            <Roles />
          </Grid>
          <Grid item xs={12} lg={3}>
            <UserActivity />
          </Grid>

        </Grid>
      </Box>
    </>
  );
}

export default DashboardAdmin;
