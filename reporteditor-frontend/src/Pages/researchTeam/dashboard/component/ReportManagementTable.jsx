import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import { Box } from "@mui/system";
import React from "react";
import StatusTable from "./StatusTable";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
function ReportManagementTable() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            width: "100%",
          },
        }}
      >
        <Paper elevation={3} sx={{ padding: "5px", display: "flex" }}>
          {/* <Box sx={{ flexGrow: 6, color: "block !important", padding: "15px" }}>
            <Typography variant="body1">
              Power Line Communication (PLC) Market Size By Offering (Software
              [Energy Management, Data Acquisition and
            </Typography>
            <Typography variant="caption">
              Author: Nikhil, Vikas, Uttareshwa
            </Typography>
            <Typography variant="caption" display="block">
              Author: Nikhil, Vikas, Uttareshwa
            </Typography>
            </Box>
            <Box sx={{ flexGrow: 3, color: "block !important" }}>
            
            </Box>
        <Box sx={{ flexGrow: 3, color: "block !important" }}></Box> */}
          <Grid container spacing={0}>
            <Grid item sm={12} md={7} sx={{ padding: 4 }}>
              <Typography variant="body2">
                Power Line Communication (PLC) Market Size By Offering (Software
                [Energy Management, Data Acquisition and
              </Typography>
              <Typography variant="caption">
                Author: Nikhil, Vikas, Uttareshwa
              </Typography>
              <Typography variant="caption" display="block">
                Author: Nikhil, Vikas, Uttareshwa
              </Typography>
            </Grid>
            <Grid item sm={12} md={2} sx={{ padding: 1 }}>
              <StatusTable />
            </Grid>
            <Grid item sm={12} md={3}>
              <Grid container spacing={8} sx={{ alignItems: "center" }}>
                <Grid item sm={12} md={12}></Grid>
                <Grid item sm={12} md={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <IconButton>
                      <TaskOutlinedIcon />
                    </IconButton>
                    <IconButton>
                      <SettingsOutlinedIcon />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item sm={12} md={12}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}

export default ReportManagementTable;
