import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton, TextField } from "@mui/material";
import React, { useEffect } from "react";
import GenChart from "./GenChart";

const ChartFormGen = ({
  setChartFormValues,
  chartFormValues,
  saveChartsData,
  chartType,
  formChartData,
  setFormChartData,
  show,
  setShow,
  editId,
  updateChartsDetails,
}) => {
  console.log("chart form values", chartFormValues);
  const handleFormValueChange = (e) => {
    setShow(false);

    setFormChartData({ ...formChartData, [e.target.name]: e.target.value });
  };
  const addSeriesField = () => {
    setChartFormValues([
      ...chartFormValues,
      `series${chartFormValues.length - 1}`,
    ]);
    // console.log("Add Field2", chartFormValues);
  };
  console.log("formData", formChartData);
  useEffect(() => {
    // console.log("formData", formChartData)
  }, [formChartData, setFormChartData]);
//   console.log("chartFormValues", chartFormValues);
  return (
    <>
      {chartFormValues.map((item, index) => {
        return (
          <div key={index} style={{ marginTop: "10px" }}>
            {chartType === "stacked" && item === "categories" ? (
              ""
            ) : (
              <TextField
                id={chartType}
                label={item}
                name={item}
                variant="outlined"
                onChange={(e) => handleFormValueChange(e)}
                value={
                  item === "series" ? formChartData.series : item === "label" ? formChartData.label : item === "series1" ? formChartData.series1 : item === "series2" ? formChartData.series2 : item === "series3" ? formChartData.series3 : item === "series4"
                    ? formChartData.series4
                    : item === "series5"
                    ? formChartData.series5
                    : item === "series6"
                    ? formChartData.series6
                    : item === "series7"
                    ? formChartData.series7
                    : item === "series8"
                    ? formChartData.series8
                    : item === "series9"
                    ? formChartData.series9
                    : item === "categories"
                    ? formChartData.categories
                    : item === "series_names"
                    ? formChartData.series_names
                    : item === "series_col"
                    ? formChartData.series_col
                    : item === "series_area"
                    ? formChartData.series_area
                    : item === "series_line"
                    ? formChartData.series_line
                    : item === "labels_as_per_value"
                    ? formChartData.labels_as_per_value
                    : item === 'namesForCharts' ?
                    formChartData.namesForCharts 
                    : ""
                }
              />
            )}

            {item === "series" &&
            chartType === "bar" &&
            chartFormValues.includes("series9") === false ? (
              <IconButton aria-label="add" onClick={addSeriesField}>
                <AddCircleIcon />
              </IconButton>
            ) : (
              ""
            )}
            {item === "series" &&
            chartType === "radar" &&
            chartFormValues.includes("series4") === false ? (
              <IconButton aria-label="add" onClick={addSeriesField}>
                <AddCircleIcon />
              </IconButton>
            ) : (
              ""
            )}
            {item === "series_names" &&
            chartType === "stacked" &&
            index === 0 &&
            chartFormValues.includes("series5") === false ? (
              <IconButton aria-label="add" onClick={addSeriesField}>
                <AddCircleIcon />
              </IconButton>
            ) : (
              ""
            )}
            {chartType === "stacked" && index == 0 ? (
              <TextField
                sx={{ marginLeft: "10px" }}
                id={chartType}
                label={"categories"}
                name="categories"
                value={formChartData.categories}
                onChange={(e) => handleFormValueChange(e)}
              />
            ) : (
              ""
            )}
          </div>
        );
      })}

      <GenChart
        formChartData={formChartData}
        setFormChartData={setFormChartData}
        show={show}
        setShow={setShow}
        chartType={chartType}
        saveChartsData={() => saveChartsData()}
        editId={editId}
        updateChartsDetails={(x) => updateChartsDetails(x)}
      />
    </>
  );
};

export default ChartFormGen;
