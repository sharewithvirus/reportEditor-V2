import { Button, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useRef, useState } from "react";
const valArr=[1,2,3,4];
function SideMenuItems({ clWidth, itemNo }) {
  console.log(clWidth);
  return (
    <>
      <Box
        sx={{
          width: "100%",
        //   backgroundColor: "grey",
          borderBottom:"1px solid"
        }}
        
      >
        <Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {clWidth < 200 ? (
            <Typography>{itemNo+1}</Typography>
          ) : (
            <Typography>Chapter {itemNo+1}</Typography>
          )}

          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <DriveFileRenameOutlineOutlinedIcon />

            <AddCircleOutlineOutlinedIcon />

            <DeleteIcon />
          </Stack>
        </Stack>
        <Stack>
            {valArr.map((element,index)=>{
                <SideMenuItems clWidth={clWidth} itemNo={index}/>
            })}
        </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default SideMenuItems;
