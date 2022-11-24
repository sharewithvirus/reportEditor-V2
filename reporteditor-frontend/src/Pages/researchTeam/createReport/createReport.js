import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
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
      setBaseYear([...baseYear, baseYear[baseYear.length - 1] + 1]);
    } else if (event === "forecast") {
      setForecastYear([
        ...forecastYear,
        forecastYear[forecastYear.length - 1] + 1,
      ]);
    }
  };
  const deleteYear = (event, index) => {
    if (event === "baseyear") {
      const deletedArray = baseYear.filter((value, i) => {
        return i !== index;
      });
      setBaseYear(deletedArray);
    } else if (event === "forecast") {
      const deletedArray = forecastYear.filter((value, i) => {
        return i !== index;
      });
      setForecastYear(deletedArray);
    }
  };
  const [baseYear, setBaseYear] = useState([new Date().getFullYear()]);
  const [forecastYear, setForecastYear] = useState([
    new Date().getFullYear() + 5,
  ]);
  const [selectedTemplate, setSelectedTemplate] = useState();
  useEffect(() => {
    getAllAuther();
  }, []);
  const tempelates = [1, 2, 3, 4, 5, 6];
  return (
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
            creat a report
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
            minRows={15}
            placeholder="ABCD MARKET"
            style={{ width: "70vw", padding: "15px" }}
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
        <Box sx={{}}>
          <Box sx={{}}>
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
            <FormControl sx={{ m: 1, width: 300 }}>
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
                    if(name.includes(searchField) === true)
                    {
                      return (
                        <MenuItem key={index} value={name}>
                          <ListItemText primary={name} />
                        </MenuItem>
                      );
                    }
                    else
                    {
                      return (
                        <MenuItem key={index} value={name}>
                          <ListItemText primary={name} />
                        </MenuItem>
                      );
                    }
                    })}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Stack>
      <Stack
        display="flex"
        direction="row"
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
          <IconButton color="secondary" onClick={() => addYear("baseyear")}>
            <Add />
          </IconButton>
          <Box sx={{ marginLeft: "10px", width: "10vw" }}>
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
                          control={<Checkbox color="default" size="small" />}
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
          </Box>
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
          <IconButton color="secondary" onClick={() => addYear("forecast")}>
            <Add />
          </IconButton>
          <Box sx={{ marginLeft: "5px", width: "10vw" }}>
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
                          control={<Checkbox color="default" size="small" />}
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
          </Box>
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
        >
          Start Report Draft
        </Button>
      </Stack>
    </Box>
  );
}

export default CreateReport;
