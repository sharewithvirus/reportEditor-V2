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
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
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
      ],
      options: {
        chart: {
          height: 400,
          type: "radar",
        },
        title: {
          text: "Basic Radar Chart",
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
          name: "Desktops",
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
          name: "STOCK ABC",
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
          text:inputValue?.name,
          align: "left",
        },
        subtitle: {
          text: "Price Movements",
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
   else if (chartType === "multibar") {
    chartData = {
      series: [
        {
          data: inputValue?.series?.split(",").map((item1) => parseInt(item1)),
        },
        {
          data: inputValue?.series?.split(",").map((item1) => parseInt(item1)),
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: inputValue?.categories?.split(","),
        },
      },
    };
  } else if (chartType === "donut") {
    chartData = {
      series: inputValue?.series?.split(",").map((item1) => parseInt(item1)),
      options: {
        chart: {
          type: "donut",
        },
        title: {
          text:inputValue?.name,
          align: "left",
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
  // else if (chartType === "barandline") {
  //   chartData = {
  //     series: [
  //       {
  //         name: "TEAM A",
  //         type: "column",
  //         data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
  //       },
  //       {
  //         name: "TEAM B",
  //         type: "area",
  //         data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
  //       },
  //       {
  //         name: "TEAM C",
  //         type: "line",
  //         data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
  //       },
  //     ],
  //     chart: {
  //       height: 350,
  //       type: "line",
  //       stacked: false,
  //     },
  //     stroke: {
  //       width: [0, 2, 5],
  //       curve: "smooth",
  //     },
  //     plotOptions: {
  //       bar: {
  //         columnWidth: "50%",
  //       },
  //     },

  //     fill: {
  //       opacity: [0.85, 0.25, 1],
  //       gradient: {
  //         inverseColors: false,
  //         shade: "light",
  //         type: "vertical",
  //         opacityFrom: 0.85,
  //         opacityTo: 0.55,
  //         stops: [0, 100, 100, 100],
  //       },
  //     },
  //     labels: [
  //       "01/01/2003",
  //       "02/01/2003",
  //       "03/01/2003",
  //       "04/01/2003",
  //       "05/01/2003",
  //       "06/01/2003",
  //       "07/01/2003",
  //       "08/01/2003",
  //       "09/01/2003",
  //       "10/01/2003",
  //       "11/01/2003",
  //     ],
  //     markers: {
  //       size: 0,
  //     },
  //     xaxis: {
  //       type: "datetime",
  //     },
  //     yaxis: {
  //       title: {
  //         text: "Points",
  //       },
  //       min: 0,
  //     },
  //     tooltip: {
  //       shared: true,
  //       intersect: false,
  //       y: {
  //         formatter: function (y) {
  //           if (typeof y !== "undefined") {
  //             return y.toFixed(0) + " points";
  //           }
  //           return y;
  //         },
  //       },
  //     },
  //   };
  // }

  return (
    <>
      <div id="chart">
        {show ? (
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type={chartType}
            width={380}
          />
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
            <Button
              variant="contained"
              color="warning"
              size="small"
              //   onChange={()=>{saveChartValues()}}
              onClick={() => saveChartsData()}
              disabled={show ? false : true}
            >
              SAVE CHART
            </Button>
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
