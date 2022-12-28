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
import { useEffect } from "react";
import { useState } from "react";
import { getReport } from "../../../Services/reportServices";

function DashboardPanel() {
  const [getData, setGetData] = useState([]);
  const url = "/api/v1/report";
  const [value, setValue] = useState(0);
  const [openSnack, setopenSnack] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [snackMsg, setSnackMsg] = useState("");
  const getApiData = async () => {
    const res = await getReport();
    if (res.status === 200) {
      setSeverity("success");
      setSnackMsg("Data Fetched !");
      setopenSnack(true);
      setGetData(res.data.reportsList);
      setOpen(true);
    }
  };
  const [open, setOpen] = useState(false);
  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getApiData();
  }, []);
  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {snackMsg}
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
          direction={{
            md: "row",
          }}
          justifyContent="space-between"
          alignItems="center"
          spacing={{
            md: 0,
            sm: 2,
          }}
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
            spacing={{
              md: 5,
              sm: 2,
            }}
          >
            <Typography sx={{ fontSize: "18px", fontWeight: "" }}>
              Showing
            </Typography>
            <Select
              sx={{ width: "60%", height: "30px" }}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            >
              <MenuItem value={0}>Showing all</MenuItem>
              <MenuItem value={1}>Drafting</MenuItem>
              <MenuItem value={2}>Forwaded to Editing</MenuItem>
              <MenuItem value={3}>Editing version Done</MenuItem>
              <MenuItem value={4}>Research Published</MenuItem>
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
          {value === 4
            ? getData
              ? getData.map((data, index) => {
                // console.log(value);
                  if (data.reportStatusEditing.length === value) {
                    return (
                      
                        <ReportManagementTable reportData={data} key={data._id} />
                      
                    );
                  }
                })
              : "No Records Found"
            : value === 3
            ? getData
              ? getData.map((data, index) => {
                // console.log(value);
                  if (data.reportStatusEditing.length === value) {
                    return (
                    
                        <ReportManagementTable reportData={data} key={data._id} />
                      
                    );
                  }
                })
              : "No Records Found"
            : value === 2
            ? ( getData
              ? getData.map((data, index) => {
                // console.log(value);
                  if (data.reportStatusEditing.length === value) {
                    return (
                      
                        <ReportManagementTable reportData={data} key={data._id} />
                      
                    );
                  }
                })
              : "No Records Found")
            : value === 1
            ? (getData
              ? getData.map((data, index) => {
                // console.log(value);
                console.log("status..",data);
                  if (data.reportStatusEditing.length === value) {
                    return (
                      
                        <ReportManagementTable reportData={data} key={data._id} />
                      
                    );
                  }
                })
              : "No Records Found")
            : (getData
            ? getData.map((data, index) => {
              // console.log(value);
                return (
                  
                    <ReportManagementTable reportData={data} key={data._id} />
      
                );
              })
            : "No Records Found")}
        </Box>
      </Box>
    </>
  );
}

export default DashboardPanel;
