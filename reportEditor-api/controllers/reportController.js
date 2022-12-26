const fs = require("fs");
const path = require("path");
const pdf = require("html-pdf");
const wkhtmltopdf = require("wkhtmltopdf");
const Report = require("../model/reportModel");
const Template = require("../model/templateModel");
const chartModel = require("../model/chartModel");
const jsonToHtml = require("node-json2html");
const cheerio = require('cheerio');
// const { map } = require("cheerio/lib/api/traversing");


//const SubTopic = require("../model/subTopicModel");

const drawChartUpdated = async (item) => {
    if (item.chartType === 'pie') {
      const data = item.formChartData;
      const seriesData = data.series.split(',').map(item1 => parseFloat(item1));
      const labels = data.label.split(',');
      const myElement = {
        series: seriesData,
        chart: {
                width: 380,
                type: 'pie',
              },
          labels: labels,
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
          }]
      }
      return myElement;
    // return JSON.stringify(myElement);
    } 
    // else if (item.ctype === 'radar') {
    //   chartsData.series = item.datachart.map(item => ({
    //     name: item.name,
    //     data: item.data.split(',').map(value => parseFloat(value))
    //   }))
  
    //   if (item.category) chartsData.options.xaxis.categories = item.category.split(',')
  
    //   const myElement = (
    //     <div className='row'>
    //       {' '}
    //       <div className='mixed-chart'>
    //         <Chart
    //           options={chartsData.options}
    //           series={chartsData.series}
    //           type={item.ctype}
    //           width='700'
    //           style={{
    //             display: 'flex',
    //             justifyContent: 'center'
    //           }}
    //         />{' '}
    //       </div>{' '}
    //     </div>
    //   )
  
    //   if (document.getElementById(item.divid)) {
    //     let root1 = ReactDOM.createRoot(document.getElementById(item.divid))
    //     root1.render(myElement)
    //   }
    // } else if (item.ctype === 'donut') {
    //   let tt = item.datachart.map(item => item.name.split(','))
    //   let sdata = item.datachart.map(item => item.data.split(',').map(value => parseFloat(value)))
  
    //   chartsData.series = sdata[0]
    //   chartsData.options.labels = tt[0]
  
    //   const myElement = (
    //     <div className='row'>
    //       {' '}
    //       <div className='mixed-chart'>
    //         <Chart options={chartsData.options} series={chartsData.series} type={item.ctype} width='500' style={{
    //             display:'flex',
    //             justifyContent:'center',
    //             }} />{' '}
    //       </div>{' '}
    //     </div>
    //   )
  
    //   if (document.getElementById(item.divid)) {
    //     let root1 = ReactDOM.createRoot(document.getElementById(item.divid))
    //     root1.render(myElement)
    //   }
    // } else if (item.ctype === 'bar') {
    //   const datachart = item.datachart.map(item => item.data.split(',').map(value => parseFloat(value)))
  
    //   chartsData.series = [{ data: datachart[0] }]
  
    //   if (item.category) chartsdata.options.xaxis.categories = item.category.split(',')
  
    //   const myElement = (
    //     <div className='row'>
    //       {' '}
    //       <div className='mixed-chart'>
    //         <Chart options={chartsdata.options} series={chartsdata.series} type={item.ctype} width='500'  style={{
    //             display:'flex',
    //             justifyContent:'center',
    //             }} />{' '}
    //       </div>{' '}
    //     </div>
    //   )
  
    //   if (document.getElementById(item.divid)) {
    //     let root1 = ReactDOM.createRoot(document.getElementById(item.divid))
    //     root1.render(myElement)
    //   }
    // } else if (item.ctype === 'stacked') {
    //   //item.ctype = 'bar'
    //   chartsdata.series = item.datachart.map(info => ({
    //     name: info.name,
    //     data: info.data.split(',').map(value => parseFloat(value))
    //   }))
    //   if (item.category) chartsdata.options.xaxis.categories = item.category.split(',')
    //   const myElement = (
    //     <div className='row'>
    //       {' '}
    //       <div className='mixed-chart'>
    //         <Chart options={chartsdata.options} series={chartsdata.series} type='bar' width='500'  style={{
    //             display:'flex',
    //             justifyContent:'center',
    //             }} />{' '}
    //       </div>{' '}
    //     </div>
    //   )
  
    //   if (document.getElementById(item.divid)) {
    //     let root1 = ReactDOM.createRoot(document.getElementById(item.divid))
    //     root1.render(myElement)
    //   }
    // } else if (item.ctype === 'line') {
    //   // item.ctype = 'line'
    //   chartsdata.series = item.datachart.map(info => ({
    //     name: info.name,
    //     data: info.data.split(',').map(value => parseFloat(value))
    //   }))
  
    //   if (item.category) chartsdata.options.xaxis.categories = item.category.split(',')
  
    //   const myElement = (
    //     <div className='row'>
    //       {' '}
    //       <div className='mixed-chart'>
    //         <Chart options={chartsdata.options} series={chartsdata.series} type={item.ctype} width='500'  style={{
    //             display:'flex',
    //             justifyContent:'center',
    //             }} />{' '}
    //       </div>{' '}
    //     </div>
    //   )
  
    //   if (document.getElementById(item.divid)) {
    //     let root1 = ReactDOM.createRoot(document.getElementById(item.divid))
    //     root1.render(myElement)
    //   }
    // } else if (item.ctype === 'area') {
    //   // item.ctype = 'area'
    //   chartsdata.series = item.datachart.map(info => ({
    //     name: info.name,
    //     data: info.data.split(',').map(value => parseFloat(value))
    //   }))
    //   if (item.category) chartsdata.options.xaxis.categories = item.category.split(',')
    //   const myElement = (
    //     <div className='row'>
    //       {' '}
    //       <div className='mixed-chart'>
    //         <Chart options={chartsdata.options} series={chartsdata.series} type={item.ctype} width='500'  style={{
    //             display:'flex',
    //             justifyContent:'center',
    //             }} />{' '}
    //       </div>{' '}
    //     </div>
    //   )
  
    //   console.log(item.divid)
    //   if (document.getElementById(item.divid)) {
    //     let root1 = ReactDOM.createRoot(document.getElementById(item.divid))
    //     root1.render(myElement)
    //   }
    // } else if (item.ctype === 'multibar') {
    //   // item.ctype = 'bar'
    //   chartsdata.series = item.datachart.map(info => ({
    //     name: info.name,
    //     data: info.data.split(',').map(value => parseFloat(value))
    //   }))
  
    //   console.log(chartsdata.series)
    //   chartsdata.options.xaxis.categories = item.category.split(',')
    //   const myElement = (
    //     <div className='row'>
    //       {' '}
    //       <div className='mixed-chart'>
    //         <Chart options={chartsdata.options} series={chartsdata.series} type='bar' width='500'  style={{
    //             display:'flex',
    //             justifyContent:'center',
    //             }} />{' '}
    //       </div>{' '}
    //     </div>
    //   )
  
    //   console.log(item.divid)
    //   if (document.getElementById(item.divid)) {
    //     let root1 = ReactDOM.createRoot(document.getElementById(item.divid))
    //     root1.render(myElement)
    //   }
    // } else if (item.ctype === 'barandline') {
    //   chartsdata.series = item.datachart.map(info => ({
    //     name: info.name,
    //     type: info.ctype,
    //     data: info.data.split(',').map(value => parseFloat(value))
    //   }))
  
    //   if (item.category) chartsdata.options.labels = item.category.split(',')
  
    //   const myElement = (
    //     <div className='row'>
    //       {' '}
    //       <div className='mixed-chart'>
    //         <Chart options={chartsdata.options} series={chartsdata.series} type={'line'} width='500'  style={{
    //             display:'flex',
    //             justifyContent:'center',
    //             }} />{' '}
    //       </div>{' '}
    //     </div>
    //   )
  
    //   if (document.getElementById(item.divid)) {
    //     let root1 = ReactDOM.createRoot(document.getElementById(item.divid))
    //     root1.render(myElement)
    //   }
    // }
  // }, 1000)
}


