import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const GenChart = ({
  formChartData,
  setFormChartData,
  show,
  setShow,
  chartType,
  saveChartsData,
  editId,
  updateChartsDetails,
}) => {
  const [inputValue, setInputValue] = useState(null);

  const addChartFormValues = () => {
    setShow(true);
    setInputValue(formChartData);
    setTimeout(() => {}, 2000);
  };

  useEffect(() => {
    // console.log("formChartData", formChartData)
    // console.log("inputValue", inputValue)
  }, [formChartData, show, addChartFormValues]);

  let chartData;

  if (chartType === "pie") {
    chartData = {
      series: inputValue?.series?.split(",").map((item1) => parseInt(item1)),
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: inputValue?.label?.split(","),
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  } 
  else if (chartType === "bar") {
    chartData = {
      series: [
        {
          data: inputValue?.series?.split(",").map((item1) => parseInt(item1)),
        },
        {
          data: inputValue?.series1?.split(",").map((item1) => parseInt(item1)),
        },
        {
          data: inputValue?.series2?.split(",").map((item1) => parseInt(item1)),
        },
        {
          data: inputValue?.series3?.split(",").map((item1) => parseInt(item1)),
        },
        {
          data: inputValue?.series4?.split(",").map((item1) => parseInt(item1)),
        },
        {
          data: inputValue?.series5?.split(",").map((item1) => parseInt(item1)),
        },
        {
          data: inputValue?.series6?.split(",").map((item1) => parseInt(item1)),
        },
        {
          data: inputValue?.series7?.split(",").map((item1) => parseInt(item1)),
        },
        {
          data: inputValue?.series8?.split(",").map((item1) => parseInt(item1)),
        },
        {
          data: inputValue?.series9?.split(",").map((item1) => parseInt(item1)),
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
        },
        title: {
          text: inputValue?.name,
        },
        plotOptions: {
          bar: {
            vertical: true,
            borderRadius: 4,
          },
        },
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories: inputValue?.categories?.split(","),
        },
      },
    };
  }
   else if (chartType === "radar") {
    chartData = {
      series: [
        {
          name: "Series 1",
          data: inputValue?.series?.split(",").map((item1) => parseInt(item1)),
        },
        {
          name: "Series 2",
          data: inputValue?.series1?.split(",").map((item1) => parseInt(item1)),
        },
        {
          name: "Series 3",
          data: inputValue?.series2?.split(",").map((item1) => parseInt(item1)),
        },
        {
          name: "Series 4",
          data: inputValue?.series3?.split(",").map((item1) => parseInt(item1)),
        },
        {
          name: "Series 5",
          data: inputValue?.series4?.split(",").map((item1) => parseInt(item1)),
        },
      ],
      options: {
        chart: {
          height: 400,
          type: "radar",
        },
        title: {
          text: inputValue?.name,
        },
        xaxis: {
          categories: inputValue?.categories?.split(","),
        },
      },
    };
  }
   else if (chartType === "line") {
    chartData = {
      series: [
        {
          name: inputValue?.name,
          data: inputValue?.series?.split(",").map((item1) => parseInt(item1)),
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Chart Name",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: inputValue?.categories?.split(","),
        },
      },
    };
  } 
  else if (chartType === "area") {
    chartData = {
      series: [
        {
          name: inputValue?.name,
          data: inputValue?.series?.split(",").map((item1) => parseInt(item1)),
        },
      ],
      options: {
        chart: {
          type: "area",
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },

        title: {
          text: inputValue?.name,
          align: "left",
        },
        subtitle: {
          text: inputValue?.name,
          align: "left",
        },
        labels: inputValue?.label?.split(","),
        yaxis: {
          opposite: true,
        },
        legend: {
          horizontalAlign: "left",
        },
      },
    };
  }
   else if (chartType === "donut") {
    chartData = {
      series: inputValue?.series?.split(",").map((item1) => parseInt(item1)),
      options: {
        chart: {
          type: "donut",
        },
        labels: inputValue?.label?.split(","),
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  } 
  else if (chartType === "stacked") {
    chartData = {
      series: [
        {
          name: inputValue?.series_names?.split(",")[0],
          data: inputValue?.series?.split(",").map((item1) => parseInt(item1)),
        },
        {
          name: inputValue?.series_names?.split(",")[1],
          data: inputValue?.series2?.split(",").map((item1) => parseInt(item1)),
        },
        {
          name: inputValue?.series_names?.split(",")[2],
          data: inputValue?.series3?.split(",").map((item1) => parseInt(item1)),
        },
        {
          name: inputValue?.series_names?.split(",")[3],
          data: inputValue?.series4?.split(",").map((item1) => parseInt(item1)),
        },
        {
          name: inputValue?.series_names?.split(",")[4],
          data: inputValue?.series5?.split(",").map((item1) => parseInt(item1)),
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
        },
        plotOptions: {
          bar: {
            vertical: true,
            dataLabels: {
              total: {
                enabled: true,
                offsetX: 0,
                style: {
                  fontSize: "13px",
                  fontWeight: 900,
                },
              },
            },
          },
        },
        stroke: {
          width: 1,
          colors: ["#fff"],
        },
        title: {
          text: inputValue?.name,
        },
        xaxis: {
          categories: inputValue?.categories?.split(","),
          labels: {
            formatter: function (val) {
              return val + "K";
            },
          },
        },
        yaxis: {
          title: {
            text: undefined,
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + "K";
            },
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: 40,
        },
      },
    };
  }
   else if (chartType === "mixed") {
    chartData = {
      series: [
        {
          name: inputValue?.namesForCharts?.split(",")[0],
          type: "column",
          data: inputValue?.series_col?.split(",").map((item1) => parseInt(item1)),
        },
        {
          name: inputValue?.namesForCharts?.split(",")[1],
          type: "area",
          data: inputValue?.series_area?.split(",").map((item1) => parseInt(item1)),
        },
        {
          name: inputValue?.namesForCharts?.split(",")[2],
          type: "line",
          data: inputValue?.series_line?.split(",").map((item1) => parseInt(item1)),
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          stacked: false,
        },
        stroke: {
          width: [0, 2, 5],
          curve: "smooth",
        },
        plotOptions: {
          bar: {
            columnWidth: "50%",
          },
        },

        fill: {
          opacity: [0.85, 0.25, 1],
          gradient: {
            inverseColors: false,
            shade: "light",
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100],
          },
        },
        labels: inputValue?.labels_as_per_value?.split(","),
        markers: {
          size: 0,
        },
        xaxis: {
          type: "string",
        },
        yaxis: {
          title: {
            text: inputValue?.name,
          },
          min: 0,
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " points";
              }
              return y;
            },
          },
        },
      },
    };
  }
  return (
    <>
      <div id="chart">
        {show ? (
          chartType === "mixed" ? (
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type={chartType === "mixed" ? "line" : chartType}
              width={380}
            />
          ) : (
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}         
              type={chartType === "stacked" ? "bar" : chartType}
              width={380}
              height={350}
            />
          )
        ) : (
          ""
        )}
        <Stack justifyContent="space-between" flexDirection={"row"}>
          <IconButton
            aria-label="delete"
            onClick={addChartFormValues}
            disabled={show ? true : false}
          >
            Click To Preview <AddCircleIcon />
          </IconButton>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            sx={{ marginRight: "10px" }}
          >
            {editId ? (
              <Button
                variant="contained"
                color="warning"
                size="small"
                onClick={() => updateChartsDetails(editId)}
                disabled={show ? false : true}
              >
                UPDATE
              </Button>
            ) : (
              <Button
                variant="contained"
                color="warning"
                size="small"
                onClick={() => saveChartsData()}
                disabled={show ? false : true}
              >
                SAVE CHART
              </Button>
            )}
            <Button
              variant="contained"
              size="small"
              sx={{ marginLeft: "10px" }}
              color="error"
              disabled={show ? false : true}
              onClick={() => setShow(false)}
            >
              CANCEL
            </Button>
          </Stack>
        </Stack>
      </div>
    </>
  );
};

export default GenChart;
