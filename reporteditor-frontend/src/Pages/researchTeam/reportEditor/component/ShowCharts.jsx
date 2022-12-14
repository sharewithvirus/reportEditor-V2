import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";


function ShowCharts({formChartData, chartType}) {
  const [inputValue, setInputValue] = useState(formChartData);

  const addChartFormValues = () => {
    setInputValue(formChartData);
    setTimeout(() => {}, 0);
  };

  useEffect(() => {
    // console.log("formChartData", formChartData)
    // console.log("inputValue", inputValue)
  }, [formChartData, addChartFormValues]);

  console.log("inputValue", inputValue);
  console.log("chartType", chartType);


  let chartData;

  if (chartType === "pie") {
    chartData = {
      series: inputValue?.series?.split(",").map((item1) => parseInt(item1)),
      options: {
        chart: {
          width: 50,
          type: "pie",
        },
        title: {
          text:inputValue.name,
        },
        labels: inputValue?.label?.split(","),
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 50,
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
          height: 50,
        },
        title: {
          text:inputValue.name,
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
          height: 125,
          type: "radar",
        },
        title: {
          text:inputValue.name,
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
          height: 50,
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
          text:inputValue.name,
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
          height: 50,
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
          text: inputValue.name,
          align: "left",
        },
        // subtitle: {
        //   text: "Price Movements",
        //   align: "left",
        // },
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
            breakpoint: 50,
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
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type={chartType}
          width={chartType == 'pie'? '100%':'90%'}
        
        />
    </div>
  );
}

export default ShowCharts;