const getChartData = async (charttype) => {
  let state;
  if (charttype === 'polarArea') {
    console.log("Chart", charttype)
    console.log("polarArea")
    state = {
      series: '',
            options: {
              chart: {
                type: 'polarArea',
              },
              labels: '',
              stroke: {
                colors: ['#fff']
              },
              fill: {
                opacity: 0.8
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
              }]
            },
          
          
          };
    return  state

  } else if (charttype === 'pie') {
    console.log("Chart", charttype)
    console.log("Pie")
    state = {
      series: '',
      options: {
         
      legend: {
        width: 200
      },
        labels: ''
      }
    }
    return  state
  } else if (charttype === 'bar') {
    console.log("Chart", charttype)
    console.log("Bar")
    state = {
      series: '',
      options: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ''
        },
        
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
             
            title: {
              formatter: function (seriesName) {
                return ""
              }
            }
          }
        }
      }
    }
    return  state
  } else if (charttype === 'radar') { 
    console.log("Chart", charttype)
    console.log("Radar")
    state = {
      series: '',
      options: {
        chart: {
          width: 500,
          height: 400,
          type: 'radar',
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
          },
          toolbar: {
            show: false,
            tools: {
              download: true,
              zoomin: false,
              zoomout: false,
              reset: false,
              pan: false,
              zoom: false
            },
            export: {
              png: {
                filename: 'undefined'
              },
              csv: {
                filename: 'undefined'
              }
            }
          }
        },
        stroke: {
          width: 2
        },
        fill: {
          opacity: 0.1
        },
        markers: {
          size: 0
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          offsetX: 40
        },
        xaxis: {
          categories: '',
          title: {
            text: '',
            style: {
              fontSize: '12px',
              color: '#76838f',
              fontWeight: 100
            }
          }
        },
        theme: {
          palette: 'palette4' // upto palette10
        },
        title: {
          text: '',
          align: 'center',
          style: {
            fontSize: '12px',
            fontWeight: 100,
            color: 'rgb(55, 61, 63)'
          }
        },
        subtitle: {
          text: '',
          align: 'center',

          style: {
            fontSize: '12px',
            fontWeight: 100,
            color: 'rgb(55, 61, 63)'
          }
        }
      }
    }
    return  state
  } else if (charttype === 'stacked'){
    console.log("Chart", charttype)
    console.log("stacked")
      charttype="bar";
      state ={
            series: '',
            options: {
            chart: {
                type: 'bar',
                height: 100,
                stacked: true,
                toolbar: {
                show: false,
                tools:{
                    download: true,
                    zoomin: false,
                            zoomout: false,
                            reset: false,
                            pan: false,
                            zoom: false
                },
                export: {
                    png: {
                        filename: "undefined",
                    },
                    csv: {
                        filename: "undefined",
                    }
                }
            }
            },
            //colors: colors,
            plotOptions: {
                bar: {
                horizontal: false,
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            xaxis: {
                categories: '',
                title:{text:'',
                style: {
                fontSize: '12px',
                color:'#76838f',
                fontWeight: 100
            }},
                labels: {
                formatter: function (val) {
                    return val
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
                    return val
                }
                }
            },
            fill: {
                opacity: 1
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                offsetX: 40
            },
            theme: {
            palette: 'palette1' // upto palette10
        },
        title: {
            text: '',
            align:'center',
            style: {
            fontSize: '12px',
            fontWeight: 100,
            color: 'rgb(55, 61, 63)'
            }
        },
        subtitle: {
            text: '',
            align:'center',
        
        style: {
            fontSize: '12px',
            fontWeight: 100,
            color: 'rgb(55, 61, 63)'
        }},
            },


    }
    return  state
  } else if (charttype === 'line'){
    console.log("Chart", charttype)
    console.log("line")
    state= {

          series: '',
          options: {
              chart: {
              height: 10,
              type: 'line',
              zoom: {
                  enabled: false
              },
              toolbar: {
              show: false,
              tools:{
                  download: true,
                  zoomin: false,
                          zoomout: false,
                          reset: false,
                          pan: false,
                          zoom: false
              },
              export: {
                  png: {
                      filename: "undefined",
                  },
                  csv: {
                      filename: "undefined",
                  }
              }
          }
              },
              
              dataLabels: {
              enabled: false
              }, yaxis: {
              labels: {
                  formatter: function (val) {
                  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
              }
              },
              stroke: {
              curve: 'straight'
              },

              grid: {
              row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
              },
              },
              legend: {
              position: 'bottom',
              horizontalAlign: 'center',
              offsetX: 40
          },
              xaxis: {
              categories: '',
              title:{text:'',
              style: {
              fontSize: '12px',
              color:'#76838f',
              fontWeight: 100
          }}
              },
              theme: {
              palette: 'palette2' // upto palette10
          },
          
          title: {
              text: '',
              align:'center',
              style: {
              fontSize: '12px',
              fontWeight: 100,
              color: 'rgb(55, 61, 63)'
              }
          },
          subtitle: {
              text: '',
              align:'center',
          
          style: {
              fontSize: '12px',
              fontWeight: 100,
              color: 'rgb(55, 61, 63)'
          }},
      },
    }
    return  state
  } else if (charttype === 'area'){
    console.log("Chart", charttype)
    console.log("area")
    state= {
      series: '',
      options: {
        chart: {
          height: '365px',
          type: 'area',
          toolbar: {
            show: false,
            tools:{
                download: true,
                zoomin: false,
                zoomout: false,
                reset: false,
                pan: false,
                zoom: false
            },
            export: {
                png: {
                    filename: "undefined",
                  },
                  csv: {
                    filename: "undefined",
                  }
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'number',
          categories: '',
          title:{text:'',align:'right',
          style: {
            fontSize: '12px',
            color:'#76838f',
            fontWeight: 100
          }}
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          offsetX: 40
      },
        theme: {
          palette: 'palette6' // upto palette10
        },
        title: {
          text: '',
          align:'center',
          style: {
           fontSize: '12px',
            fontWeight: 100,
            color: 'rgb(55, 61, 63)'
          }
        },
        subtitle: {
          text: '',
          align:'center',
        
        style: {
         fontSize: '12px',
          fontWeight: 100,
          color: 'rgb(55, 61, 63)'
        }},
      },
    }
    return  state
  } else if (charttype === 'multibar') {
    console.log("Chart", charttype)
    console.log("Muktibar")
    charttype="bar"
    state = {
      series: '',
      options: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ''
        } ,
        fill: {
          opacity: 1
        }
      }
    }
    return  state
  } else if (charttype === 'donut') {
    console.log("Chart", charttype)
    console.log("Donut")
    state = {
      series: '',
      options: {
        labels: '',
        chart: {
          type: 'donut',
          toolbar: {
            show: false
          }
        },
        
      },
    
    
    }
    return  state
  } else if (charttype === 'barandline') {
    console.log("Chart", charttype)
    console.log("Brand Line")
    state = {
      series: '',
      options: {
        chart: {
          height: 400,
          width: 650,
          type: 'line',
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
              reset: false
            },
            autoSelected: 'zoom'
          },
        },
        stroke: {
          width: [4, 4]
        },
        title: {
          text: "",
          align: 'center',
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: undefined,
            color: '#000'
          }
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1]
        },
        labels:  '',
      
        yaxis: [{
          title: {
            text: '',
          },
      
        }, {
          opposite: true,
          title: {
            text: ''
          }
        }]
      }
    }
    charttype="line"
    return  state
  }
}

