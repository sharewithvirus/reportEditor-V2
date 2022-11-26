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
import React, { useState } from "react";
import axios from "axios";
import { createTemplate } from "../../../Services/templateServices";

function ReportTemplateCreator() {
  const [templateData, setTemplateData] = useState({
    name: "",
    header: "",
    url: "",
    footer: "",
    logoAlignment: "",
  });
  const submitValues = async () => {
    const res = await createTemplate(templateData);
    if(res.status === 200){
      console.log(res.status);
  }
  }
  const handleChange = (e) => {
    setTemplateData({ ...templateData, [e.target.name]: e.target.value });
  };
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
                Create A Report Template
              </Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack sx={{ marginTop: "10px" }} spacing={1}>
            <Typography variant="subtitle2">Header</Typography>
            <TextField
              name="header"
              multiline
              value={templateData.header}
              onChange={(e) => handleChange(e)}
            />
          </Stack>
          <Stack sx={{ marginTop: "10px" }} spacing={1}>
            <Typography variant="subtitle2">Name</Typography>
            <TextField
              name="name"
              multiline
              value={templateData.name}
              onChange={(e) => handleChange(e)}
            />
          </Stack>
          <Stack sx={{ marginTop: "50px" }} spacing={1}>
            <Typography variant="subtitle2">Footer</Typography>
            <TextField
              name="footer"
              multiline
              size="medium"
              value={templateData.footer}
              onChange={(e) => handleChange(e)}
            />
          </Stack>
          <Stack sx={{ marginTop: "50px" }} spacing={1}>
            <Typography variant="subtitle2">URL</Typography>
            {/* <TextField
            id="outlined-multiline-flexible"
            size="small"
            value={""}
            // onChange={handleChange}
          /> */}
            <Button variant="outlined" component="label" color="inherit">
              select file
              <input type="file" hidden />
            </Button>
          </Stack>
          <Stack
            sx={{ marginTop: "50px" }}
            spacing={0}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>Logo Alignement</Typography>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="left-to"
                control={<Radio size="small" />}
                label="Left To"
              />
              <FormControlLabel
                value="right-to"
                control={<Radio size="small" />}
                label="Right To"
              />
              <FormControlLabel
                value="left-bottom"
                control={<Radio size="small" />}
                label="Left bottom"
              />
              <FormControlLabel
                value="right-bottom"
                control={<Radio size="small" />}
                label="Right bottom"
              />
            </RadioGroup>
          </Stack>
          <Stack mt={5}>
            <Button variant="contained" color="info" sx={{ width: "20%" }}
            onClick={submitValues}
            
            >
              Create Template
            </Button>
          </Stack>
        </Box>
  
    </>
  );
}

export default ReportTemplateCreator;
