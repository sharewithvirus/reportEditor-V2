import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import { Box } from "@mui/system";
import React from "react";
import StatusTable from "./StatusTable";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import { Link } from "react-router-dom";
import UpdateModal from "../UpdateModal";
function ReportManagementTable({ taskStatus }) {
  const [open, setOpen] = React.useState(false);
  let taskFlag = true;
  for (var i = 0; i < taskStatus.length; i++) {
    if (taskStatus[i] === false) {
      taskFlag = false;
    }
  }
  const handleShow = () => {
    setOpen(!open);
  };
  return (
    <>
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
              <StatusTable completedTask={taskStatus} />
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
                    <Link
                      to="submit-report"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <IconButton>
                        {taskFlag === true ? (
                          <TaskOutlinedIcon />
                        ) : (
                          <NoteAltOutlinedIcon />
                        )}
                      </IconButton>
                    </Link>
                    <IconButton>
                      <SettingsOutlinedIcon onClick={handleShow} />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item sm={12} md={12}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <UpdateModal open={open} handleClose={handleShow} />
    </>
  );
}

export default ReportManagementTable;
