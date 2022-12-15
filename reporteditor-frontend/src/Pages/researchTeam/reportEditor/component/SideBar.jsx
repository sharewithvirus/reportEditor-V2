import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import SideMenuItems from "./SideMenuItems";

function SideBar({ subTopicList, ativeDataSet, getReportDataText }) {
  // console.log(getReportDataText);
  // console.log(subTopicList);
  return (
    <>
      <Box
        sx={{
          //   backgroundColor: "rgba(0, 0, 0, 0.3)",
          width: "100%",
          height: "500px",
          borderTop: "1px solid",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          overflowY: "auto",
          // backgroundColor:"red"
        }}
      >
        {/* <Stack>
          {subTopicList ?
           <SideMenuItems preIndex={1} itemList={subTopicList}/>
           :""
          }
        </Stack> */}
        {subTopicList && subTopicList.length > 0  &&
          subTopicList.map((item, index) => {
            return (
              <SideMenuItems
           
              index2={Number(index + 1)}
                item={item}
                key = {item._id}
                  preIndex='null'
                ativeDataSet={(x) => ativeDataSet(x)}
                getReportDataText = {getReportDataText}
                
              />
            );
          })}
      </Box>
    </>
  );
}

export default SideBar;
