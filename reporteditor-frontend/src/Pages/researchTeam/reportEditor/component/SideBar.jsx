import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import SideMenuItems from "./SideMenuItems";
const SubtopicsData = [
  [1],
  [1, 2],
  [
    [1, 2, 3],
    [1, 2, 3],
  ],
  [1],
  [1, 2, [1, 2, [1, 2, [1, 2, 3]]], 4],
];
function SideBar({ reportData }) {
  // console.log("j");
  // console.log(scrWidth);
  // console.log("...kkkk",reportData);
  // console.log( reportData.subTopics);
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
          justifyContent: "space-between",
          overflowY: "auto",
        }}
      >
        <Stack>
          {reportData ? (
            <SideMenuItems data={reportData.subTopics} preIndex={1} />
          ) : (
            ""
          )}
        </Stack>
        {/* {reportData
          ? reportData.map((reportData, index) => {
              return (
                <SideMenuItems
                  data={reportData.subTopics}
                  preIndex={index + 1}
                />
              );
            })
          : ""} */}
      </Box>
    </>
  );
}

export default SideBar;
