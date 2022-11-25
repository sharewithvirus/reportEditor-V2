import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
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
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Add from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import { margin } from "@mui/system";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate()
  const [searchField, setSearchField] = useState("");
  const [allAuther, setAllAuther] = useState([
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ]);
  const [personName, setPersonName] = React.useState([]);
const [reportName , setReportName]= useState("");
const changeValue = (e) =>{
  setReportName(e.target.value);
}
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const getAllAuther = async () => {
    try {
      const res = await axios.get("api/v1/user");
      // console.log(res.data.data);
      console.log("data is ");
      setAllAuther(res.data.data);
      console.log(allAuther);
    } catch (error) {
      console.log(error);
    }
  };
  const currentYear = new Date().getFullYear();
  const addYear = (event) => {
    if (event === "baseyear") {
      // setBaseYear([...baseYear, baseYear[baseYear.length - 1] + 1]);
      setBaseYear( baseYear + 1);
    } else if (event === "forecastyear") {
      // setForecastYear([
      //   ...forecastYear,
      //   forecastYear[forecastYear.length - 1] + 1,
      // ]);
      setForecastYear( forecastYear + 1)
      // console.log("forecast year");
    }
  };
  // const deleteYear = (event, index) => {
  //   if (event === "baseyear") {
  //     const deletedArray = baseYear.filter((value, i) => {
  //       return i !== index;
  //     });
  //     setBaseYear(deletedArray);
  //   } else if (event === "forecast") {
  //     const deletedArray = forecastYear.filter((value, i) => {
  //       return i !== index;
  //     });
  //     setForecastYear(deletedArray);
  //   }
  // };
  const [baseYear, setBaseYear] = useState(new Date().getFullYear());
  const [forecastYear, setForecastYear] = useState(new Date().getFullYear() + 5);
  const [selectedTemplate, setSelectedTemplate] = useState();
  useEffect(() => {
    getAllAuther();
  }, []);
  const tempelates = [1, 2, 3, 4, 5, 6];
  const [open, setOpen] = React.useState(false);

  const submitDetail = async () => {
    const res = await axios.post("/api/v1/report",{
      name:"Research Topic text",
      reportStatusEditing:"draftRecived",
      reportStatusResearch:"drafting",
     
       industry:"",
       template:"" 
  })
  console.log("function working");
  setOpen(true);
  navigate("/u_control/report-editor")
  }
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
       setOpen(false);
  };
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
            Create a Report
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack
        display="flex"
        direction="row"
        justifyContent="start"
        alignItems="start"
        spacing={2}
        marginTop="30px"
      >
        <Typography sx={{ width: "10vw", fontSize: "15px" }}>
          Report Name
        </Typography>
        <Box sx={{}}>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={5}
            placeholder="ABCD MARKET"
            style={{ width: "75vw", padding: "15px" }}
            value={reportName}
            onChange={(e)=>changeValue(e)}
            />

          {/* <Box
            sx={{
              padding: "50px",
              width: "70vw",
              textAlign: "center",
            }}
            >
            ABCD MARKET
          </Box> */}
        </Box>
      </Stack>
      <Stack
        display="flex"
        direction="row"
        justifyContent="start"
        alignItems="start"
        spacing={2}
        marginTop="20px"
        >
        <Typography sx={{ width: "10vw", fontSize: "15px" }}>
          Author Name
        </Typography>
        {/* <Box sx={{}}>
          <Box sx={{width:'100%'}}> */}
        {/* <FormGroup sx={{ fontSize: "10px" }}>
              {allAuther.map((x, index) => {
                return (
                  <FormControlLabel
                  control={<Checkbox color="default" size="small" />}
                  label={
                    <span style={{ fontSize: "0.7rem" }}>
                    {x.userName} [me]{" "}
                    </span>
                  }
                  />
                  );
                })}
              </FormGroup> */}
        <FormControl sx={{ m: 1, width: "80vw" }}>
          <InputLabel id="demo-multiple-checkbox-label">select</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="select" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
            size="medium"
            >
            <MenuItem>
              <TextField
                hiddenLabel
                id="filled-hidden-label-normal"
                size="small"
                variant="standard"
                sx={{ width: "100%" }}
                placeholder="search"
                value={searchField}
                onChange={(event) => setSearchField(event.target.value)}
                />
            </MenuItem>
            {searchField === ""
              ? allAuther.map((name, index) => (
                <MenuItem key={index} value={name}>
                    <ListItemText primary={name} />
                  </MenuItem>
                ))
              : allAuther.filter((name, index) => {
                  if (name.includes(searchField) === true) {
                    return (
                      <MenuItem key={index} value={name}>
                        <ListItemText primary={name} />
                      </MenuItem>
                    );
                  } else {
                    return (
                      <MenuItem key={index} value={name}>
                        <ListItemText primary={name} />
                      </MenuItem>
                    );
                  }
                })}
          </Select>
        </FormControl>
        {/* </Box>
        </Box> */}
      </Stack>
      <Stack
        display="flex"
        justifyContent="start"
        alignItems="start"
        alignContent="start"
        spacing={5}
        marginTop="50px"
        
        // border="2px solid black"
        >
        <Stack
          display="flex"
          direction="row"
          justifyContent="start"
          alignItems="start"
          spacing={2}
          
          //   border="2px solid black"
          >
          <Typography sx={{ width: "10vw", fontSize: "15px" }}>
            Base Year
          </Typography>
          {/* <IconButton color="secondary" onClick={() => addYear("baseyear")}>
            <Add />
          </IconButton> */}
          <FormControl variant="standard">
            <Input
              id="input-with-icon-adornment"
              value={baseYear}
              size="small"
              sx={{
                width:"8vw",
                fontSize:"14px"
              }}
              onChange = {(e) => setBaseYear(Number(e.target.value))}
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
          display="flex"
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
          <FormControl variant="standard">
            <Input
              id="input-with-icon-adornment"
              value={forecastYear}
              size="small"
              sx={{
                width:"8vw",
                fontSize:"14px"
              }}
              onChange = {(e) => setForecastYear(Number(e.target.value))}
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
          {/* <Box sx={{ marginLeft: "5px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <FormGroup
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
            >
            {forecastYear &&
              forecastYear.map((x, index) => {
                return (
                  <>
                  <FormControlLabel
                  control={
                    <Checkbox
                    color="default"
                    size="small"
                    defaultChecked
                    />
                  }
                  label={
                    <span style={{ fontSize: "0.7rem" }}>{x}</span>
                  }
                  />
                  {forecastYear.length > 1 ? (
                    <IconButton
                    onClick={() => deleteYear("forecast", index)}
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
              {tempelates.map((value, index) => {
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
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        
                        alignItems: "center",
                      }}
                      >
                      <Typography sx={{ fontSize: "10px", marginTop: "50px" }}>
                        Template {value}
                      </Typography>
                    </Stack>
                  </Paper>
                );
              })}
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
