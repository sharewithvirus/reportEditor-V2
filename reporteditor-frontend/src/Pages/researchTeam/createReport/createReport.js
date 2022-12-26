import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  IconButton,
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
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import React, { useEffect, useState, useContext } from "react";

import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";

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
import {
  getAllIndustry,
  getAllIndustrybyDeptId,
} from "../../../Services/industryServices";
function CreateReport() {
  const { setIsLoading, userInfo } = useContext(UserDataContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchField, setSearchField] = useState("");
  const [allAuther, setAllAuther] = useState([]);
  const [personName, setPersonName] = useState([]);
  const [reportName, setReportName] = useState("");
  const [industries, setIndustries] = useState([]);
  const [baseYear, setBaseYear] = useState(new Date().getFullYear());
  const [forecastYear, setForecastYear] = useState(
    new Date().getFullYear() + 5
  );
  const [industryList, setIndustryList] = useState();
  const [open, setOpen] = React.useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState();
  const [templatesData, setTemplatesData] = useState([]);
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
  const changeValue = (e) => {
    setReportName(e.target.value);
  };
  const handleChange = (event) => {
    setPersonName(event.target.value);
  };
  const handleIndustyChange = (e) => {
    setIndustries(e.target.value);
  };
  const getUserList = async () => {
    const res = await getAllUsersByDepartmentAndTeam(
      userInfo.department,
      userInfo.teamType
    );
    if (res.status === 200) {
      setAllAuther(res.data.data);
    }
  };
  const getAllIndustryList = async () => {
    const res = await getAllIndustrybyDeptId(userInfo.department);
    // console.log(res);
    if (res.status === 200) {
      setIndustryList(res.data.data);
    }
  };
  useEffect(() => {
    // console.log(userInfo);
    getUserList();
    getAllIndustryList();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    const res = await getTemplate();
    if (res.status === 200) {
      setTemplatesData(res.data.templateList);
    }
    setIsLoading(false);
  };
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
    name: reportName,
    industry: industries,
  };

  const submitDetail = async () => {
    if (id) {
      setIsLoading(true);
      const reportData = {
        _id: id,
        baseYear: baseYear,
        forecastYear: forecastYear,
        template: selectedTemplate,
        userList: personName,
        name: reportName,
        industry: industries,
      };

      const res = await updateReport(reportData);
      if (res.status === 200) {
        setOpen(true);
        setIsLoading(false);
        navigate("/u_control/");
      }
    } else {
      setIsLoading(true);

      if (
        reportData.name === "" ||
        reportData.userList === "" ||
        reportData.industry == []
      ) {
        setIsLoading(false);
        alert("required field should not be empty !");
      } else {
        const res = await createReport(reportData);

        if (res.status === 201) {
          setOpen(true);
          setIsLoading(false);
          navigate(`/u_control/report-editor/${res.data.newReport._id}`);
        }
      }
    }
  };
  const getReportData = async (x) => {
    const res = await getReportDataById(x);
    // console.log("report data", res.data.reportData);
    if (res.status === 200) {
      let obj = {
        _id: id,
        baseYear: new Date(res.data.reportData.baseYear).getFullYear(),
        forecastYear: new Date(res.data.reportData.forecastYear).getFullYear(),
        template: res.data.reportData.template,
        userList: res.data.reportData.userList,
        name: res.data.reportData.name,
        industry: res.data.reportData.industry,
      };

      let d = new Date(res.data.reportData.baseYear).getFullYear();
      setBaseYear(obj.baseYear);
      setForecastYear(obj.forecastYear);
      setSelectedTemplate(obj.template);
      setReportName(obj.name);
      setIndustries(obj.industry);
      setPersonName(obj.userList);
    }
  };
  useEffect(() => {
    getData();
    if (id) {
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
          flexDirection={{ sm: "row", md: "row" }}
          justifyContent="start"
          alignItems="center"
          spacing={0}
          height="8vh"
        >
          <FileCopyOutlinedIcon />
          <Typography sx={{ fontSize: "20px", fontWeight: "" }}>
            {id ? "Edit Report" : "Create a Report"}
          </Typography>
        </Stack>
        <Divider />

        <Stack
          flexDirection={{ md: "row" }}
          justifyContent="start"
          spacing={{ sm: 2, md: 0 }}
          mt={4}
        >
          <Typography sx={{ fontSize: "15px" }}>Report Name</Typography>

          <TextareaAutosize
            aria-label="minimum height"
            minRows={5}
            placeholder="WRITE NAME"
            style={{ width: "100%", padding: "0.2rem" }}
            value={reportName}
            required
            onChange={(e) => changeValue(e)}
          />
        </Stack>
        <Stack
          flexDirection={{ md: "row", sm: "column" }}
          justifyContent="start"
          alignItems="start"
          spacing={{ sm: 2, md: 0 }}
          marginTop="20px"
        >
          <Typography sx={{ fontSize: "15px" }}>Author Name</Typography>
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="demo-multiple-checkbox-label">select</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              fullWidth
              value={personName}
              onChange={handleChange}
              required
              input={<OutlinedInput label="select" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value, index) => (
                    <Chip key={`${index}.${value}`} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
              size="medium"
            >
              {searchField === ""
                ? allAuther.map((author, index) => (
                    <MenuItem key={author._id} value={author.userName}>
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
        <Stack
          flexDirection={{ md: "row", sm: "column" }}
          justifyContent="start"
          alignItems="start"
          spacing={{ sm: 2, md: 0 }}
          marginTop="20px"
        >
          <Typography sx={{ fontSize: "15px" }}>All Industries</Typography>
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="demo-multiple-checkbox-label">select</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              fullWidth
              value={industries}
              onChange={handleIndustyChange}
              required
              input={<OutlinedInput label="select" />}
              renderValue={(selected) => (
                // <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                //   {selected.map((value) => (
                //     <Chip key={value} label={value} />
                //   ))}
                // </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => {
                    for (const item of industryList) {
                      if (item._id === value) {
                        return <Chip label={item.name} value={value} />;
                      }
                    }
                  })}
                </Box>
              )}
              MenuProps={MenuProps}
              size="medium"
            >
              {industryList
                ? industryList.map((item, index) => (
                    <MenuItem key={`${item._id}${index}`} value={item._id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))
                : ""}
            </Select>
          </FormControl>
        </Stack>
        <Stack
          flexDirection={{ md: "row" }}
          justifyContent={{ sm: "start", md: "space-evenly" }}
          alignItems="start"
          mt={3}
          spacing={{ sm: 2, md: 0 }}
        >
          <Typography sx={{ fontSize: "15px" }}>Base Year</Typography>
          <FormControl>
            <TextField
              sx={{
                width: "55%",
              }}
              value={baseYear}
              onChange={(e) => setBaseYear(Number(e.target.value))}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      size="small"
                      color="success"
                      onClick={(e) => setBaseYear(baseYear + 1)}
                    >
                      <AddRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(e) => setBaseYear(baseYear - 1)}
                    >
                      <RemoveRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </FormControl>
        </Stack>
        <Stack
          mt={3}
          flexDirection={{ md: "row" }}
          justifyContent={{ sm: "start", md: "space-evenly" }}
          alignItems="start"
          spacing={{ sm: 2, md: 0 }}
        >
          <Typography sx={{ fontSize: "15px" }}>Forecast Year</Typography>

          <FormControl>
            <TextField
              sx={{
                width: "55%",
              }}
              value={forecastYear}
              onChange={(e) => setForecastYear(Number(e.target.value))}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      size="small"
                      color="success"
                      onClick={() => setForecastYear(forecastYear + 1)}
                    >
                      <AddRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setForecastYear(forecastYear - 1)}
                    >
                      <RemoveRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </FormControl>
        </Stack>

        <Stack
          flexDirection={{ md: "row" }}
          justifyContent={{ sm: "center", md: "space-between" }}
          alignItems="start"
          spacing={{ sm: 3, md: 0 }}
          mt={3}
        >
          <Typography sx={{ fontSize: "15px" }}>Templates</Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: {
                  sm: 0.5,
                  md: 4,
                },
                p: {
                  sm: 0,
                  md: 2,
                },
                width: {
                  sm: 125,
                  md: 132,
                },
                height: {
                  sm: 140,
                  md: 150,
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              },
            }}
          >
            {templatesData
              ? templatesData.map((value, index) => {
                  return (
                    <Paper
                    key = {`${index}.${value._id}`}
                      elevation={selectedTemplate === value._id ? 16 : 3}
                      square
                      style={
                        selectedTemplate === value._id
                          ? { backgroundColor: "rgba(0, 0, 255, 0.42)" }
                          : { backgroundColor: "" }
                      }
                      onClick={() => setSelectedTemplate(value._id)}
                    >
                      <Stack
                        flexDirection="column"
                        justifyContent="space-around"
                        alignItems="center"
                        spacing={3}
                      >
                        <Stack
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        > {value?.logoAlignment === "left-top" ? (
                          <img
                            src={value?.url}
                            style={{
                              height: "20px",
                              width: "20px",
                              marginRight: "10px",
                            }}
                          ></img>
                        ) : (
                          ""
                        )}

                          <Typography sx={{ fontSize: "10px" }}>
                            {value.header}
                          </Typography>
                          {value?.logoAlignment === "right-top" ? (
                          <img
                            src={value?.url}
                            style={{
                              height: "20px",
                              width: "20px",
                              marginLeft: "10px",
                            }}
                          ></img>
                        ) : (
                          ""
                        )}
                        </Stack>
                        <Typography sx={{ fontSize: "10px", color: "green" }}>
                          {value.name}
                        </Typography>
                        <Stack
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        >
                          {value?.logoAlignment === "left-bottom" ? (
                          <img
                            src={value?.url}
                            style={{
                              height: "20px",
                              width: "20px",
                              marginRight: "10px",
                            }}
                          ></img>
                        ) : (
                          ""
                        )}
                          <Typography sx={{ fontSize: "10px" }}>
                            {value.footer}
                          </Typography>
                          {value?.logoAlignment === "right-bottom" ? (
                          <img
                            src={value?.url}
                            style={{
                              height: "20px",
                              width: "20px",
                              marginLeft: "10px",
                            }}
                          ></img>
                        ) : (
                          ""
                        )}
                        </Stack>
                      </Stack>
                    </Paper>
                  );
                })
              : ""}
          </Box>
        </Stack>
        <Stack mt={4} justifyContent={{ md: "center", sm: "center" }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              fontSize: "10px",
              textTransform: "none",
              marginLeft: "8px",
              margin: "auto",
              backgroundColor: "rgba(15, 154, 173, 1)",
            }}
            onClick={submitDetail}
          >
            {id ? "Update Report Draft" : "Start Report Draft"}
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default CreateReport;
