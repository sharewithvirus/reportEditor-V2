import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  Paper,
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
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { createCharts, getAllCharts } from "../../../../Services/chartServices";
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
      value: "stacked",
      label: "Stacked",
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
      value: "multibar",
      label: "Multibar",
    },
    {
      value: "donut",
      label: "Donut",
    },
    {
      value: "barandline",
      label: "Barandline",
    },
  ];
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openTable, setOpenTable] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenImage = () => setOpenImage(true);
  const handleOpenTable = () => setOpenTable(true);
  const [openSnack, setopenSnack] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [snackMsg, setSnackMsg] = useState("");
  const [chartFormValues, setChartFormValues] = useState(["series", "label"]);
  const handleClose = () => setOpen(false);
  const handleCloseImage = () => setOpenImage(false);
  const [chartType, setChartType] = useState("pie");
  const [active, setActive] = useState(-1);
  const [copyText, setCopyText] = useState("");
  const [chartList,setChartList] = useState([]);
  const handleCloseTable = () => setOpenTable(false)
  const [formChartData, setFormChartData] = useState({
    name: "",
    series: "",
    label: "",
    categories: "",
  });
  const [show, setShow] = useState(false);
  const copyToClipboard = (copyText) => {
    copy(`<div id='${copyText}'><div/>`);
    alert(`copied value <div id='${copyText}'><div/>`);
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
  const saveChartsData = async () => {
    const data = {
      reportId: id,
      chartType: chartType ? chartType : "",
      name: formChartData.name,
      label: formChartData.label,
      series: formChartData.series,
      categories: formChartData.categories ? formChartData.categories : "",
    };
    if (formChartData.name === "") {
      alert("Please Enter Chart Name");
    } else {
      const res = await createCharts(data);
      {
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
          getChartsData(id);
          setShow(false);
          handleClose();
        }
      }
    }
  };
  const getChartsData = async (id) => {
    const res = await getAllCharts(id);
    {
      if (res.status === 200) {
        console.log(res.data.data);
        setChartList(res.data.data);
      }
    }
  };
  useEffect(() => {
    // console.log("renderkkkk");
  }, [formChartData]);
  useEffect(() => {
    if (id) {
      getChartsData(id);
    }
  }, []);
  return (
    <>
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
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Stack>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {Array.from(Array(6)).map((_, index) => (
                  <Grid item sm={4} md={4} key={index}>
                    <Item square color="inherit"></Item>
                  </Grid>
                ))}
              </Grid>
            </Stack>
            <Button onClick={handleOpenImage}>
              <Typography>ADD IMAGES</Typography>
            </Button>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Button onClick={handleOpenTable} sx={{mt:"20px"}} >
                <Typography>ADD TABLE</Typography>
              </Button>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Button onClick={handleOpen} sx={{ mt: "20px" }}>
              <Typography>ADD Charts</Typography>
            </Button>
            <Stack sx={{ height: "450px" }}>
              <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                {chartList
                  ? chartList.map((chart, index) => (
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
                        <Button
                          size="small"
                          variant="contained"
                          color="warning"
                          sx={{
                            fontSize: "10px",
                            position: "absolute",
                            bottom: "1px",
                            right: "1px",
                            display: `${active === index ? "block" : "none"}`,
                            transition: "0.3s",
                          }}
                          onClick={()=>copyToClipboard(chart._id)}
                        >
                          Copy
                        </Button>
                      </Grid>
                    ))
                  : ""}
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
          <ImageUpload />
        </Box>
      </Modal>

      <Modal
        open={openTable}
        onClose={handleCloseTable}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TableUpload />
        </Box>
      </Modal>
    </>
  );
}
