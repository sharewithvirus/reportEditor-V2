import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";


function ShowCharts({formChartData, chartType}) {
  const [inputValue, setInputValue] = useState(formChartData);

  const addChartFormValues = () => {
    setInputValue(formChartData);
    setTimeout(() => {}, 0);
  };

  useEffect(() => {
  }, [formChartData, addChartFormValues]);

  // console.log("inputValue", inputValue);
  // console.log("chartType", chartType);


  let chartData;

  if (chartType === "pie") {
    chartData = {
      series: inputValue?.formChartData?.series?.split(",").map((item1) => parseInt(item1)),
      options: {
        chart: {
          width: 50,
          type: "pie",
        },
        title: {
          text:inputValue?.formChartData?.name,
        },
        labels: inputValue?.formChartData?.label?.split(","),
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
          data: inputValue?.formChartData?.series?.split(",").map((item1) => parseInt(item1)),
        },
        {
          data: inputValue?.formChartData?.series1?.split(",").map((item1) => parseInt(item1)),
        },
        {
          data: inputValue?.formChartData?.series2?.split(",").map((item1) => parseInt(item1)),
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 50,
        },
        title: {
          text:inputValue?.formChartData?.name,
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
          categories: inputValue?.formChartData?.categories?.split(","),
        },
      },
    };
  } else if (chartType === "radar") {
    chartData = {
      series: [
        {
          name: "Series 1",
          data: inputValue?.formChartData?.series?.split(",").map((item1) => parseInt(item1)),
        },
      ],
      options: {
        chart: {
          height: 125,
          type: "radar",
        },
        title: {
          text:inputValue.formChartData.name,
        },
        xaxis: {
          categories: inputValue?.formChartData?.categories?.split(","),
        },
      },
    };
  } else if (chartType === "line") {
    chartData = {
      series: [
        {
          name: "Desktops",
          data: inputValue?.formChartData?.series?.split(",").map((item1) => parseInt(item1)),
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
          text:inputValue.formChartData.name,
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], 
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: inputValue?.formChartData?.categories?.split(","),
        },
      },
    };
  } else if (chartType === "area") {
    chartData = {
      series: [
        {
          name: "STOCK ABC",
          data: inputValue?.formChartData?.series?.split(",").map((item1) => parseInt(item1)),
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
          text: inputValue.formChartData.name,
          align: "left",
        },
        // subtitle: {
        //   text: "Price Movements",
        //   align: "left",
        // },
        labels: inputValue?.formChartData?.label?.split(","),
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
          data: inputValue?.formChartData?.series?.split(",").map((item1) => parseInt(item1)),
        },
        {
          data: inputValue?.formChartData?.series?.split(",").map((item1) => parseInt(item1)),
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
          categories: inputValue?.formChartData?.categories?.split(","),
        },
      },
    };
  } 
  else if (chartType === "donut") {
    chartData = {
      series: inputValue?.formChartData?.series?.split(",").map((item1) => parseInt(item1)),
      options: {
        chart: {
          type: "donut",
          height: 350,
        },
        labels: inputValue?.formChartData?.label?.split(","),
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
  // else if (chartType === "barandline") {
  //   chartData = {
  //     series: [{
  //     name: 'TEAM A',
  //     type: 'column',
  //     data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
  //   }, {
  //     name: 'TEAM B',
  //     type: 'area',
  //     data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
  //   }, {
  //     name: 'TEAM C',
  //     type: 'line',
  //     data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
  //   }],
  //     chart: {
  //     height: 350,
  //     type: 'line',
  //     stacked: false,
  //   },
  //   stroke: {
  //     width: [0, 2, 5],
  //     curve: 'smooth'
  //   },
  //   plotOptions: {
  //     bar: {
  //       columnWidth: '50%'
  //     }
  //   },

  //   fill: {
  //     opacity: [0.85, 0.25, 1],
  //     gradient: {
  //       inverseColors: false,
  //       shade: 'light',
  //       type: "vertical",
  //       opacityFrom: 0.85,
  //       opacityTo: 0.55,
  //       stops: [0, 100, 100, 100]
  //     }
  //   },
  //   labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
  //     '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
  //   ],
  //   markers: {
  //     size: 0
  //   },
  //   xaxis: {
  //     type: 'datetime'
  //   },
  //   yaxis: {
  //     title: {
  //       text: 'Points',
  //     },
  //     min: 0
  //   },
  //   tooltip: {
  //     shared: true,
  //     intersect: false,
  //     y: {
  //       formatter: function (y) {
  //         if (typeof y !== "undefined") {
  //           return y.toFixed(0) + " points";
  //         }
  //         return y;

  //       }
  //     }
  //   }
  //   };

  // }

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