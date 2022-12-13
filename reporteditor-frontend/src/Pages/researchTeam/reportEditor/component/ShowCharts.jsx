import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

function ShowCharts({formChartData,chartType,}) {
  const [inputValue, setInputValue] = useState(null);
  const [show,setShow] = useState(true);
  const addChartFormValues = () => {
    // setShow(true);
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
  } else if (chartType === "bar") {
    chartData = {
      series: [
        {
          data: inputValue?.series?.split(",").map((item1) => parseInt(item1)),
        },
        {
          data: inputValue?.series1?.split(",").map((item1) => parseInt(item1)),
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
  } else if (chartType === "radar") {
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
  } else if (chartType === "line") {
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
  } else if (chartType === "area") {
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
          text: "Fundamental Analysis of Stocks",
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
  } else if (chartType === "multibar") {
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

  return (
    <div>
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
    </div>
  );
}

export default ShowCharts;
