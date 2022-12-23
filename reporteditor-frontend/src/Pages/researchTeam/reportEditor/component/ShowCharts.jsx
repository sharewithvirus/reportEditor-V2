import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";


function ShowCharts({formChartData, chartType}) {
  // console.log("formChartData0", formChartData)
  const [inputValue, setInputValue] = useState(formChartData);

  const addChartFormValues = () => {
    setInputValue(formChartData);
    setTimeout(() => {}, 0);
  };

  // useEffect(() => {formChartData
  //   // console.log("Input Values", inputValue)
  // }, [formChartData, addChartFormValues]);

  let chartData;

  if (chartType === "pie") {
    chartData = {
      series: formChartData?.formChartData?.series?.split(",").map((item1) => parseInt(item1)),
      data:{},
      options: {
        chart: {
          width: 50,
          type: "pie",
        },
        title: {
          text:formChartData?.formChartData?.name,
        },
        labels: formChartData?.formChartData?.label?.split(","),
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
          data: formChartData?.formChartData?.series?.split(",").map((item1) => parseInt(item1)),
        },
        {
          data: formChartData?.formChartData?.series1?.split(",").map((item1) => parseInt(item1)),
        },
        {
          data: formChartData?.formChartData?.series2?.split(",").map((item1) => parseInt(item1)),
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 50,
        },
        title: {
          text:formChartData?.formChartData?.name,
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
          categories: formChartData?.formChartData?.categories?.split(","),
        },
      },
    };
  } else if (chartType === "radar") {
    chartData = {
      series: [
        {
          name: "Series 1",
          data: formChartData?.formChartData?.series?.split(",").map((item1) => parseInt(item1)),
        },
      ],
      options: {
        chart: {
          height: 125,
          type: "radar",
        },
        title: {
          text:formChartData?.formChartData.name,
        },
        xaxis: {
          categories: formChartData?.formChartData?.categories?.split(","),
        },
      },
    };
  } else if (chartType === "line") {
    chartData = {
      series: [
        {
          name: "Desktops",
          data: formChartData.formChartData?.series?.split(",").map((item1) => parseInt(item1)),
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
          text:formChartData.formChartData.name,
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], 
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: formChartData?.formChartData?.categories?.split(","),
        },
      },
    };
  } else if (chartType === "area") {
    chartData = {
      series: [
        {
          name: "STOCK ABC",
          data: formChartData?.formChartData?.series?.split(",").map((item1) => parseInt(item1)),
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
          text: formChartData?.formChartData.name,
          align: "left",
        },
        // subtitle: {
        //   text: "Price Movements",
        //   align: "left",
        // },
        labels: formChartData?.formChartData?.label?.split(","),
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
      series: formChartData?.formChartData?.series?.split(",").map((item1) => parseInt(item1)),
      options: {
        chart: {
          type: "donut",
          height: 350,
        },
        title: {
          text:formChartData?.formChartData?.name,
        },
        labels: formChartData?.formChartData?.label?.split(","),
        responsive: [
          {
            breakpoint: 50,
            options: {
              chart: {
                width: 200,
                height: 300,
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