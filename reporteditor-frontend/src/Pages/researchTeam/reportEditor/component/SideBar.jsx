import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import SideMenuItems from "./SideMenuItems";

function SideBar() {
  
  return (
    <>
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          width: "100%",
          minHeight: "100vh",

        }}
      >
        <SideMenuItems/>
      </Box>
    </>
  );
}

export default SideBar;
