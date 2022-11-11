import { Grid, IconButton, Paper } from "@mui/material";
import React from "react";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import { Box } from "@mui/system";

function StatusTable() {
  return (
    <>
      <Grid container spacing={1} sx={{padding:"1"}}>
        <Grid item sm={12} md={12}>
          <Box sx={{ display: "flex", justifyConten: "center",height:"25px" }}>
            <IconButton>
              <TaskAltOutlinedIcon />
            </IconButton>
            <Paper
              variant="outlined"
              square
              sx={{
                backgroundColor: "rgba(14, 176, 168, 1)",
                color: "white",
                textAlign: "center",
                padding: "2px",
                fontSize: "15px",
                width:"220px"
              }}
            >
              Drafting
            </Paper>
          </Box>
        </Grid>
        <Grid item sm={12} md={12}>
          <Box sx={{ display: "flex", justifyConten: "center",height:"25px" }}>
            <IconButton>
              <TaskAltOutlinedIcon />
            </IconButton>
            <Paper
              variant="outlined"
              square
              sx={{
                backgroundColor: "rgba(14, 176, 168, 1)",
                color: "white",
                textAlign: "center",
                padding: "2px",
                fontSize: "15px",
                width:"220px"
              }}
            >
              Forwarded to Editing
            </Paper>
          </Box>
        </Grid>
        <Grid item sm={12} md={12}>
          <Box sx={{ display: "flex", justifyConten: "center",height:"25px" }}>
            <IconButton>
              <TaskAltOutlinedIcon />
            </IconButton>
            <Paper
              variant="outlined"
              square
              sx={{
                backgroundColor: "rgba(14, 176, 168, 1)",
                color: "white",
                textAlign: "center",
                padding: "2px",
                fontSize: "15px",
                width:"220px"
              }}
            >
              Editing Version Done
            </Paper>
          </Box>
        </Grid>
        <Grid item sm={12} md={12}>
          <Box sx={{ display: "flex", justifyConten: "center",height:"25px" }}>
            <IconButton>
              <TaskAltOutlinedIcon />
            </IconButton>
            <Paper
              variant="outlined"
              square
              sx={{
                backgroundColor: "rgba(14, 176, 168, 1)",
                color: "white",
                textAlign: "center",
                padding: "2px",
                fontSize: "15px",
                width:"220px"
              }}
            >
              Research Published
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default StatusTable;
