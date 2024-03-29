const fs = require("fs");
const path = require("path");
const wkhtmltopdf = require("wkhtmltopdf");
const Report = require("../model/reportModel");
const Template = require("../model/templateModel");
const chartModel = require("../model/chartModel");
const cheerio = require("cheerio");
const sanitizeHtml = require('sanitize-html');
// const { map } = require("cheerio/lib/api/traversing");

//const SubTopic = require("../model/subTopicModel");

const drawChartUpdated = async (item) => {
  const data = item.formChartData;
  const seriesData = data.series.split(",").map((item1) => parseFloat(item1));
  const labels = data.label.split(",");
  const categories = data.categories.split(",");

  let myElement;
  if (item.chartType === "pie") {
    myElement = {
      series: data.series.split(",").map((item1) => parseFloat(item1)),
      chart: {
        width: 280,
        type: "pie",
      },
      title: {
        text: data?.name,
      },
      labels: data?.label?.split(","),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 230,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
    return myElement;
  }
   else if (item.chartType === "bar") {
    myElement = {
      series: [
        {
          data: data?.series?.split(",").map((item1) => parseFloat(item1)),
        },
        {
          data: data?.series1?.split(",").map((item1) => parseFloat(item1)),
        },
        {
          data: data?.series2?.split(",").map((item1) => parseFloat(item1)),
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        width:500,
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
      title: {
        text: data?.name,
      },
      xaxis: {
        categories: data?.categories?.split(","),
      },
    };

    return myElement;
  } 
  else if (item.chartType === "radar") {
    myElement = {
      series: [
        {
          name: "Series 1",
          data: data.series.split(",").map((item1) => parseFloat(item1)),
        },
      ],
      chart: {
        height: 350,
        type: "radar",
        width:500,
      },
      title: {
        text: data?.name,
      },
      xaxis: {
        categories: data?.categories?.split(","),
      },
    };

    return myElement;
  } 
  else if (item.chartType === "line") {
    myElement = {
      series: [
        {
          name: "Desktops",
          data: data?.series?.split(",").map((item1) => parseFloat(item1)),
        },
      ],
      chart: {
        height: 320,
        type: "line",
        width:500,
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
        text: data?.name,
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: data?.categories?.split(","),
      },
    };

    return myElement;
  } 
  else if (item.chartType === "area") {
    myElement = {
      series: [
        {
          name: data?.name,
          data: data?.series?.split(",").map((item1) => parseInt(item1)),
        },
      ],
      chart: {
        type: "area",
        height: 350,
        width:500,
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
        text: data?.name,
        align: "left",
      },
      subtitle: {
        text: "Price Movements",
        align: "left",
      },
      labels: data?.label?.split(","),
      xaxis: {
        type: "string",
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: "left",
      },
    };

    return myElement;
  }
  else if (item.chartType === "donut") {
    myElement = {
      series: data?.series?.split(",").map((item1) => parseFloat(item1)),
      chart: {
      type: 'donut',
      width:400
    },
    
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    title: {
      text:data?.name
    },
    };
    return myElement;
  } 
  else if(item.chartType === "stacked")
  {
    myElement ={
      series: [ {
        name: data?.series_names?.split(",")[0],
        data: data?.series?.split(",").map((item1) => parseInt(item1)),
      },
      {
        name: data?.series_names?.split(",")[1],
        data: data?.series2?.split(",").map((item1) => parseInt(item1)),
      },
      {
        name: data?.series_names?.split(",")[2],
        data: data?.series3?.split(",").map((item1) => parseInt(item1)),
      },
      {
        name: data?.series_names?.split(",")[3],
        data: data?.series4?.split(",").map((item1) => parseInt(item1)),
      },
      {
        name: data?.series_names?.split(",")[4],
        data: data?.series5?.split(",").map((item1) => parseInt(item1)),
      },],
      chart: {
      type: 'bar',
      height: 350,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    title: {
      text: data?.name,
    },
    xaxis: {
      categories:  data?.categories?.split(","),
      labels: {
        formatter: function (val) {
          return val + "K"
        }
      }
    },
    yaxis: {
      title: {
        text: undefined
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "K"
        }
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40
    }
    };
    return myElement;
  }
  else if (item.chartType === "mixed"){
  myElement ={
    series: [ {
      name: data?.namesForCharts?.split(",")[0],
      type: "column",
      data: data?.series_col?.split(",").map((item1) => parseInt(item1)),
    },
    {
      name: data?.namesForCharts?.split(",")[1],
      type: "area",
      data: data?.series_area?.split(",").map((item1) => parseInt(item1)),
    },
    {
      name: data?.namesForCharts?.split(",")[2],
      type: "line",
      data: data?.series_line?.split(",").map((item1) => parseInt(item1)),
    },],
    chart: {
    height: 350,
    type: 'line',
    stacked: false,
  },
  stroke: {
    width: [0, 2, 5],
    curve: 'smooth'
  },
  plotOptions: {
    bar: {
      columnWidth: '50%'
    }
  },
  
  fill: {
    opacity: [0.85, 0.25, 1],
    gradient: {
      inverseColors: false,
      shade: 'light',
      type: "vertical",
      opacityFrom: 0.85,
      opacityTo: 0.55,
      stops: [0, 100, 100, 100]
    }
  },
  labels: data?.labels_as_per_value?.split(","),
  markers: {
    size: 0
  },
  xaxis: {
    type: 'string'
  },
  yaxis: {
    title: {
      text: data?.name,
    },
    min: 0
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
  
      }
    }
  }
  };
  return myElement;
  }
};

const getChartData = async (charttype) => {
  let state;
  if (charttype === "polarArea") {
    state = {
      series: "",
      options: {
        chart: {
          type: "polarArea",
        },
        labels: "",
        stroke: {
          colors: ["#fff"],
        },
        fill: {
          opacity: 0.8,
        },
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
    return state;
  } else if (charttype === "pie") {
    state = {
      series: "",
      options: {
        legend: {
          width: 200,
        },
        labels: "",
      },
    };
    return state;
  } else if (charttype === "bar") {
    state = {
      series: "",
      options: {
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: "",
        },

        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            title: {
              formatter: function (seriesName) {
                return "";
              },
            },
          },
        },
      },
    };
    return state;
  } else if (charttype === "radar") {
    state = {
      series: "",
      options: {
        chart: {
          width: 500,
          height: 400,
          type: "radar",
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1,
          },
          toolbar: {
            show: false,
            tools: {
              download: true,
              zoomin: false,
              zoomout: false,
              reset: false,
              pan: false,
              zoom: false,
            },
            export: {
              png: {
                filename: "undefined",
              },
              csv: {
                filename: "undefined",
              },
            },
          },
        },
        stroke: {
          width: 2,
        },
        fill: {
          opacity: 0.1,
        },
        markers: {
          size: 0,
        },
        legend: {
          position: "bottom",
          horizontalAlign: "center",
          offsetX: 40,
        },
        xaxis: {
          categories: "",
          title: {
            text: "",
            style: {
              fontSize: "12px",
              color: "#76838f",
              fontWeight: 100,
            },
          },
        },
        theme: {
          palette: "palette4", // upto palette10
        },
        title: {
          text: "",
          align: "center",
          style: {
            fontSize: "12px",
            fontWeight: 100,
            color: "rgb(55, 61, 63)",
          },
        },
        subtitle: {
          text: "",
          align: "center",

          style: {
            fontSize: "12px",
            fontWeight: 100,
            color: "rgb(55, 61, 63)",
          },
        },
      },
    };
    return state;
  } else if (charttype === "stacked") {
    charttype = "bar";
    state = {
      series: "",
      options: {
        chart: {
          type: "bar",
          height: 100,
          stacked: true,
          toolbar: {
            show: false,
            tools: {
              download: true,
              zoomin: false,
              zoomout: false,
              reset: false,
              pan: false,
              zoom: false,
            },
            export: {
              png: {
                filename: "undefined",
              },
              csv: {
                filename: "undefined",
              },
            },
          },
        },
        //colors: colors,
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 1,
          colors: ["#fff"],
        },
        xaxis: {
          categories: "",
          title: {
            text: "",
            style: {
              fontSize: "12px",
              color: "#76838f",
              fontWeight: 100,
            },
          },
          labels: {
            formatter: function (val) {
              return val;
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
              return val;
            },
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: "bottom",
          horizontalAlign: "center",
          offsetX: 40,
        },
        theme: {
          palette: "palette1", // upto palette10
        },
        title: {
          text: "",
          align: "center",
          style: {
            fontSize: "12px",
            fontWeight: 100,
            color: "rgb(55, 61, 63)",
          },
        },
        subtitle: {
          text: "",
          align: "center",

          style: {
            fontSize: "12px",
            fontWeight: 100,
            color: "rgb(55, 61, 63)",
          },
        },
      },
    };
    return state;
  } else if (charttype === "line") {
    state = {
      series: "",
      options: {
        chart: {
          height: 10,
          type: "line",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
            tools: {
              download: true,
              zoomin: false,
              zoomout: false,
              reset: false,
              pan: false,
              zoom: false,
            },
            export: {
              png: {
                filename: "undefined",
              },
              csv: {
                filename: "undefined",
              },
            },
          },
        },

        dataLabels: {
          enabled: false,
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
          },
        },
        stroke: {
          curve: "straight",
        },

        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        legend: {
          position: "bottom",
          horizontalAlign: "center",
          offsetX: 40,
        },
        xaxis: {
          categories: "",
          title: {
            text: "",
            style: {
              fontSize: "12px",
              color: "#76838f",
              fontWeight: 100,
            },
          },
        },
        theme: {
          palette: "palette2", // upto palette10
        },

        title: {
          text: "",
          align: "center",
          style: {
            fontSize: "12px",
            fontWeight: 100,
            color: "rgb(55, 61, 63)",
          },
        },
        subtitle: {
          text: "",
          align: "center",

          style: {
            fontSize: "12px",
            fontWeight: 100,
            color: "rgb(55, 61, 63)",
          },
        },
      },
    };
    return state;
  } else if (charttype === "area") {
    state = {
      series: "",
      options: {
        chart: {
          height: "365px",
          type: "area",
          toolbar: {
            show: false,
            tools: {
              download: true,
              zoomin: false,
              zoomout: false,
              reset: false,
              pan: false,
              zoom: false,
            },
            export: {
              png: {
                filename: "undefined",
              },
              csv: {
                filename: "undefined",
              },
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "number",
          categories: "",
          title: {
            text: "",
            align: "right",
            style: {
              fontSize: "12px",
              color: "#76838f",
              fontWeight: 100,
            },
          },
        },
        legend: {
          position: "bottom",
          horizontalAlign: "center",
          offsetX: 40,
        },
        theme: {
          palette: "palette6", // upto palette10
        },
        title: {
          text: "",
          align: "center",
          style: {
            fontSize: "12px",
            fontWeight: 100,
            color: "rgb(55, 61, 63)",
          },
        },
        subtitle: {
          text: "",
          align: "center",

          style: {
            fontSize: "12px",
            fontWeight: 100,
            color: "rgb(55, 61, 63)",
          },
        },
      },
    };
    return state;
  } else if (charttype === "multibar") {
    charttype = "bar";
    state = {
      series: "",
      options: {
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: "",
        },
        fill: {
          opacity: 1,
        },
      },
    };
    return state;
  } else if (charttype === "donut") {
    state = {
      series: "",
      options: {
        labels: "",
        chart: {
          type: "donut",
          toolbar: {
            show: false,
          },
        },
      },
    };
    return state;
  } else if (charttype === "barandline") {
    state = {
      series: "",
      options: {
        chart: {
          height: 400,
          width: 650,
          type: "line",
          toolbar: {
            show: false,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false,
            },
            autoSelected: "zoom",
          },
        },
        stroke: {
          width: [4, 4],
        },
        title: {
          text: "",
          align: "center",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#000",
          },
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1],
        },
        labels: "",

        yaxis: [
          {
            title: {
              text: "",
            },
          },
          {
            opposite: true,
            title: {
              text: "",
            },
          },
        ],
      },
    };
    charttype = "line";
    return state;
  }
};

