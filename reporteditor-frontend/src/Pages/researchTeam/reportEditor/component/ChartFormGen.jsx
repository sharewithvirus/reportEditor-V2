import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import GenChart from './GenChart';

const ChartFormGen = ({ setChartFormValues, chartFormValues, saveChartsData , chartType, formChartData, setFormChartData, show, setShow, }) => {

    const handleFormValueChange = (e) => {
        setShow(false)
        // console.log("formChartDataName", formChartData)
        setFormChartData({ ...formChartData, [e.target.name]: e.target.value })
    }
    const addSeriesField = () => {
        setChartFormValues([...chartFormValues, `series${chartFormValues.length - 1}`])

        // setFormChartData({ ...formChartData, formChartData["series"]})
        // setChartFormValues([...chartFormValues, "series1"])
        console.log("Add Field2", chartFormValues);
    }

    useEffect(() => {
        console.log("formData", formChartData)
    }, [formChartData, setFormChartData])

    console.log("chartFormValues", chartFormValues);
    return (
        <>
            {
                chartFormValues.map(
                    (item, index) => {
                        return (
                            <div key={index}>
                                <TextField id={chartType} label={item} name={item} variant="outlined" onChange={e => handleFormValueChange(e)}
                                    value={item === 'series' ? formChartData.series : item === "label" ? formChartData.label : item === "series1" ? formChartData.series1 : item === 'categories' ? formChartData.categories : ""} />

                                {item === 'series' && chartType === 'bar' ? <IconButton aria-label="add" onClick={addSeriesField}>
                                    <AddCircleIcon />
                                </IconButton> : ""}
                            </div>
                        )
                    }
                )
            }
            <GenChart formChartData={formChartData} setFormChartData={setFormChartData} show={show} setShow={setShow} chartType={chartType} saveChartsData ={()=>saveChartsData()}  />
        </>
    )
}

export default ChartFormGen