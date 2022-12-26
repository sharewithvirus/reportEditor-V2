import {
  Alert,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { styled, useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import {
  createCharts,
  deleteCharts,
  getAllCharts,
  getChartsById,
  updateCharts,
} from "../../../../Services/chartServices";
import {
  uploadImage,
  getAllReportImages,
} from "../../../../Services/reportImagesServices";
import { UserDataContext } from "../../../../context/userContext";
import ChartFormGen from "./ChartFormGen";
import ImageUpload from "./ImageUpload";
import CloseIcon from "@mui/icons-material/Close";
import copy from "copy-to-clipboard";
import ShowCharts from "./ShowCharts";
import TableUpload from "./TableUpload";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  height: "3vh",
  color: theme.palette.text.secondary,
  border: "1px solid",
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #777",
  boxShadow: 24,
  p: 4,
};
const tableStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "1px solid #777",
  boxShadow: 24,
  minHeight: "450px",
  p: 3,
  borderRadius: "10px",
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const { id } = useParams();
  const chartTypes = [
    {
      value: "pie",
      label: "Pie",
    },
    {
      value: "bar",
      label: "Bar",
    },
    {
      value: "radar",
      label: "Radar",
    },

    {
      value: "line",
      label: "Line",
    },
    {
      value: "area",
      label: "Area",
    },

    {
      value: "donut",
      label: "Donut",
    },
  ];
  const theme = useTheme();

  const { setIsLoading } = useContext(UserDataContext);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openTable, setOpenTable] = useState(false);
  const handleOpen = () => setOpen(!open);
  const handleOpenImage = () => setOpenImage(true);
  const handleOpenTable = () => setOpenTable(true);
  const [openSnack, setopenSnack] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [snackMsg, setSnackMsg] = useState("");
  const [chartFormValues, setChartFormValues] = useState(["series", "label"]);
  const handleCloseImage = () => setOpenImage(false);
  const [chartType, setChartType] = useState("pie");
  const [allImages, setAllImages] = useState(null);
  const [active, setActive] = useState(-1);
  const [copyText, setCopyText] = useState("");
  const [chartList, setChartList] = useState([]);
  const handleCloseTable = () => setOpenTable(false);
  const [editId, setEditId] = useState("");
  const [formChartData, setFormChartData] = useState({
    name: "",
    series: "",
    label: "",
    categories: "",
  });
  const handleClose = () => {
    setEditId("");
    setChartFormValues(["series", "label"]);
    setFormChartData({
      name: "",
      series: "",
      label: "",
      categories: "",
    });
    setOpen(false);
  };
  const [show, setShow] = useState(false);
  const copyToClipboard = (copyText) => {
    copy(`<section id="chart${copyText}"></section>`);
    alert(`<section id="chart${copyText}"></section>`);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const SeletFormChange = (event) => {
    setChartType(event.target.value);
    setShow(false);
    setFormChartData({
      name: "",
      series: "",
      label: "",
      categories: "",
    });
    console.log("formChartData", formChartData);
    if (event.target.value === "pie") {
      setChartFormValues(["series", "label"]);
    } else if (event.target.value === "bar") {
      setChartFormValues(["series", "categories"]);
    } else if (event.target.value === "radar") {
      return setChartFormValues(["series", "categories"]);
    } else if (event.target.value === "stacked") {
      return setChartFormValues(["series", "categories"]);
    } else if (event.target.value === "line") {
      return setChartFormValues(["series", "categories"]);
    } else if (event.target.value === "area") {
      return setChartFormValues(["series", "label"]);
    } else if (event.target.value === "radar") {
      return setChartFormValues(["series", "categories"]);
    } else if (event.target.value === "multibar") {
      setChartFormValues(["series", "categories"]);
    } else if (event.target.value === "donut") {
      return setChartFormValues(["series", "label"]);
    } else if (event.target.value === "barandline") {
      return setChartFormValues(["series", "categories"]);
    }
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleOpenChartModal = (chartId) => {
    getSingleChartData(chartId);
    // setEditId();
    handleOpen(!open);
  };
  const getSingleChartData = async (chartId) => {
    const res = await getChartsById(chartId);
    console.log("fetch data", res.data.data, "chartTypeeee", res.data.data._id);

    if (res.status === 200) {
      setEditId(res.data.data._id);
      setChartType(res.data.data.chartType);
      setFormChartData(res.data.data.formChartData);
      if (res.data.data.chartType === "pie") {
        setChartFormValues(["series", "label"]);
      } else if (res.data.data.chartType === "bar") {
        setChartFormValues(["series", "categories"]);
      } else if (res.data.data.chartType === "radar") {
        return setChartFormValues(["series", "categories"]);
      } else if (res.data.data.chartType === "stacked") {
        return setChartFormValues(["series", "categories"]);
      } else if (res.data.data.chartType === "line") {
        return setChartFormValues(["series", "categories"]);
      } else if (res.data.data.chartType === "area") {
        return setChartFormValues(["series", "label"]);
      } else if (res.data.data.chartType === "radar") {
        return setChartFormValues(["series", "categories"]);
      } else if (res.data.data.chartType === "multibar") {
        setChartFormValues(["series", "categories"]);
      } else if (res.data.data.chartType === "donut") {
        return setChartFormValues(["series", "label"]);
      } else if (res.data.data.chartType === "barandline") {
        return setChartFormValues(["series", "categories"]);
      }
    }
  };
  const saveChartsData = async () => {
    setIsLoading(true);
    const data = {
      reportId: id,
      chartType: chartType ? chartType : "",
      formChartData: formChartData,
    };
    if (formChartData.name === "") {
      alert("Please Enter Chart Name");
    } else {
      const res = await createCharts(data);
      {
        setIsLoading(true);
        if (res.status === 201) {
          console.log("chart added", res.data);
          console.log("chart added", res.data.data);
          setSeverity("success");
          setSnackMsg("Added Successfully !");
          setopenSnack(true);
          setFormChartData({
            name: "",
            series: "",
            label: "",
            categories: "",
          });
          setIsLoading(false);
          getChartsData(id);
          setShow(false);
          handleClose();
        }
      }
    }
    setIsLoading(false);
  };
  const updateChartsDetails = async (chartId) => {
    const data = {
      reportId: id,
      chartType: chartType ? chartType : "",
      formChartData: formChartData,
    };
    setIsLoading(true);
    const res = await updateCharts(data, chartId);
    console.log("chartUpdata...", res);
    if (res.status === 200) {
      console.log("after updation", res);
      setSeverity("success");
      setSnackMsg("Updated Successfully !");
      setopenSnack(true);
      setFormChartData({
        name: "",
        series: "",
        label: "",
        categories: "",
      });
      getChartsData(id);
      setShow(false);
      handleClose();
      setEditId("");
      setIsLoading(false);
    }
  };
  const getChartsData = async (id) => {
    setIsLoading(true);
    const res = await getAllCharts(id);
    {
      if (res.status === 200) {
        // console.log("get chart",res.data.data);
        setChartList(res.data.data);
      }
    }
    setIsLoading(false);
  };
  const handleSnack = () => {
    setopenSnack(!openSnack);
  };
  const deleteChart = async (chartId) => {
    const res = await deleteCharts(chartId);
    console.log("delete res", res);
    setIsLoading(true);
    if (res.status === 200) {
      console.log("chart deleted..");
      setSnackMsg("chart deleted!");
      setSeverity("success");
      getChartsData(id);
      setopenSnack(true);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // console.log("renderkkkk");
  }, [formChartData]);

  useEffect(() => {
    if (id) {
      getChartsData(id);
    }
    getAllImages();
  }, []);

  const getAllImages = async () => {
    setIsLoading(true);
    const res = await getAllReportImages(id);
    if (res.status === 200) {
      setAllImages(res.data.data);
    }
    setIsLoading(false);
  };
  const postImage = async (imgData) => {
    setIsLoading(true);
    setOpenImage(false);
    const res = await uploadImage(id, imgData);
    if (res.status === 200) {
      console.log("success");
      setSnackMsg("image uploaded!");
      setSeverity("success");
      setopenSnack(true);
      getAllImages();
    } else {
      setSnackMsg("something went wrong!");
      setSeverity("error");
      setopenSnack(true);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Snackbar open={openSnack} autoHideDuration={5000} onClose={handleSnack}>
        <Alert onClose={handleSnack} severity={severity} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
      <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="IMAGES" {...a11yProps(0)} />
            <Tab label="TABLES" {...a11yProps(1)} />
            <Tab label="CHARTS" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          border={2}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Stack>
              <Button onClick={handleOpenImage}>
                <Typography>ADD IMAGES</Typography>
              </Button>
            </Stack>
            <Stack
              mt={4}
              justifyContent="start"
              alignItems="center"
              height="450px"
              pl={3}
            >
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {allImages?.map((item, index) => (
                  <Grid
                    item
                    sm={3}
                    md={12}
                    key={item._id}
                    border="1px solid"
                    mt={2}
                  >
                    <img src={item.imgUrl} alt={item.name} width="90%" />
                    <Typography>{item.name}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Button onClick={handleOpenTable} sx={{ mt: "20px" }}>
              <Typography>ADD TABLE</Typography>
            </Button>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Button onClick={handleOpen} sx={{ mt: "20px" }}>
              <Typography>ADD Charts</Typography>
            </Button>
            <Stack sx={{ height: "450px" }}>
              <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                {chartList &&
                  chartList.map((chart, index) => (
                    <Grid
                      item
                      sm={3}
                      md={12}
                      key={index}
                      sx={{
                        border: `${active === index ? "3px" : "3px"} solid ${
                          active === index ? "green" : "grey"
                        }`,
                        padding: "0px",
                        position: "relative",
                        paddingTop: "5px",
                        transition: "0.3s",
                      }}
                      onMouseEnter={() => {
                        setActive(index);
                      }}
                      onMouseLeave={() => {
                        setActive(-1);
                      }}
                      mt={1}
                    >
                      <ShowCharts
                        chartType={chart.chartType}
                        formChartData={chart}
                      />
                      <ButtonGroup
                        sx={{
                          fontSize: "10px",
                          position: "absolute",
                          bottom: "1px",
                          right: "1px",
                          display: `${active === index ? "block" : "none"}`,
                          transition: "0.3s",
                        }}
                      >
                        <Button
                          size="small"
                          variant="contained"
                          color="warning"
                          sx={{
                            marginRight: "2px",
                          }}
                          onClick={() => copyToClipboard(chart._id)}
                        >
                          Copy
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="info"
                          sx={{
                            marginRight: "2px",
                          }}
                          onClick={() => handleOpenChartModal(chart._id)}
                        >
                          EDIT
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() => deleteChart(chart._id)}
                        >
                          DEL
                        </Button>
                      </ButtonGroup>
                    </Grid>
                  ))}
              </Grid>
            </Stack>
          </TabPanel>
        </SwipeableViews>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack flexDirection={"row"} justifyContent="end">
            <IconButton onClick={() => handleClose()}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Stack flexDirection={"row"} justifyContent="space-between" mt={2}>
            <TextField
              id="outlined-select-chart"
              select
              label="Select"
              value={chartType}
              disabled={editId ? true : false}
              onChange={SeletFormChange}
              helperText="Please select your Chart Type"
            >
              {chartTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Chart Name"
              value={formChartData.name}
              size="small"
              onChange={(e) =>
                setFormChartData({ ...formChartData, name: e.target.value })
              }
              disabled={show ? true : false}
            />
          </Stack>
          <ChartFormGen
            formChartData={formChartData}
            setFormChartData={setFormChartData}
            setChartFormValues={setChartFormValues}
            show={show}
            setShow={setShow}
            chartFormValues={chartFormValues}
            chartType={chartType}
            saveChartsData={() => saveChartsData()}
            updateChartsDetails={(x) => updateChartsDetails(x)}
            editId={editId}
          />
        </Box>
      </Modal>
      <Modal
        open={openImage}
        onClose={handleCloseImage}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ImageUpload postImage={(x) => postImage(x)} />
        </Box>
      </Modal>

      <Modal
        open={openTable}
        onClose={handleCloseTable}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={tableStyle}>
          <TableUpload />
        </Box>
      </Modal>
    </>
  );
}
