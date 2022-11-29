
const fs = require("fs");
const path = require("path");
const pdf = require("html-pdf");
const wkhtmltopdf = require("wkhtmltopdf");
const Report = require("../model/reportModel");
// const Template = require("../models/templateModel");
// const SubTopic = require("../models/subTopicModel");



exports.createReport = async (req, res) => {
    try {

      const { name,
              userList, 
              industry,
              template ,
              baseYear,
              forecastYear

      } = req.body;
      const newReport = await Report.create({
              name,
              userList, 
              industry,
              template ,
              baseYear,
              forecastYear
       });
      res.status(201).json({
        status: "Success",
        message: "Report created successfully",
        newReport: newReport,
      });
    } catch (error) {
        console.log(error)
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
        "name userList baseYear forecastYear template"
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
        message: "All reports were successfully retrieved.",
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
      const { _id, name , baseYear , forecastYear , userList , template} = req.body;
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