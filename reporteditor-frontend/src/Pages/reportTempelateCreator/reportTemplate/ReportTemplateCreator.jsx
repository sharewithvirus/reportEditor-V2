import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import React from "react";

function ReportTemplateCreator() {
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
          height="8vh"
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
              creat a report template
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack sx={{ marginTop: "10px" }} spacing={1}>
          <Typography variant="subtitle2">Header</Typography>
          <TextField
            id="outlined-multiline-flexible"
            multiline
            value={""}
            // onChange={handleChange}
          />
        </Stack>
        <Stack sx={{ marginTop: "50px" }} spacing={1}>
          <Typography variant="subtitle2">Footer</Typography>
          <TextField
            id="outlined-multiline-flexible"
            multiline
            size="medium"
            
            value={""}
            // onChange={handleChange}
          />
        </Stack>
        <Stack sx={{ marginTop: "50px" }} spacing={1}>
          <Typography variant="subtitle2">URL</Typography>
          <TextField
            id="outlined-multiline-flexible"
            size="small"
            value={""}
            // onChange={handleChange}
          />
        </Stack>
        <Stack sx={{ marginTop: "50px" }} spacing={0} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" >
          <Typography>Logo Alignement</Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="left-to"
              control={<Radio size="small"/>}
              label="Left To"
              
            />
            <FormControlLabel
              value="right-to"
              
              control={<Radio size="small"/>}
              label="Right To"
            />
            <FormControlLabel
              value="left-bottom"
              
              control={<Radio size="small"/>}
              label="Left bottom"
            />
            <FormControlLabel
              value="right-bottom"
              
              control={<Radio size="small"/>}
              label="Right bottom"
            />
           
          </RadioGroup>
        </Stack>
        <Stack mt={5} >
          <Button variant="contained" color="info" sx={{width:"20%",}} >Create Template</Button>
        </Stack>
      </Box>
    </>
  );
}

export default ReportTemplateCreator;
