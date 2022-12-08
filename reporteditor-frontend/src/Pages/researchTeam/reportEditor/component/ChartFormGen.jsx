import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';

const ChartFormGen = ({ chartFormValues, chartType }) => {
    // console.log("chartFormValues", chartFormValues);

    const initialValues = {
        series: [],
        label: [],
        categories: [],
    }

    const [formChartData, setFormChartData] = useState(null)
    const [formChartData2, setFormChartData2] = useState(initialValues)

    const addChartFormValues = (e) => {
        console.log("formChartDataSE", formChartData.series)
        const { series, label } = formChartData
        console.log("formChartData2", formChartData2)
        setFormChartData2({ ...formChartData2, series: [...series, formChartData.series] })
    }

    const handleFormValueChange = (e) => {
        console.log(e.target.name, "=", e.target.value)
        setFormChartData({ ...formChartData, [e.target.name]: e.target.value })
    }

    return (
        <>
            {
                chartFormValues.map(
                    (item, index) => {
                        return (
                            <div key={index}>
                                <TextField id={chartType} label={item} name={item} variant="outlined" onChange={e => handleFormValueChange(e)} />
                            </div>
                        )
                    }
                )
            }

            <IconButton aria-label="delete" onClick={e => addChartFormValues(e)}>
                <AddCircleIcon />
            </IconButton>
        </>
    )
}

export default ChartFormGen