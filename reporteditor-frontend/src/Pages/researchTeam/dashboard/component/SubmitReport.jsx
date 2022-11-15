import { Button, Divider, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
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
          display="flex"
          direction="row"
          justifyContent="center"
          alignItems="center"
          height="8vh"
        >
          <Stack sx={{
            marginRight:"100px",
            
          }}>
            <Typography sx={{
                fontSize:"12px"
            }}>
                <b>Last Saved :</b> <span>  12:00 PM</span>
            </Typography>
          </Stack>
          <Stack
            display="flex"
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
            border:"1px solid", 
            height:"60vh" ,
            width:"80vw",
            margin:"auto",
            marginTop:"50px",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }}
        >
        <Stack>
            <Typography
            sx={{
                fontSize:"10px"
            }}
            >
                ABCD Market Report Drafting done from reserch ready to share with editing team
            </Typography>
        </Stack>
        <Stack></Stack>
        <Stack></Stack>
        </Stack>
      </Box>
    </>
  );
}

export default SubmitReport;
