import { Button, Divider, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
function SubmitReport() {
  return (
    <>
      <Box
        sx={{
          padding: "15px 50px 5px 50px",
          margin: "5px 50px 5px 50px",
        }}
      >
        <Stack
          
          direction="row"
          justifyContent="center"
          alignItems="center"
          height="8vh"
        >
          <Stack
            sx={{
              marginRight: "100px",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
              }}
            >
              <b>Last Saved :</b> <span> 12:00 PM</span>
            </Typography>
          </Stack>
          <Stack
           
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <FileCopyOutlinedIcon />
            <Typography sx={{ fontSize: "18px", fontWeight: "" }}>
              ABCD Market
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack
          sx={{
            border: "1px solid",
            height: "60vh",
           
            margin: "auto",
            marginTop: "50px",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Stack>
            <Typography
              sx={{
                fontSize: "10px",
              }}
            >
              ABCD Market Report Drafting done from reserch ready to share with
              editing team
            </Typography>
          </Stack>
          <Stack
            sx={{
              marginTop: "20px",
              flexDirection: "row",
              justifyContent: "center",
              alignItem: "center",
            }} 
            
          >
            <Stack
              sx={{
                display: "flex",
                justifyContent: "center",
                color: "green",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "10px" }}>
                Report Drafting Saved
              </Typography>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItem: "center",
                  marginTop:"10px"
                }}
              >
                <TaskAltIcon color="success" sx={{ fontSize: "40px" }} />
              </Stack>
            </Stack>
            <Stack sx={{ margin: "auto" }}>
              <Typography
                sx={{
                  fontSize: "1em",
                  fontWeight: "600",
                  color: "green",
                }}
              >
                ________________
              </Typography>
            </Stack>
            <Stack
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "10px" }}>
                Submit To Editing Team
              </Typography>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItem: "center",
                  marginTop:"10px"
                }}
              >
                <TaskAltIcon sx={{ fontSize: "40px" }} />
              </Stack>
            </Stack>
            <Stack sx={{ margin: "auto" }}>
              <Typography
                sx={{
                  fontSize: "1em",
                  fontWeight: "600",
                }}
              >
                ________________
              </Typography>
            </Stack>
            <Stack
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "10px" }}>
                Editing Team Version Recieved
              </Typography>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItem: "center",
                  marginTop:"10px"
                }}
              >
                <TaskAltIcon sx={{ fontSize: "40px" }} />
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <Button
              color="info"
              variant="contained"
              size="small"
              sx={{
                width: "10vw",
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
        {/* button */}
        {/* <Stack
        sx={{
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          marginTop:"20px"
        }}
        >
          <Typography
          sx={{
            fontSize:"10px"
          }}
          >
            Below button only limited for Mockup design only
          </Typography>
          <Button
          size="small"
          variant="contained"
          color="warning"
          sx={{
            width:"20vw",
            marginTop:"15px",
            backgroundColor:"rgba(159, 217, 12, 1)"
          }}
          >
            GO TO EDITOR DASHBOARD
          </Button>
        </Stack> */}
      </Box>
    </>
  );
}

export default SubmitReport;
