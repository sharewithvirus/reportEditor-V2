const fs = require("fs");
const path = require("path");
const pdf = require("html-pdf");
const wkhtmltopdf = require("wkhtmltopdf");
const Report = require("../model/reportModel");
//const Template = require("../models/templateModel");
//const SubTopic = require("../models/subTopicModel");

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
    const dataText = await prePairHTMLData(reportData.subTopics);
    // console.log(reportData)
    res.status(200)
    .json({ 
      status: "success", 
      message: "Report Data", 
      // data: reportData
      data: dataText
    });
  // } catch (error) {
  //   res.status(500).json({
  //     status: "Error",
  //     message: "Internal Server Error",
  //   });
  // }
};

const prePairHTMLData = async (data) => {
  let fullPageHTML = [];
  let headingHTML = [];
  let headings = [];
  let finalData;
  data.map(async (dataT, i) => {
    finalData = await mapFunction(dataT, i);
  })
  console.log(finalData);
  return finalData;
}

const mapFunction = async (subTopic, index, preIndex) => {
  let Arry = [];
  if(subTopic.subTopics.length > 0){
    let fullPageHtml = [`<div id="${preIndex ? `${preIndex}.`: ""}${index+1}"><h3>Chapter: ${preIndex ? `${preIndex}.`: ""}${index+1} : <strong>${subTopic.subTopicsName}</strong></h3></div>`, `<div styles="page-break-inside: avoid; page-break-after:always;">${subTopic.htmlData}</div>`]
    let headings = {index: `${preIndex ? `${preIndex}.`: ""}${index + 1}`, heading: `${subTopic.subTopicsName}`};
    let headingHTML = `<div><a href="#${preIndex ? `${preIndex}.`: ""}${index + 1}" style="text-decoration: none; color: black" />${preIndex ? `${preIndex}.`: ""}${index + 1} : ${subTopic.subTopicsName}</div>`
      let Obj = {
        fullPageHtml, headings, headingHTML
      }
      Arry.push(Obj);
      subTopic.subTopics.map(async (subTopic, index2) => {
        const data = await mapFunction(subTopic, index2, `${preIndex ? `${preIndex}.`: ""}${index}`);
        Arry.push(data);
      })
      return Arry;
  }else{
      let fullPageHtml = [`<div id="${preIndex ? `${preIndex}.`: ""}${index+1}"><h3>Chapter: ${preIndex ? `${preIndex}.`: ""}${index+1} : <strong>${subTopic.subTopicsName}</strong></h3></div>`, `<div styles="page-break-inside: avoid; page-break-after:always;">${subTopic.htmlData}</div>`]
      let headings = {index: `${preIndex ? `${preIndex}.`: ""}${index + 1}`, heading: `${subTopic.subTopicsName}`};
      let headingHTML = `<div><a href="#${preIndex ? `${preIndex}.`: ""}${index + 1}" style="text-decoration: none; color: black" />${preIndex ? `${preIndex}.`: ""}${index + 1} : ${subTopic.subTopicsName}</div>`
      let Obj = {
        fullPageHtml, headings, headingHTML
      }
      // return Obj;
      Arry.push(Obj);
      return Arry;
  }
}




