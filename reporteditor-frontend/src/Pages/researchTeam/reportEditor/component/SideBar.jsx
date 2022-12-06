import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import SideMenuItems from "./SideMenuItems";
const SubtopicsData =[[1],[1,2],[[1,2,3],[1,2,3]],[1],[1,2,[1,2,[1,2,[1,2,3]]],4]];
function SideBar() {
  // console.log("j");
  // console.log(scrWidth);
  return (
    <>
      <Box
        sx={{
          //   backgroundColor: "rgba(0, 0, 0, 0.3)",
          width: "100%",
          height:"500px",
          borderTop: "1px solid",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflowY:"auto"
        }}
      >
        <Stack>
          {SubtopicsData.map((element, index) => {
            return <SideMenuItems  itemNo={index} item ={element} preIndex={Number(index + 1)}/>;
          })}
        </Stack>
        
      </Box>
    </>
  );
}

export default SideBar;
