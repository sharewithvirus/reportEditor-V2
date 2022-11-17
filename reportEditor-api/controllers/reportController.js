
const fs = require("fs");
const path = require("path");
const pdf = require("html-pdf");
const wkhtmltopdf = require("wkhtmltopdf");
const Report = require("../model/reportModel");
// const Template = require("../models/templateModel");
// const SubTopic = require("../models/subTopicModel");



exports.createReport = async (req, res) => {
    try {
      const { name, author, industry, template } = req.body;
      const newReport = await Report.create({ name, author, industry, template });
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