import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import SideMenuItems from "./SideMenuItems";
const arr = [1, 2, 3, 4];
function SideBar({ scrWidth }) {
  console.log("j");
  console.log(scrWidth);
  return (
    <>
      <Box
        sx={{
          //   backgroundColor: "rgba(0, 0, 0, 0.3)",
          width: "100%",
          minHeight: "100vh",
          borderTop: "1px solid",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Stack>
          {arr.map((element, index) => {
            return <SideMenuItems clWidth={scrWidth} itemNo={index} />;
          })}
        </Stack>
        <Stack>
        <Stack sx={{
            display:"flex",
            alignContent:"center",
            justifyContent:"center",
            alignItems:'center'
        }}>
          <Typography variant="body2"
          sx={{
            fontSize:"8px"
          }}
          >
            Author: Vikas   
          <br/>
            Base Year: 2020
            <br/>
            Forecast Year: 2028
            <br/>
            Template Two
          </Typography>
        </Stack>
        
            <Button size="small"
            variant="contained"
            color="info"
            sx={{
                fontSize:"0.5rem",
                marginTop:"10px"
            }}
            >
                Forward to Editin
            </Button>
            <Button size="small"
            variant="contained"
            color="inherit"
             sx={{
                fontSize:"0.5rem",
                marginTop:"10px"
            }}
            >
                Finish Research Draft
            </Button>
        </Stack>
      </Box>
    </>
  );
}

export default SideBar;