exports.createReport = async (req, res) => {
  try {
    const { name, userList, industry, template, baseYear, forecastYear } =
      req.body;
      console.log(req.body);
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
  try {
    const { id } = req.params;
    const reportData = await Report.findById(id)
    .populate(['template','industry', 'reportImages', "reportCharts", "reportTables"])
    .populate({
      path: 'reportCharts',
      select: "chartType formChartData"
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
fullPageHTML.push(`<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script><script>`)

const getChartScriptSingle = async (data) => {
    const chartData = await drawChartUpdated(data);
    const ele = `const drawChart${data._id ? data._id : ''} = '${chartData ? JSON.stringify(chartData) : ''}'; const newChart${data._id ? data._id : ''} = new ApexCharts(document.querySelector('#chart${data._id ? data._id : ''}'), JSON.parse(drawChart${data._id ? data._id : ''})); newChart${data._id ? data._id : ''}.render();`;
  return ele;
}
for (let i = 0; i < reportCharts.length; i++) {
  const newHtml = await getChartScriptSingle(reportCharts[i]);
  fullPageHTML.push(newHtml);
}

fullPageHTML.push(`</script></body></html>`);

const joinHTML = fullPageHTML.join('');
const dom = cheerio.load(joinHTML);

reportData.subTopics = [],
reportData.reportCharts = [],
reportData.reportTables = [],
reportData.reportImages = [],

    res.status(200)
    .json({ 
      status: "success", 
      message: "Report Data", 
      data: dom.html(),
      reportData
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};