import { Grid, IconButton, Paper } from "@mui/material";
import React from "react";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import { Box } from "@mui/system";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
function  StatusTable({completedTask,taskType}) {
  const taskStatus=["Drafting"," Forwarded to Editing"," Editing Version Done","Research Published"]
  const taskStatus2=["Draft Received","Draft Accepted","Editing version Done","Transferred to Research"]
  return (
    <>
      <Grid container spacing={1} sx={{padding:"1"}}>
        {
          taskType === "research" ? taskStatus.map((task,index) =>{
            return <Grid item sm={12} md={12}>
            <Box sx={{ display: "flex", justifyConten: "center",height:"25px" }}>
             
              <IconButton sx={{
                color: `${completedTask[index]!==true?"grey":"green"}`
              }}>
                <TaskAltOutlinedIcon />
              </IconButton>
              <Paper
                variant="outlined"
                square
                sx={{
                  backgroundColor: `${completedTask[index]!==true?"rgba(117, 116, 116, 0.48)":"rgba(14, 176, 168, 1)"}`,
                  color: "white",
                  textAlign: "center",
                  padding: "2px",
                  fontSize: "15px",
                  width:"80%"
                }}
              >
                {task}
              </Paper>
            </Box>
          </Grid>
          }) :

          taskStatus2.map((task,index) =>{
            return <Grid item sm={12} md={12}>
            <Box sx={{ display: "flex", justifyConten: "center",height:"25px" }}>
              <IconButton 
              color={completedTask[index]!==true?"warning":"success"}
              >
                {completedTask[index]!==true ? <WatchLaterOutlinedIcon/>:
                <TaskAltOutlinedIcon 
                
                />
                }
              </IconButton>
              <Paper
                variant="outlined"
                square
                sx={{
                  backgroundColor: `${completedTask[index]!==true?"rgba(117, 116, 116, 0.48)":"rgba(14, 176, 168, 1)"}`,
                  color: "white",
                  textAlign: "center",
                  padding: "2px",
                  fontSize: "15px",
                  width:"80%"
                }}
              >
                {task}
              </Paper>
            </Box>
          </Grid>
          })
        }
      </Grid>
    </>
  );
}

export default StatusTable;
