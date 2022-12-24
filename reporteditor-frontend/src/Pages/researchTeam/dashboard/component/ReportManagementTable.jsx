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
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import { Link } from "react-router-dom";
import UpdateModal from "../UpdateModal";
import { useState } from "react";
function ReportManagementTable({ reportData }) {
  const [open, setOpen] = useState(false);
  const [taskStatus, setTaskstatus] = useState([
    reportData.reportStatusEditing.length >= 1 ? true : false,
    reportData.reportStatusEditing.length >= 2 ? true : false,
    reportData.reportStatusEditing.length >= 3 ? true : false,
    reportData.reportStatusEditing.length >= 4 ? true : false,
  ]);
  let taskFlag = false;
  taskStatus.forEach(element => {
    if(element === false)
    {
      taskFlag = false;
    }
    else{
      taskFlag = true;
    }
  });
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
              <Typography variant="body2">{reportData.name}</Typography>
              <Typography variant="caption">
                {reportData.userList
                  ? reportData.userList
                  : "Author: Nikhil, Vikas, Uttareshwar"}
              </Typography>
            </Grid>
            <Grid
              item
              sm={12}
              md={2}
              sx={{ paddingTop: 3, alignItems: "center" }}
            >
              <StatusTable completedTask={taskStatus} taskType={"research"}/>
            </Grid>
            <Grid item sm={12} md={3}>
              <Grid container spacing={8} sx={{ alignItems: "center" }}>
                <Grid item sm={12} md={12}></Grid>
                <Grid item sm={12} md={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",

                      alignItems: "center",
                    }}
                  >
                    {/* <Link
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
                    </Link> */}
                    {/* <Link>
                      <IconButton onClick={handleShow}>
                        <SettingsOutlinedIcon />
                      </IconButton>
                    </Link> */}
                    <Link
                      to={`/u_control/report-editor/${reportData._id}`}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <IconButton color="info">
                        <ListAltRoundedIcon />
                      </IconButton>
                    </Link>
                    <Link to={`/u_control/edit-report/${reportData._id}`}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        sx={{ fontSize: "10px", paddingY: "0px" }}
                      >
                        Edit Report
                      </Button>
                    </Link>
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
