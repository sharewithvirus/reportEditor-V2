const Template = require("../model/templateModel");

exports.getAllTemplate = async (req, res) => {
  try {
    const templateList = await Template.find({});
    res.status(200).json({
      status: "Success",
      message: "Template List was successfully retrieved",
      templateList: templateList,
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

exports.singleTemplateData = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await Template.findById(id).select(
      "name editor header footer body headerLogo"
    );
    res.status(200).json({
      status: "success",
      message: "Template Data",
      Data: template,
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

exports.createTemplate = async (req, res) => {
  try {
    const { name, editor,logoAlignment, header, footer, url } = req.body;
    const newTemplate = await Template.create({
      name: name,
      editor: editor,
      logoAlignment: logoAlignment,
      header: header,
      footer: footer,
      url: url
    });
    res.status(200).json({
      status: "Success",
      message: "Template created successfully",
      newTemplate: newTemplate,
    });
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.updateTemplate = async (req, res) => {
  try {
    console.log(req.body);
    const { _id,  name, editor,logoAlignment, header, footer, url} = req.body;

    const updatedTemplate = await Template.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    console.log(updatedTemplate);
    res.status(200).json({
      status: "Success",
      message: "Template Updated successfully",
      newTemplate: updatedTemplate,
    });
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (id) {
      await Template.findByIdAndDelete(id);
      res.status(200).json({
        status: "Success",
        message: "Template deleted",
      });
    } else {
      res.status(200).json({
        status: "Success",
        message: "Template Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      message: "Internal Server Error",
      error: error,
    });
  }
};
