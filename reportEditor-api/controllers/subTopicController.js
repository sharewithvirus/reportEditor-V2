const Report = require("../models/reportModel");
const SubTopic = require("../models/subTopicModel");
const { removeSpaces } = require("./extraFunctions");

exports.getTopicList = async (req, res) => {
  try {
    const subTopicList = await SubTopic.find({});
    res.status(200).json({
      status: "Success",
      message: "SubTopic List was successfully retrieved",
      topicList: subTopicList,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.createSubTopic = async (req, res) => {
  try {
    console.log("api Hit");
    const { subTopicName, reportId, subTopicId } = req.body;
    let slug = "";
    let index = "";
    if (!subTopicName && (!subTopicId || !reportId)) {
      res.status(200).json({
        status: "Success",
        message: "SubTopic name is required Required",
      });
    }
    if (subTopicName && reportId) {
      const reportName = await Report.findById(reportId);
      slug = `/${removeSpaces(reportName.name)}/${removeSpaces(subTopicName)}`;
      index = Number(reportName.subTopics.length + 1);
      const newSubTopic = await SubTopic.create({
        subTopicsName: subTopicName,
        slug: slug,
        index: index,
        parentReport: reportId,
      });
      reportName.subTopics.push(newSubTopic._id);
      await reportName.save();
      res.status(200).json({
        status: "Success",
        message: "Topic Create Successfully",
        SubTopic: newSubTopic,
      });
    } else if (subTopicName && subTopicId) {
      const subTopic = await SubTopic.findById(subTopicId);
      const reportName = await Report.findById(subTopic.parentReport);
      slug = `${subTopic.slug}/${removeSpaces(subTopicName)}`;
      index = `${subTopic.index}.${Number(subTopic.subTopics.length + 1)}`;
      const newSubTopic = await SubTopic.create({
        subTopicsName: subTopicName,
        slug,
        index,
        parentReport: subTopic.parentReport,
        parentSubTopic: subTopic._id,
      });
      subTopic.subTopics.push(newSubTopic._id);
      await subTopic.save();
      await reportName.save();
      res.status(200).json({
        status: "Success",
        message: "Topic Create Successfully",
        SubTopic: newSubTopic,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.deleteSubTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const subTopic = await SubTopic.findByIdAndDelete(id);
    console.log(subTopic);
    if (subTopic.parentSubTopic) {
      const preSubTopic = await SubTopic.findById(subTopic.parentSubTopic);
      console.log(preSubTopic.subTopics);
      const index = preSubTopic.subTopics.indexOf(subTopic._id);
      if (index > -1) {
        preSubTopic.subTopics.splice(index, 1);
      }
      preSubTopic.save();
      console.log(preSubTopic.subTopics);
    }
    if (subTopic.parentReport) {
      const preReport = await Report.findById(subTopic.parentReport);
      console.log(preReport.subTopics);
      const index = preReport.subTopics.indexOf(subTopic._id);
      if (index > -1) {
        preReport.subTopics.splice(index, 1);
      }
      preReport.save();
      console.log(preReport.subTopics);
    }
    res.status(200).json({
      status: "Success",
      message: "Topic Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.updateSubTopic = async (req, res) => {
  try {
    const { id, template } = req.body;
    const subTopic = await SubTopic.findByIdAndUpdate(
      id,
      {
        htmlData: template,
      },
      { new: true }
    );
    res.status(200).json({
      status: "Success",
      message: "Topic Updated Successfully",
      topic: subTopic,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      error: error,
    });
  }
};
