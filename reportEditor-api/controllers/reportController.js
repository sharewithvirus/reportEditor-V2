const fs = require("fs");
const path = require("path");
const pdf = require("html-pdf");
const wkhtmltopdf = require("wkhtmltopdf");
const Report = require("../model/reportModel");
const Template = require("../model/templateModel");
const chartModel = require("../model/chartModel");
const jsonToHtml = require("node-json2html");
const cheerio = require('cheerio');


//const SubTopic = require("../model/subTopicModel");

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
    // console.log(req.body);
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
    console.log("Single Report Route Hit");
    const { id } = req.params;
    console.log(id);
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
  // try {
    console.log("PDF Preview Route Hit")
    const { id } = req.params;
    const reportData = await Report.findById(id)
    .populate(['template','industry', 'reportImages', "reportCharts", "reportTables"])
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
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })
    let subTopicData = reportData.subTopics;
    let reportCharts = reportData.reportCharts;
    // const dataText = await prePairHTMLData(subTopicData);
    // console.log(dataText)
// --------------------------------Data --------------------------------

// let fullPageHTML = [];
// let headingHTML = [];
// let headings = [];

const headings = [];
const headingHTML = [];
const fullPageHTML = [];

const subTopicMap = async (x, preIndex) => {
  x.map(async (itemX, index) => {
    // console.log(itemX.subTopicName, `${preIndex ? `${preIndex}.${index+1}` : `${index+1}`}`)
    if(itemX.subTopics.length > 0){
      fullPageHTML.push(
        `<div id="${preIndex ? `${preIndex}.`: ""}${index+1}"><h3>Chapter: ${preIndex ? `${preIndex}.`: ""}${index+1} : <strong>${itemX.subTopicName}</strong></h3></div>`, 
      `<div styles="page-break-inside: avoid; page-break-after:always;">${itemX.htmlData}</div>`)
      headings.push(`index:${preIndex ? `${preIndex}.`: ""}${index + 1} heading:${itemX.subTopicName}`);
      headingHTML.push(`<div><a href="#${preIndex ? `${preIndex}.`: ""}${index + 1}" style="text-decoration: none; color: black" />${preIndex ? `${preIndex}.`: ""}${index + 1} : ${itemX.subTopicName}</div>`);
      await subTopicMap(itemX.subTopics, `${preIndex ? `${preIndex}.` : ''}${index+1}`);
    }else {
      fullPageHTML.push(
        `<div id="${preIndex ? `${preIndex}.`: ""}${index+1}"><h3>Chapter: ${preIndex ? `${preIndex}.`: ""}${index+1} : <strong>${itemX.subTopicName}</strong></h3></div>`, 
      `<div styles="page-break-inside: avoid; page-break-after:always;">${itemX.htmlData}</div>`)
      headings.push(`index:${preIndex ? `${preIndex}.`: ""}${index + 1} heading:${itemX.subTopicName}`);
      headingHTML.push(`<div><a href="#${preIndex ? `${preIndex}.`: ""}${index + 1}" style="text-decoration: none; color: black" />${preIndex ? `${preIndex}.`: ""}${index + 1} : ${itemX.subTopicName}</div>`);
    }
  })
}

fullPageHTML.push("<html><head></head><body>")
await subTopicMap(subTopicData);
fullPageHTML.push(`<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script></body>`)


// fullPageHTML.push(`<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>`)
const joinHTML = fullPageHTML.join('');
// console.log("HTML Preview", joinHTML)
const dom = cheerio.load(joinHTML);

reportCharts.forEach(async (chart) => {
  // console.log(chart);
  // dom(`#${chart._id}`).html('<h1>Hello World</h1>');

  var options = {
    chart: {
      type: 'bar'
    },
    series: [{
      name: 'sales',
      data: [30,40,45,50,49,60,70,91,125]
    }],
    xaxis: {
      categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
    }
  }
  
  // var chart = new ApexCharts(dom.querySelector(`#${chart._id}`), options);
  // chart.render();


})

console.log(dom.html())

  let data = 
  `<html><head><title>Test Page</title><style>body{background-color:#a8d1d1;font-family:Roboto,sans-serif}#chart{max-width:650px;margin:35px auto}</style></head><body><div id='chart'>Hello</div><script src='https://cdn.jsdelivr.net/npm/apexcharts'></script> <script>let options = {chart:{type:'bar'},series:[{name:'sales',data:[30,40,45,50,49,60,70,91,125]}],xaxis:{categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]}}; let chart=new ApexCharts(document.querySelector('#chart'), options); chart.render();</script></body></html>`

    res.status(200)
    .json({ 
      status: "success", 
      message: "Report Data", 
      data: data
    });
  // } catch (error) {
  //   res.status(500).json({
  //     status: "Error",
  //     message: "Internal Server Error",
  //   });
  // }
};




// Old Function For Report Preview....----------------------------------
  
  // const html = fullPageHTML.join("");
  // const newHtml = `<div id="index">${headingHTML.join(
  //   ""
  // )}</div><br /><br /><br /><br /><br /><br /><div id="content" style="page-break-before:always;">${html}</div>`;
  // const data = {
  //   html: newHtml,
  //   template: templateData,
  //   headings: headings,
  // };
  // res.status(200).json({ status: "success", message: "Report Data", data });
