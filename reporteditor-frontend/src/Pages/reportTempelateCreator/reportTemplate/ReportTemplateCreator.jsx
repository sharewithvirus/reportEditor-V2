import {
  Alert,
  Box,
  Button,
  Divider,
  Fab,
  FormControlLabel,
  Radio,
  RadioGroup,
  Snackbar,
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
import LogoImage from "./LogoImage";
function ReportTemplateCreator() {
  const { setIsLoading, userInfo } = useContext(UserDataContext);
  const [openSnack, setopenSnack] = useState(false);
  const handleClose = () => setopenSnack(false);
  const [severity, setSeverity] = useState("success");
  const [snackMsg, setSnackMsg] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [imgLogo, setImgLogo] = useState(null);
  const [imgUrlLogo,setImgUrlLogo] = useState("");
  // const [logoAlignment, setLogoAlignment] = useState("left-to");
  const [templateData, setTemplateData] = useState({
    _id: "",
    name: "",
    header: "",
    url: "",
    footer: "",
    logoAlignment: "left-top",
  });

  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setTemplateData({ ...templateData, [e.target.name]: e.target.value });
  };

  const submitValues = async () => {
    const formData = new FormData();
    console.log("Form Data", formData.length)
    let tempData = templateData;
    if(imgUrlLogo && !imgLogo)
    {
      console.log("image url...",imgUrlLogo);
      setTemplateData({ ...templateData, url : imgUrlLogo });
      tempData.url = imgUrlLogo;
      console.log("...template data..",templateData);
    }
    else if(imgLogo){
      console.log("file...",imgLogo);
      formData.append("templateImg", imgLogo);
      formData.append("_id", templateData._id);
      formData.append("name", templateData.name);
      formData.append("header", templateData.header);
      formData.append("footer", templateData.footer);
      formData.append("logoAlignment", templateData.logoAlignment);
      console.log("Form Data After Data Implement", formData.length)
    }
  
    if (id) {
      setIsLoading(true);
      // alert("UPdate Form Data")
      const res = await updateTemplate(Array.from(formData.keys()).length == 0 ? tempData : formData );
      if (res.status === 200) {
        setSeverity("success");
        setSnackMsg("updated successfully!");
        setIsLoading(false);
        setopenSnack(true);

        navigate("/u_control/report-template-management");
      }
      else {
        setIsLoading(false);
        alert(res.message)
      }
    } else {
      if (
        templateData.header === "" ||
        templateData.name === "" ||
        templateData.footer === "" ||
        formData.file === null
      ) {
        alert("Name , Header and Footer CAN NOT  be Empty !");
      } else {
        setIsLoading(true);
        alert("Data Send", formData.length);
        console.log(Array.from(formData.keys()).length);
        console.log("Updated Template Data", tempData);
        const res = await createTemplate(Array.from(formData.keys()).length == 0 ? tempData : formData );
        if (res.status === 200) {
          setIsLoading(false);
          setSeverity("success");
          setSnackMsg("created successfully!");
          setIsLoading(false);
          navigate("/u_control/report-template-management");
        }
        else {
          setIsLoading(false);
          alert(res.message)
        }
      }
    }
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
        url: res.data.data.url,
        footer: res.data.data.footer,
        logoAlignment: res.data.data.logoAlignment,
      };
      console.log(res.data.data.logoAlignment);
      setTemplateData(obj);
    }
    setIsLoading(false);
  };

  // const imgURLChange = (imgURL) => {
  //   if(imgURL){
  //     setTemplateData({...templateData, url:imgURL});
  //   }
  // }

  useEffect(() => {
    console.log(id);
    if (id) {
      getTemplateData(id);
    }
  }, []);
  return (
    <>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
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
        <LogoImage
          setImgLogo={(x) => setImgLogo(x)}
         
          imgUrl={templateData?.url}
          setImgUrlLogo = {(y)=>setImgUrlLogo(y)}
        />
        {/* {imgLogo? console.log(imgLogo) : "" } */}
        <Stack
          mt={5}
          spacing={{ sm: 3, md: 0 }}
          flexDirection={{ md: "row" }}
          justifyContent={{ sm: "start", md: "space-between" }}
        >
          <Typography>Logo Alignement</Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="logoAlignment"
            value={templateData.logoAlignment}
            onChange={(e) => handleChange(e)}
          >
            <FormControlLabel
              value="left-top"
              control={<Radio size="small" />}
              label="Left ToP"
            />
            <FormControlLabel
              value="right-top"
              control={<Radio size="small" />}
              label="Right ToP"
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
            sx={{
              width: {
                sm: "100%0",
                md: "50%",
              },
            }}
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
