import React from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import ReportManagementTable from "./component/ReportManagementTable";

function DashboardPanel({ pageType }) {
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
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack
            display="flex"
            direction="row"
            justifyContent="start"
            alignItems="center"
            spacing={2}
          >
            <FileCopyOutlinedIcon />
            <Typography sx={{ fontSize: "20px", fontWeight: "" }}>
              {pageType === "Reports Management"
                ? "Reports Management"
                : "Create Report"}
            </Typography>
          </Stack>
          {pageType === "Reports Management" ? (
            <Stack
              display="flex"
              direction="row"
              justifyContent="start"
              alignItems="center"
              spacing={5}
            >
              <Typography sx={{ fontSize: "18px", fontWeight: "" }}>
                Showing
              </Typography>
              <Select sx={{ width: "10vw", height: "30px" }} value={1}>
                <MenuItem value={1}>Showing all</MenuItem>
                <MenuItem value={2}>Twenty</MenuItem>
                <MenuItem value={3}>Thirty</MenuItem>
              </Select>
            </Stack>
          ) : (
            ""
          )}
        </Stack>
        <Box
          my={4}
          sx={
            {
              // border: "1px solid black",/
            }
          }
        >
          {/* <Box
            sx={{
              borderRadius: "5px",
              // padding: "50px",
              margin: "50px",
            }}
          >
            
          </Box> */}
          <ReportManagementTable taskStatus={[true,true,true,true]}/>
          <ReportManagementTable taskStatus={[true,true,false,false]}/>
          <ReportManagementTable taskStatus={[true,false,false,false]}/>
        </Box>
      </Box>
    </>
  );
}

export default DashboardPanel;
