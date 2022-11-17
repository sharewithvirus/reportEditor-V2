import { Button, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

function SideMenuItems() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "yellow",
        }}
      >
        <Stack
          sx={{
            dispplay: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Chapter 1</Typography>

            <DriveFileRenameOutlineOutlinedIcon />
          
          
            <AddCircleOutlineOutlinedIcon />
          
            <DeleteIcon />
          
        </Stack>
        
      </Box>
    </>
  );
}

export default SideMenuItems;
