import React from "react";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";

import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import ReportManagementTable from "./component/ReportManagementTable";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { getReport } from "../../../Services/reportServices";

function DashboardPanel() {
  const [getData, setGetData] = useState([]);
  const url = "/api/v1/report";
  const getApiData = async () => {
    const res = await getReport();
    if(res.status === 200)
    {
      setGetData(res.data.reportsList);
      // console.log("working or not",res);
      setOpen(true);
    }
  };
  const [open, setOpen] = React.useState(false);
  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
       setOpen(false);
  };
  // console.log(getData);
  useEffect(() => {
    getApiData();
  }, []);
  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
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
              Reports Management
            </Typography>
          </Stack>

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
              <MenuItem value={2}>Drafting</MenuItem>
              <MenuItem value={3}>Forwaded to Editing</MenuItem>
              <MenuItem value={4}>Editing version Done</MenuItem>
              <MenuItem value={5}>Research Published</MenuItem>
            </Select>
          </Stack>
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
          {getData
            ? getData.map((data, index) => {
                return (
                  <ReportManagementTable
                    taskStatus={[true, true, true, true]}
                    reportData={data}
                    key={index}
                  />
                );
              })
            : ""}
          {/* <p> {getData ? getData[3].name : "not coming"} </p> */}
          {/* <ReportManagementTable taskStatus={[true,true,false,false]}/>
          <ReportManagementTable taskStatus={[true,false,false,false]}/> */}
        </Box>
      </Box>
    </>
  );
}

export default DashboardPanel;
