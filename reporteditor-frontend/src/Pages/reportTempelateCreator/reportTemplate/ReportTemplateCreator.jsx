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
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  createTemplate,
  getTemplateDataById,
  updateTemplate,
} from "../../../Services/templateServices";
import { UserDataContext } from "../../../context/userContext";

function ReportTemplateCreator() {
  const { setIsLoading, userInfo } = useContext(UserDataContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [logoAlignment, setLogoAlignment] = useState("left-to");
  const [templateData, setTemplateData] = useState({
    _id: "",
    name: "",
    header: "",
    url: "",
    footer: "",
    logoAlignment: "left-to",
  });
  const submitValues = async () => {
    console.log(templateData.logoAlignment);
    if (id) {
      // console.log(templateData)
      setIsLoading(true);
      const res = await updateTemplate(templateData);
      if (res.status === 200) {
        setIsLoading(false);
        navigate("/u_control/report-template-management");
      }
    } else {
      if(templateData.header === " " || templateData.name === "" || templateData.footer)
      {
        alert("Name Header and Footer CAN NOT  be Empty !")
      }
      else
      {
        setIsLoading(true);
      const res = await createTemplate(templateData);
      if (res.status === 200) {
        setIsLoading(false);
        navigate("/u_control/report-template-management");
        // console.log(res.status);
      }
      }
    }
  };
  const handleChange = (e) => {
    setTemplateData({ ...templateData, [e.target.name]: e.target.value });
  };

  const getTemplateData = async (x) => {
    setIsLoading(true);
    const res = await getTemplateDataById(x);
    console.log(res);
    if (res.status === 200) {
      let obj = {
        _id: id,
        name: res.data.data.name,
        header: res.data.data.header,
        url: "",
        footer: res.data.data.footer,
        logoAlignment: res.data.data.logoAlignment,
      };
      console.log(res.data.data.logoAlignment);
      setTemplateData(obj);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(id);
    if (id) {
      getTemplateData(id);
    }
  }, []);
  return (
    <>
      <Box
        sx={{
          padding: "15px 50px 5px 50px",
          margin: "5px 50px 5px 50px",
        }}
      >
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          height="8vh"
        >
          <Stack
            flexDirection="row"
            justifyContent="start"
            alignItems="center"
            spacing={2}
          >
            <FileCopyOutlinedIcon />
            <Typography sx={{ fontSize: "20px", fontWeight: "" }}>
              {id ? "Update Report Template" : "Create Report Template"}
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

          <Button variant="outlined" component="label" color="inherit">
            select file
            <input type="file" hidden />
          </Button>
        </Stack>
        <Stack
          mt={5}
          spacing={{sm:3,md:0}}
          flexDirection={{ md: "row" }}
          justifyContent={{ sm: "start", md: "space-between" }}
        >
          <Typography>Logo Alignement</Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="logoAlignment"
            value={templateData.logoAlignment}
            // value={logoAlignment}
            onChange={(e) => handleChange(e)}
            // onChange={(e)=>setLogoAlignment(e.target.value)}
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
        <Stack mt={5} justifyContent="center" flexDirection="row">
          <Button
            variant="contained"
            color="info"
            sx={{ width: {
              sm:"100%0",
              md:"50%",
            }, }}
            onClick={submitValues}
            fullWidth
          >
            {id ? "Update Template" : "Create Template"}
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default ReportTemplateCreator;
