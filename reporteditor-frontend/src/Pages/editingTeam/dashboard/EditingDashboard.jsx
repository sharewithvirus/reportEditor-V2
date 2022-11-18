import { Box, Stack } from '@mui/system';
import React from 'react';
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import EditingManagementTable from './component/EditingManagementTable';
import { MenuItem, Select, Typography } from '@mui/material';


function EditingDashboard() {
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
            All Reports
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
                <MenuItem value={2}>Draft Received</MenuItem>
                <MenuItem value={3}>Editing Version</MenuItem>
                <MenuItem value={4}>Transferred to Research</MenuItem>
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
         
          <EditingManagementTable taskStatus={[true,true,true,true]}/>
          <EditingManagementTable taskStatus={[true,false,false,false]}/>
        </Box>
      </Box>
    </>
  )
}

export default EditingDashboard
