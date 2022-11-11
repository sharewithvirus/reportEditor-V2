import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import NavBar from "../../../components/NavBar";
import ReportManagementTable from "./component/ReportManagementTable";
import { Option } from "react-bootstrap-icons";

function Dashboard() {
  return (
    <>
      <NavBar reportsDashboard={"Research Team Mode"} />
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
            <FileCopyOutlinedIcon/>
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              User Management
            </Typography>
          </Stack>
          {/* <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
          >
            Create User
          </Button> */}
          <Stack
            display="flex"
            direction="row"
            justifyContent="start"
            alignItems="center"
            spacing={5}
          >
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              Showing
            </Typography>
            <Select sx={{width:"200px",height:"30px"}}
            value={1}
            >
              <MenuItem value={1}>Showing all</MenuItem>
              <MenuItem value={2}>Twenty</MenuItem>
              <MenuItem value={3}>Thirty</MenuItem>
            </Select>
          </Stack>
        </Stack>
        <Box
          my={4}
          sx={{
            // border: "1px solid black",/
          }}
        >
          {/* <Box
            sx={{
              borderRadius: "5px",
              // padding: "50px",
              margin: "50px",
            }}
          >
            
          </Box> */}
          <ReportManagementTable/>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
