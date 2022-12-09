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
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

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
            value: 'stacked',
            label: 'Stacked',
        },
        {
            value: 'multibar',
            label: 'Multibar',
        },
        {
            value: 'donut',
            label: 'Donut',
        }, {
            value: 'brandline',
            label: 'Brandline',
        }
    ];
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [chartType, setChartType] = useState({

        pie: false,
        bar: false,
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const SeletFormChange = (event) => {
        setChartType(event.target.value);
        if (event.target.value === "pie") {
            setChartType(chartType.pie)
        }
        else if (event.target.value === "bar") {
            setChartType(!chartType.bar)
        }
    };

    const handleCtypeChange = (event) => {
        if (event.target.vlaue == "pie") {
            return (
                <>
                    <p>pie form</p>
                </>
            )
        }
    }

    const handleChangeIndex = (index) => {
        setValue(index);
    };

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

                    {chartType.pie ? <>h1</> : ""}

                    {chartType.bar ? <>Bar Chart Form</> : ""}


                    <Button>
                        <Typography>+</Typography>
                    </Button>
                </Box>

            </Modal>
        </>
    );
}