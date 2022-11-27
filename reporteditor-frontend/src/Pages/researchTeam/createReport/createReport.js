import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Snackbar,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Add from "@mui/icons-material/Add";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import { margin } from "@mui/system";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import { UserDataContext } from "../../../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import { getAllUsersByDepartmentAndTeam } from "../../../Services/userService";
import { getTemplate } from "../../../Services/templateServices";
import {
  createReport,
  getReportDataById,
  updateReport,
} from "../../../Services/reportServices";
function CreateReport() {
  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 4;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const { setIsLoading, userInfo } = useContext(UserDataContext);

  const { id } = useParams();
  const navigate = useNavigate();
  const [searchField, setSearchField] = useState("");
  const [allAuther, setAllAuther] = useState([]);
  const [personName, setPersonName] = React.useState([]);
  const [reportName, setReportName] = useState("");
  const changeValue = (e) => {
    setReportName(e.target.value);
  };
  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const currentYear = new Date().getFullYear();
  const addYear = (event) => {
    if (event === "baseyear") {
      setBaseYear(baseYear + 1);
    } else if (event === "forecastyear") {
      setForecastYear(forecastYear + 1);
    }
  };

  const [baseYear, setBaseYear] = useState(new Date().getFullYear());
  const [forecastYear, setForecastYear] = useState(
    new Date().getFullYear() + 5
  );
  const [selectedTemplate, setSelectedTemplate] = useState();

  const getUserList = async () => {
    const res = await getAllUsersByDepartmentAndTeam(
      userInfo.department,
      userInfo.teamType
    );
    console.log(res);
    if (res.status === 200) {
      setAllAuther(res.data.data);
    }
  };

  useEffect(() => {
    // getAllAuther();
    getUserList();
  }, []);

  const [templatesData, setTemplatesData] = useState([]);
  const getData = async () => {
    setIsLoading(true);
    const res = await getTemplate();
    if (res.status === 200) {
      console.log("get details create report", res.data.templateList);
      setTemplatesData(res.data.templateList);
    }
    setIsLoading(false);
  };
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const reportData = {
    _id: "",
    baseYear: baseYear,
    forecastYear: forecastYear,
    template: selectedTemplate,
    userList: personName,
  };

  const submitDetail = async () => {
    if (id) {
      setIsLoading(true);
      const res = await updateReport(reportData);
      if (res.status === 200) {
        console.log("response of report creation", res.status);
        setOpen(true);
        setIsLoading(false);
        navigate("/u_control/report-editor");
      }
    } else {
      setIsLoading(true);
      const res = await createReport(reportData);
      if (res.status === 201) {
        console.log("response of report creation", res.status);
        setOpen(true);
        setIsLoading(false);
        navigate("/u_control/report-editor/");
      }
    }
  };
  const getReportData = async (x) => {
    const res = await getReportDataById(x);
    console.log(res);
    if (res.status === 200) {
      let obj = {
        _id: "",
        baseYear : res.data.data.baseYear,
        forecastYear : res.data.data.forecastYear,
        template : res.data.data.template,
        userList : res.data.data.userList,
      };
      setBaseYear(obj.baseYear);
      setForecastYear(obj.forecastYear);
      setSelectedTemplate(Number(obj.template));

    }
  };
  useEffect(() => {
    getData();
    if(id){
      getReportData(id);
    }
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
          
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          height="8vh"
        >
          <Stack
           
            direction="row"
            justifyContent="start"
            alignItems="center"
            spacing={2}
          >
            <FileCopyOutlinedIcon />
            <Typography sx={{ fontSize: "20px", fontWeight: "" }}>
              Create a Report
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack
        
          direction="row"
          justifyContent="start"
          spacing={2}
          marginTop="30px"
        >
          <Typography sx={{ width: "10vw", fontSize: "15px" }}>
            Report Name
          </Typography>
          <Box sx={{width:"100%",paddingX:"8px",paddingY:"5p"}}
          >
            <TextareaAutosize
              aria-label="minimum height"
              minRows={5}
              placeholder="WRITE NAME"
              style={{ width: "100%", padding:"0.2rem"}}
              value={reportName}
              onChange={(e) => changeValue(e)}
            />

           
          </Box>
        </Stack>
        <Stack
         
          direction="row"
          justifyContent="start"
          alignItems="start"
          spacing={2 }
          marginTop="20px"
        >
          <Typography sx={{ width: "10vw", fontSize: "15px" }}>
            Author Name
          </Typography>
          <FormControl sx={{ m: 1, width: "80vw" }}>
            <InputLabel id="demo-multiple-checkbox-label">select</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="select" />}
              // renderValue={(selected) => selected.join(", ")}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
              size="medium"
            >
              <MenuItem>
                {/* <TextField
                  hiddenLabel
                  id="filled-hidden-label-normal"
                  size="small"
                  variant="standard"
                  sx={{ width: "100%" }}
                  placeholder="search"
                  value={searchField}
                  onChange={(event) => setSearchField(event.target.value)}
                /> */}
              </MenuItem>
              {searchField === ""
                ? allAuther.map((author, index) => (
                    <MenuItem key={index} value={author.userName}>
                      <ListItemText primary={author.userName} />
                    </MenuItem>
                  ))
                : allAuther.filter((author, index) => {
                    if (author.name.includes(searchField) === true) {
                      return (
                        <MenuItem key={index} value={author.userName}>
                          <ListItemText primary={author.userName} />
                        </MenuItem>
                      );
                    } else {
                      return (
                        <MenuItem key={index} value={author.name}>
                          <ListItemText primary={author.name} />
                        </MenuItem>
                      );
                    }
                  })}
            </Select>
          </FormControl>
          
        </Stack>
        &nbsp;&nbsp; &nbsp;&nbsp;
        <Stack
          
          justifyContent="start"
          alignItems="start"
          alignContent="start"
          spacing={4}
          marginTop="50px"
         
          // border="2px solid black"
        >
          <Stack
            
            direction="row"
            justifyContent="start"
            alignItems="start"
            spacing={2}

            //   border="2px solid black"
          >
            <Typography sx={{ width: "10vw", fontSize: "15px" }}>
              Base Year
            </Typography>
            <FormControl variant="outlined">
              <Input
                id="input-with-icon-adornment"
                value={baseYear}
                size="small"
                sx={{
                  
                  fontSize: "14px",
                }}
                onChange={(e) => setBaseYear(Number(e.target.value))}
                startAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      color="secondary"
                      onClick={() => addYear("baseyear")}
                    >
                      <Add />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {/* <Box sx={{ marginLeft: "10px",}}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormGroup
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
              >
                {baseYear &&
                  baseYear.map((x, index) => {
                    return (
                      <>
                      <FormControlLabel
                      control={<Checkbox color="default" size="small" defaultChecked />}
                      label={
                        <span style={{ fontSize: "0.7rem" }}>{x}</span>
                      }
                      />
                      {baseYear.length > 1 ? (
                        <IconButton
                        onClick={() => deleteYear("baseyear", index)}
                        >
                        <CloseIcon sx={{ fontSize: "12px" }} />
                        </IconButton>
                        ) : (
                          ""
                          )}
                          </>
                          );
                        })}
                        </FormGroup>
                        </Box>
                      </Box> */}
          </Stack>
          <Stack
           
            direction="row"
            justifyContent="start"
            alignItems="start"
            spacing={2}

            //   border="2px solid black"
          >
            <Typography sx={{ width: "10vw", fontSize: "15px" }}>
              Forecast Year
            </Typography>
            {/* <IconButton color="secondary" onClick={() => addYear("forecast")}>
            <Add />
          </IconButton> */}
            <FormControl variant="outlined">
              <Input
                id="input-with-icon-adornment"
                value={forecastYear}
                size="small"
                sx={{
                  fontSize: "14px",
                }}
                onChange={(e) => setForecastYear(Number(e.target.value))}
                startAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      color="secondary"
                      onClick={() => addYear("forecastyear")}
                    >
                      <Add />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Stack>
        </Stack>
        <Stack
          display="flex"
          direction="row"
          justifyContent="start"
          alignItems="start"
          spacing={2}
          marginTop="50px"
        >
          <Typography sx={{ width: "25vw", fontSize: "15px" }}>
            Templates
          </Typography>
          <Box sx={{}}>
            <Box
              sx={{
                width: "75vw",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  "& > :not(style)": {
                    m: 1,
                    marginRight: "50px",
                    width: 132,
                    height: 150,

                  },
                }}
              >
                {templatesData
                  ? templatesData.map((value, index) => {
                      return (
                        <Paper
                          elevation={selectedTemplate === index ? 16 : 3}
                          square
                          style={
                            selectedTemplate === index
                              ? { backgroundColor: "rgba(0, 0, 255, 0.42)" }
                              : { backgroundColor: "" }

                          }
                          onClick={() => setSelectedTemplate(index)}
                        >
                          <Stack
                            flexDirection="column"
                            justifyContent="space-around"
                            alignItems="center"
                            spacing={4}
                          >
                            <Typography sx={{ fontSize: "10px" }}>
                              {value.header}
                            </Typography>
                            <Typography
                              sx={{ fontSize: "10px", color: "green" }}
                            >
                              {value.name}
                            </Typography>
                            <Typography sx={{ fontSize: "10px" }}>
                              {value.footer}
                            </Typography>
                          </Stack>
                        </Paper>
                      );
                    })
                  : ""}
              </Box>
            </Box>
          </Box>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8vh",
          }}
        >
          <Button
            variant="contained"
            sx={{
              fontSize: "10px",
              textTransform: "none",
              marginLeft: "8px",
              width: "10vw",
              margin: "auto",
              backgroundColor: "rgba(15, 154, 173, 1)",
            }}
            onClick={submitDetail}
          >
            Start Report Draft
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default CreateReport;
