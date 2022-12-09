import { TextField } from '@mui/material';
import React from 'react';
import GenChart from './GenChart';

const ChartFormGen = ({ chartFormValues, initialValues, chartType, formChartData, setFormChartData, show, setShow }) => {

    const handleFormValueChange = (e) => {
        setShow(false)
        console.log("formChartDataName", formChartData)
        setFormChartData({ ...formChartData, [e.target.name]: e.target.value })
    }

    return (
        <>
            {
                chartFormValues.map(
                    (item, index) => {
                        return (
                            <div key={index}>
                                <TextField id={chartType} label={item} name={item} variant="outlined" onChange={e => handleFormValueChange(e)}
                                    value={item === 'series' ? formChartData.series : item === "label" ? formChartData.label : formChartData.categories} />
                            </div>
                        )
                    }
                )
            }
            <GenChart formChartData={formChartData} setFormChartData={setFormChartData} initialValues={initialValues} show={show} setShow={setShow} chartType={chartType} />
        </>
    )
}

export default ChartFormGen