import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import StatusTable from "../../../researchTeam/dashboard/component/StatusTable";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function EditingManagementTable({ taskStatus }) {
  const [open, setOpen] = React.useState(false);
  let taskFlag = 0;
  for (var i = 0; i < taskStatus.length; i++) {
    if (taskStatus[i] === false) {
      taskFlag = taskFlag + 1;
    }
  }
  const handleShow = () => {
    setOpen(!open);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          width: "100%",
        },
        marginTop: "40px",
      }}
    >
      <Paper elevation={3} sx={{ padding: "5px", display: "flex" }}>
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
          <Grid
            item
            sm={12}
            md={2}
            sx={{ paddingTop: 3, alignItems: "center" }}
          >
            <StatusTable completedTask={taskStatus} taskType={"editing"} />
          </Grid>
          <Grid item sm={12} md={3}>
            <Grid container spacing={8} sx={{ alignItems: "center" }}>
              <Grid item sm={12} md={12}></Grid>
              <Grid item sm={12} md={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {taskFlag > 1 ? (
                    <IconButton>
                      <InfoOutlinedIcon />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton>
                        <NoteAltOutlinedIcon />
                      </IconButton>

                      <IconButton>
                        <TaskOutlinedIcon />
                      </IconButton>
                    </>
                  )}
                </Box>
              </Grid>
              <Grid item sm={12} md={12}></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default EditingManagementTable;
