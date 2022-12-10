import {
    Button, Grid, MenuItem, Paper, Stack, TextField
} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { styled, useTheme } from "@mui/material/styles";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import ChartFormGen from "./ChartFormGen";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    height: "3vh",
    color: theme.palette.text.secondary,
    border: "1px solid",
}));


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid #777',
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
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function FullWidthTabs() {
    const chartTypes = [
        {
            value: 'pie',
            label: 'Pie',
        },
        {
            value: 'bar',
            label: 'Bar',
        },
        {
            value: 'radar',
            label: 'Radar',
        },
        {
            value: 'stacked',
            label: 'Stacked',
        },
        {
            value: 'line',
            label: 'Line',
        },
        {
            value: 'area',
            label: 'Area',
        },
        {
            value: 'multibar',
            label: 'Multibar',
        },
        {
            value: 'donut',
            label: 'Donut',
        }, {
            value: 'barandline',
            label: 'Barandline',
        }
    ];
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [chartFormValues, setChartFormValues] = useState(["series", "label"])
    const handleClose = () => setOpen(false);

    const [chartType, setChartType] = useState("pie");

    const [formChartData, setFormChartData] = useState({
        series: "",
        label: "",
        categories: "",
    })
    const [show, setShow] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const SeletFormChange = (event) => {
        setChartType(event.target.value);
        setShow(false)
        setFormChartData({
            series: "",
            label: "",
            categories: ""
        })
        console.log("formChartData", formChartData)
        if (event.target.value === "pie") {
            setChartFormValues(["series", "label"])
        }
        else if (event.target.value === "bar") {
            setChartFormValues(["series", "categories"]);
        }
        else if (event.target.value === "radar") {
            return setChartFormValues(["series", "categories"])
        }
        else if (event.target.value === "stacked") {
            return setChartFormValues(["series", "categories"])
        }
        else if (event.target.value === "line") {
            return setChartFormValues(["series", "categories"])
        }
        else if (event.target.value === "area") {
            return setChartFormValues(["series", "label"])
        }
        else if (event.target.value === "radar") {
            return setChartFormValues(["series", "categories"])
        }
        else if (event.target.value === "multibar") {
            setChartFormValues(["series", "categories"])
        }
        else if (event.target.value === "donut") {
            return setChartFormValues(["series", "label"])
        }
        else if (event.target.value === "barandline") {
            return setChartFormValues(["series", "categories"])
        }
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    useEffect(() => {
        console.log("renderkkkk")
    }, [formChartData])

    return (
        <>
            <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
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
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
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
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
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
                        <Button onClick={handleOpen}>
                            <Typography>ADD Charts</Typography>
                        </Button>
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

                    <ChartFormGen formChartData={formChartData} setFormChartData={setFormChartData} setChartFormValues={setChartFormValues} show={show} setShow={setShow} chartFormValues={chartFormValues} chartType={chartType} />
                </Box>

            </Modal>
        </>
    );
}