exports.createReport = async (req, res) => {
  try {
    const { name, userList, industry, template, baseYear, forecastYear } =
      req.body;
    const newReport = await Report.create({
      name,
      userList,
      industry,
      template,
      baseYear,
      forecastYear,
    });
    res.status(201).json({
      status: "Success",
      message: "Report created successfully",
      newReport: newReport,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.singleReportData = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id).select(
      "name userList baseYear forecastYear template industry"
    );
    res.status(200).json({
      status: "success",
      message: "Report Data",
      data: report,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      error: error,
    });
  }
};
exports.getReportsList = async (req, res) => {
  try {
    const reportList = await Report.find({});
    res.status(200).json({
      status: "Success",
      message: "All reports are successfully retrieved.",
      reportsList: reportList,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const { _id, name, baseYear, forecastYear, userList, template } = req.body;
    await Report.findByIdAndUpdate(_id, req.body);
    res.status(200).json({
      status: "Success",
      message: "Report Updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.getSingleReport = async (req, res) => {
  try {
    const { id } = req.params;
    const reportData = await Report.findById(id).populate({
      path: "subTopics",
      populate: {
        path: "subTopics",
        populate: {
          path: "subTopics",
          populate: {
            path: "subTopics",
            populate: {
              path: "subTopics",
              populate: {
                path: "subTopics",
                populate: {
                  path: "subTopics",
                  populate: {
                    path: "subTopics",
                    populate: {
                      path: "subTopics",
                      populate: {
                        path: "subTopics",
                        populate: {
                          path: "subTopics",
                          populate: {
                            path: "subTopics",
                            populate: {
                              path: "subTopics",
                              populate: {
                                path: "subTopics",
                                populate: {
                                  path: "subTopics",
                                  populate: {
                                    path: "subTopics",
                                    populate: {
                                      path: "subTopics",
                                      populate: {
                                        path: "subTopics",
                                        populate: {
                                          path: "subTopics",
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    res.status(200).send({
      status: "Success",
      message: "Report has been successfully retrieved",
      reportData: reportData,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.createPdfPreview = async (req, res) => {
  try {
    const { id } = req.params;
    const reportData = await Report.findById(id)
      .populate([
        "template",
        "industry",
        "reportImages",
        "reportCharts",
        "reportTables",
      ])
      .populate({
        path: "reportCharts",
        select: "chartType formChartData",
      })
      .populate({
        path: "subTopics",
        populate: {
          path: "subTopics",
          populate: {
            path: "subTopics",
            populate: {
              path: "subTopics",
              populate: {
                path: "subTopics",
                populate: {
                  path: "subTopics",
                  populate: {
                    path: "subTopics",
                    populate: {
                      path: "subTopics",
                      populate: {
                        path: "subTopics",
                        populate: {
                          path: "subTopics",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
    let subTopicData = reportData.subTopics;
    let reportCharts = reportData.reportCharts;

    const headings = [];
    const headingHTML = [];
    const fullPageHTML = [];

    const subTopicMap = async (x, preIndex) => {
      x.map(async (itemX, index) => {
        // console.log(itemX.subTopicName, `${preIndex ? `${preIndex}.${index+1}` : `${index+1}`}`)
        if (itemX.subTopics.length > 0) {
          fullPageHTML.push(
            `<div id="${preIndex ? `${preIndex}.` : ""}${
              index + 1
            }"><h3>Chapter: ${preIndex ? `${preIndex}.` : ""}${
              index + 1
            } : <strong>${itemX.subTopicName}</strong></h3></div>`,
            `<div styles="page-break-inside: avoid; page-break-after:always;">${itemX.htmlData}</div>`
          );
          headings.push(
            `index:${preIndex ? `${preIndex}.` : ""}${index + 1} heading:${
              itemX.subTopicName
            }`
          );
          headingHTML.push(
            `<div><a href="#${preIndex ? `${preIndex}.` : ""}${
              index + 1
            }" style="text-decoration: none; color: black" />${
              preIndex ? `${preIndex}.` : ""
            }${index + 1} : ${itemX.subTopicName}</div>`
          );
          await subTopicMap(
            itemX.subTopics,
            `${preIndex ? `${preIndex}.` : ""}${index + 1}`
          );
        } else {
          fullPageHTML.push(
            `<div id="${preIndex ? `${preIndex}.` : ""}${
              index + 1
            }"><h3>Chapter: ${preIndex ? `${preIndex}.` : ""}${
              index + 1
            } : <strong>${itemX.subTopicName}</strong></h3></div>`,
            `<div styles="page-break-inside: avoid; page-break-after:always;">${itemX.htmlData}</div>`
          );
          headings.push(
            `index:${preIndex ? `${preIndex}.` : ""}${index + 1} heading:${
              itemX.subTopicName
            }`
          );
          headingHTML.push(
            `<div><a href="#${preIndex ? `${preIndex}.` : ""}${
              index + 1
            }" style="text-decoration: none; color: black" />${
              preIndex ? `${preIndex}.` : ""
            }${index + 1} : ${itemX.subTopicName}</div>`
          );
        }
      });
    };

    fullPageHTML.push("<html><head></head><body>");
    await subTopicMap(subTopicData);
    fullPageHTML.push(
      `<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script><script>`
    );

    const getChartScriptSingle = async (data) => {
      const chartData = await drawChartUpdated(data);
      const ele = `const drawChart${data._id ? data._id : ""} = '${
        chartData ? JSON.stringify(chartData) : ""
      }'; const newChart${
        data._id ? data._id : ""
      } = new ApexCharts(document.querySelector('#chart${
        data._id ? data._id : ""
      }'), JSON.parse(drawChart${data._id ? data._id : ""})); newChart${
        data._id ? data._id : ""
      }.render();`;
      return ele;
    };
    for (let i = 0; i < reportCharts.length; i++) {
      const newHtml = await getChartScriptSingle(reportCharts[i]);
      fullPageHTML.push(newHtml);
    }

    fullPageHTML.push(`</script></body></html>`);

    const joinHTML = fullPageHTML.join("");
    const dom = cheerio.load(joinHTML);

    (reportData.subTopics = []),
      (reportData.reportCharts = []),
      (reportData.reportTables = []),
      (reportData.reportImages = []),
      // res.status(200).send(dom.html())
      res.status(200).json({
        status: "success",
        message: "Report Data",
        data: dom.html(),
        reportData,
      });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.createPDFReport = async (req, res) => {
  try {
    console.log("Hit Route PDF Create");
    const { id } = req.params;
    const reportData = await Report.findById(id)
      .populate([
        "template",
        "industry",
        "reportImages",
        "reportCharts",
        "reportTables",
      ])
      .populate({
        path: "reportCharts",
        select: "chartType formChartData",
      })
      .populate({
        path: "subTopics",
        populate: {
          path: "subTopics",
          populate: {
            path: "subTopics",
            populate: {
              path: "subTopics",
              populate: {
                path: "subTopics",
                populate: {
                  path: "subTopics",
                  populate: {
                    path: "subTopics",
                    populate: {
                      path: "subTopics",
                      populate: {
                        path: "subTopics",
                        populate: {
                          path: "subTopics",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      // console.log("ReportData", reportData);
    let subTopicData = reportData?.subTopics;
    let reportCharts = reportData?.reportCharts;

    const headings = [];
    const headingHTML = [];
    const fullPageHTML = [];

    const subTopicMap = async (x, preIndex) => {
      x.map(async (itemX, index) => {
        if (itemX.subTopics.length > 0) {
          fullPageHTML.push(
            `<div id="${preIndex ? `${preIndex}.` : ""}${
              index + 1
            }"><h3>Chapter: ${preIndex ? `${preIndex}.` : ""}${
              index + 1
            } : <strong>${itemX.subTopicName}</strong></h3></div>`,
            `<div styles="page-break-inside: avoid; page-break-after:always; page-break-before:always;">${itemX.htmlData}</div>`
          );
          headings.push(
            `index:${preIndex ? `${preIndex}.` : ""}${index + 1} heading:${
              itemX.subTopicName
            }`
          );
          headingHTML.push(
            `<div><a href="#${preIndex ? `${preIndex}.` : ""}${
              index + 1
            }" style="text-decoration: none; color: black" />${
              preIndex ? `${preIndex}.` : ""
            }${index + 1} : ${itemX.subTopicName}</div>`
          );
          await subTopicMap(
            itemX.subTopics,
            `${preIndex ? `${preIndex}.` : ""}${index + 1}`
          );
        } else {
          fullPageHTML.push(
            `<div id="${preIndex ? `${preIndex}.` : ""}${
              index + 1
            }"><h3>Chapter: ${preIndex ? `${preIndex}.` : ""}${
              index + 1
            } : <strong>${itemX.subTopicName}</strong></h3></div>`,
            `<div styles="page-break-inside: avoid; page-break-after:always; page-break-before:always;">${itemX.htmlData}</div>`
          );
          headings.push(
            `index:${preIndex ? `${preIndex}.` : ""}${index + 1} heading:${
              itemX.subTopicName
            }`
          );
          headingHTML.push(
            `<div><a href="#${preIndex ? `${preIndex}.` : ""}${
              index + 1
            }" style="text-decoration: none; color: black" />${
              preIndex ? `${preIndex}.` : ""
            }${index + 1} : ${itemX.subTopicName}</div>`
          );
        }
      });
    };


    fullPageHTML.push("<html><head></head><body>");
    await subTopicMap(subTopicData);
    fullPageHTML.push(`</body></html>`);
    let joinHTML = fullPageHTML.join("");

    const generateChartImage = async (chartData) => {
      const chartDataText = await drawChartUpdated(chartData);
      const chartURIImg = encodeURI(JSON.stringify(chartDataText));
      const imageUri = `https://quickchart.io/apex-charts/render?format=png&config=${chartURIImg}`;
      const element = `<div><img src="${imageUri}" alt="chart${chartData._id}" /></div>`;
      return element;
    }
    let finalHTMLCode = '';
    let finalHTMLCodeArry = [];
    let chartId = [];
    for (let i = 0; i < reportCharts.length; i++) {
      const chartDa = reportCharts[i]
      const data = await generateChartImage(chartDa);
      let agger;
      if(i === 0){
        agger = joinHTML.split(`<section id="chart${chartDa._id}"></section>`)
      }else{
        agger = finalHTMLCode.split(`<section id="chart${chartDa._id}"></section>`)
      }
      finalHTMLCodeArry.push(agger);
      chartId.push(`chart${chartDa._id}`)
      if(agger.length > 2){
        let finalString = []
        for (let i = 0; i < agger.length; i++) {
          if(i === Number(agger.length -1)){
            finalString.push(agger[i]);
          }else{            
            finalString.push(agger[i]);
            finalString.push(data);
          }
          finalHTMLCode = finalString.join('');
        }
      }else if (agger.length == 2){
        finalHTMLCode = [agger[0], data, agger[1]].join('');
      }
    }

    const newHtml = `<div id="index"><div style='display:none'><img src='${
      reportData?.template?.url
    }' /></div><div style="text-align: center;"><h2>Index</h2></div styles="page-break-after: always;">${headingHTML.join(
      ""
    )}</div><div id="content"><div style="page-break-after:always"></div><div styles=" border: 1px solid; zoom: 1">${finalHTMLCode}</div></div>`;

    var options = {
      format: "A4",
      directory: "./temp/",
      border: "1mm",
      paginationOffset: 1,
      localUrlAccess: true,
      header: {
        height: "30mm",
        contents: `
        <div style="width: 100%; display: table;">
            <div style="display: table-row">
                <div style="display: table-cell;">${reportData?.template?.header}</div>
                <div style="width: 25%; display: table-cell;"><img style="height: 50px; float: right;" src="${reportData?.template?.url}"></div>
            </div>
            </div>  
            <hr/>
          `,
      },
      footer: {
        height: "20mm",
        contents: `
        <hr/>
        <div style="width: 100%; display: table;">
            <div style="display: table-row">
                <div style="display: table-cell;">${reportData?.template?.footer}</div>
                <div style="width: 20%; display: table-cell; text-align: right;">Page: {{page}}</span>/<span>{{pages}}</div>
            </div>
        </div>
          `,
      },
      zoomFactor: "0.4rem",
      childProcessOptions: {
        env: {
          OPENSSL_CONF: "/dev/null",
        },
      },
    };

    console.log("NEW HTML", sanitizeHtml(newHtml));
  
    // pdf.create(newHtml, options).toStream(function (err, stream) {
    //   if(err){
    //     console.log(err)
    //   }else{
    //     stream.pipe(res);
    //   }
    // });
    // const header = fs.readFileSync(path.resolve(__dirname, "./htmlFiles/header.html"))
    // console.log(header);
    wkhtmltopdf(sanitizeHtml(`${newHtml}`,{allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'div', 'img' ],  allowedSchemes: [ 'data', 'http' ]}, ), { 
      pageSize: 'A4',
      // headerHtml: header,
    })
    // wkhtmltopdf(`<img src="https://quickchart.io/apex-charts/render?format=png&config=%7B%22series%22:%5B100,200,300,400%5D,%22chart%22:%7B%22width%22:280,%22type%22:%22pie%22%7D,%22title%22:%7B%22text%22:%22Rohit%20yadav%22%7D,%22labels%22:%5B%22a%22,%22b%22,%22c%22,%22d%22%5D,%22responsive%22:%5B%7B%22breakpoint%22:480,%22options%22:%7B%22chart%22:%7B%22width%22:230%7D,%22legend%22:%7B%22position%22:%22bottom%22%7D%7D%7D%5D%7D" alt="chart63b5271e58211fb1735a5806" />`, { pageSize: 'A4' })
  .pipe(res);

  
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
}