// Old Function For Report Preview....----------------------------------
  // reportData.subTopics.map((x, xIndex) => {
  //   fullPageHTML.push(
  //     `<div id="${xIndex + 1}"><h3>Chapter: ${xIndex + 1} : <strong>${
  //       x.subTopicsName
  //     }</strong></h3></div>`
  //   );
  //   fullPageHTML.push(
  //     `<div styles="page-break-inside: avoid; page-break-after:always;">${x.htmlData}</div>`
  //   );
  //   headings.push({
  //     index: `${xIndex + 1}`,
  //     heading: `${x.subTopicsName}`,
  //   });
  //   headingHTML.push(
  //     `<div><a href="#${
  //       xIndex + 1
  //     }" style="text-decoration: none; color: black" />${xIndex + 1} : ${
  //       x.subTopicsName
  //     }</div>`
  //   );
  //   if (x.subTopics.length > 0) {
  //     x.subTopics.map((y, yIndex) => {
  //       headingHTML.push(
  //         `<div>&nbsp&nbsp&nbsp<a style="text-decoration: none; color: black" href="#${
  //           xIndex + 1
  //         }.${yIndex + 1}" />${xIndex + 1}.${yIndex + 1} : ${
  //           y.subTopicsName
  //         }</div>`
  //       );
  //       fullPageHTML.push(
  //         `<div id="${xIndex + 1}.${
  //           yIndex + 1
  //         }" style="margin-top:10px; margin-bottom:5px"><h3>Chapter: ${
  //           xIndex + 1
  //         }.${yIndex + 1} : ${y.subTopicsName}</h3></div>`
  //       );
  //       fullPageHTML.push(
  //         `<div styles="page-break-inside: avoid; page-break-after:always;">${y.htmlData}</div>`
  //       );
  //       headings.push({
  //         index: `${xIndex + 1}.${yIndex + 1}`,
  //         heading: `${y.subTopicsName}`,
  //         pageNo: "",
  //       });
  //       if (y.subTopics.length > 0) {
  //         y.subTopics.map((z, zIndex) => {
  //           headingHTML.push(
  //             `<div>&nbsp&nbsp&nbsp<a style="text-decoration: none; color: black" href="#${
  //               xIndex + 1
  //             }.${yIndex + 1}.${zIndex + 1}" />${xIndex + 1}.${yIndex + 1}.${
  //               zIndex + 1
  //             } : ${z.subTopicsName}</div>`
  //           );
  //           fullPageHTML.push(
  //             `<div id="${xIndex + 1}.${yIndex + 1}.${
  //               zIndex + 1
  //             }" style="margin-top:10px; margin-bottom:5px"><h3>Chapter: ${
  //               xIndex + 1
  //             }.${yIndex + 1}.${zIndex + 1} : ${z.subTopicsName}</h3></div>`
  //           );
  //           fullPageHTML.push(
  //             `<div styles="page-break-inside: avoid; page-break-after:always;">${z.htmlData}</div>`
  //           );
  //           headings.push({
  //             index: `${xIndex + 1}.${yIndex + 1}.${zIndex + 1}`,
  //             heading: `${z.subTopicsName}`,
  //             pageNo: "",
  //           });
  //           if (y.subTopics.length > 0) {
  //             z.subTopics.map((a, aIndex) => {
  //               fullPageHTML.push(
  //                 `<div id="${xIndex + 1}.${yIndex + 1}.${zIndex + 1}.${
  //                   aIndex + 1
  //                 }" style="margin-top:10px; margin-bottom:5px"><h3>Chapter: ${
  //                   xIndex + 1
  //                 }.${yIndex + 1}.${zIndex + 1}.${aIndex + 1} : ${
  //                   a.subTopicsName
  //                 }</h3></div>`
  //               );
  //               fullPageHTML.push(
  //                 `<div styles="page-break-inside: avoid; page-break-after:always;">${a.htmlData}</div>`
  //               );
  //               headingHTML.push(
  //                 `<div>&nbsp&nbsp&nbsp<a  style="text-decoration: none; color: black" href="#${
  //                   xIndex + 1
  //                 }.${yIndex + 1}.${zIndex + 1}.${aIndex + 1}" />${
  //                   xIndex + 1
  //                 }.${yIndex + 1}.${zIndex + 1}.${aIndex + 1} : ${
  //                   a.subTopicsName
  //                 }</div>`
  //               );

  //               headings.push({
  //                 index: `${xIndex + 1}.${yIndex + 1}.${zIndex + 1}.${
  //                   aIndex + 1
  //                 }`,
  //                 heading: `${a.subTopicsName}`,
  //                 pageNo: "",
  //               });
  //               if (a.subTopics.length > 0) {
  //                 a.subTopics.map((b, bIndex) => {
  //                   fullPageHTML.push(
  //                     `<div id="${xIndex + 1}.${yIndex + 1}.${zIndex + 1}.${
  //                       aIndex + 1
  //                     }.${
  //                       bIndex + 1
  //                     }" style="margin-top:10px; margin-bottom:5px"><h3>Chapter: ${
  //                       xIndex + 1
  //                     }.${yIndex + 1}.${zIndex + 1}.${aIndex + 1}.${
  //                       bIndex + 1
  //                     } : ${b.subTopicsName}</h3></div>`
  //                   );
  //                   fullPageHTML.push(
  //                     `<div styles="page-break-inside: avoid; page-break-after:always;">${b.htmlData}</div>`
  //                   );
  //                   headingHTML.push(
  //                     `<div>&nbsp&nbsp&nbsp<a style="text-decoration: none; color: black" href="#${
  //                       xIndex + 1
  //                     }.${yIndex + 1}.${zIndex + 1}.${aIndex + 1}.${
  //                       bIndex + 1
  //                     }" />${xIndex + 1}.${yIndex + 1}.${zIndex + 1}.${
  //                       aIndex + 1
  //                     }.${bIndex + 1} : ${b.subTopicsName}</div>`
  //                   );

  //                   headings.push({
  //                     index: `${xIndex + 1}.${yIndex + 1}.${zIndex + 1}.${
  //                       aIndex + 1
  //                     }.${bIndex + 1}`,
  //                     heading: `${b.subTopicsName}`,
  //                     pageNo: "",
  //                   });
  //                   if (b.subTopics.length > 0) {
  //                     b.subTopics.map((c, cIndex) => {
  //                       fullPageHTML.push(
  //                         `<div id="${xIndex + 1}.${yIndex + 1}.${zIndex + 1}.${
  //                           aIndex + 1
  //                         }.${bIndex + 1}.${
  //                           cIndex + 1
  //                         }" style="margin-top:10px; margin-bottom:5px"><h3>Chapter: ${
  //                           xIndex + 1
  //                         }.${yIndex + 1}.${zIndex + 1}.${aIndex + 1}.${
  //                           bIndex + 1
  //                         }.${cIndex + 1} : ${c.subTopicsName}</h3></div>`
  //                       );
  //                       fullPageHTML.push(
  //                         `<div styles="page-break-inside: avoid; page-break-after:always;">${c.htmlData}</div>`
  //                       );
  //                       headingHTML.push(
  //                         `<div>&nbsp&nbsp&nbsp<a style="text-decoration: none; color: black" href="#${
  //                           xIndex + 1
  //                         }.${yIndex + 1}.${zIndex + 1}.${aIndex + 1}.${
  //                           bIndex + 1
  //                         }.${cIndex + 1}" />${xIndex + 1}.${yIndex + 1}.${
  //                           zIndex + 1
  //                         }.${aIndex + 1}.${bIndex + 1}.${cIndex + 1} : ${
  //                           c.subTopicsName
  //                         }</div>`
  //                       );
  //                       headings.push({
  //                         index: `${xIndex + 1}.${yIndex + 1}.${zIndex + 1}.${
  //                           aIndex + 1
  //                         }.${bIndex + 1}.${cIndex + 1}`,
  //                         heading: `${c.subTopicsName}`,
  //                         pageNo: "",
  //                       });
  //                       if (c.subTopics.length > 0) {
  //                         c.subTopics.map((d, dIndex) => {
  //                           fullPageHTML.push(
  //                             `<div id="${xIndex + 1}.${yIndex + 1}.${
  //                               zIndex + 1
  //                             }.${aIndex + 1}.${bIndex + 1}.${cIndex + 1}.${
  //                               dIndex + 1
  //                             }" style="margin-top:10px; margin-bottom:5px"><h3>Chapter: ${
  //                               xIndex + 1
  //                             }.${yIndex + 1}.${zIndex + 1}.${aIndex + 1}.${
  //                               bIndex + 1
  //                             }.${cIndex + 1}.${dIndex + 1} : ${
  //                               d.subTopicsName
  //                             }</h3></div>`
  //                           );
  //                           fullPageHTML.push(
  //                             `<div styles="page-break-inside: avoid; page-break-after:always;">${d.htmlData}</div>`
  //                           );
  //                           headingHTML.push(
  //                             `<div>&nbsp&nbsp&nbsp<a style="text-decoration: none; color: black" href="#${
  //                               xIndex + 1
  //                             }.${yIndex + 1}.${yIndex + 1}.${zIndex + 1}.${
  //                               aIndex + 1
  //                             }.${bIndex + 1}.${cIndex + 1}.${dIndex + 1}" />${
  //                               xIndex + 1
  //                             }.${yIndex + 1}.${yIndex + 1}.${zIndex + 1}.${
  //                               aIndex + 1
  //                             }.${bIndex + 1}.${cIndex + 1}.${dIndex + 1} : ${
  //                               d.subTopicsName
  //                             }</div>`
  //                           );
  //                           headings.push({
  //                             index: `${xIndex + 1}.${yIndex + 1}.${
  //                               zIndex + 1
  //                             }.${aIndex + 1}.${bIndex + 1}.${cIndex + 1}.${
  //                               dIndex + 1
  //                             }`,
  //                             heading: `${d.subTopicsName}`,
  //                             pageNo: "",
  //                           });
  //                           if (d.subTopics.length > 0) {
  //                             d.subTopics.map((e, eIndex) => {
  //                               fullPageHTML.push(
  //                                 `<div id="${xIndex + 1}.${yIndex + 1}.${
  //                                   zIndex + 1
  //                                 }.${aIndex + 1}.${bIndex + 1}.${cIndex + 1}.${
  //                                   dIndex + 1
  //                                 }.${
  //                                   eIndex + 1
  //                                 }" style="margin-top:10px; margin-bottom:5px"><h3>Chapter: ${
  //                                   xIndex + 1
  //                                 }.${yIndex + 1}.${zIndex + 1}.${aIndex + 1}.${
  //                                   bIndex + 1
  //                                 }.${cIndex + 1}.${dIndex + 1}.${
  //                                   eIndex + 1
  //                                 } : ${e.subTopicsName}</h3></div>`
  //                               );
  //                               fullPageHTML.push(
  //                                 `<div styles="page-break-inside: avoid; page-break-after:always;">${e.htmlData}</div>`
  //                               );
  //                               headingHTML.push(
  //                                 `<div>&nbsp&nbsp&nbsp<a style="text-decoration: none; color: black" href="#${
  //                                   xIndex + 1
  //                                 }.${yIndex + 1}.${yIndex + 1}.${zIndex + 1}.${
  //                                   aIndex + 1
  //                                 }.${bIndex + 1}.${cIndex + 1}.${dIndex + 1}.${
  //                                   eIndex + 1
  //                                 }" />${xIndex + 1}.${yIndex + 1}.${
  //                                   zIndex + 1
  //                                 }.${aIndex + 1}.${bIndex + 1}.${cIndex + 1}.${
  //                                   dIndex + 1
  //                                 }.${eIndex + 1} : ${e.subTopicsName}</div>`
  //                               );

  //                               headings.push({
  //                                 index: `${xIndex + 1}.${yIndex + 1}.${
  //                                   zIndex + 1
  //                                 }.${aIndex + 1}.${bIndex + 1}.${cIndex + 1}.${
  //                                   dIndex + 1
  //                                 }.${eIndex + 1}`,
  //                                 heading: `${e.subTopicsName}`,
  //                                 pageNo: "",
  //                               });
  //                             });
  //                           }
  //                         });
  //                       }
  //                     });
  //                   }
  //                 });
  //               }
  //             });
  //           }
  //         });
  //       }
  //     });
  //   }
  // });
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