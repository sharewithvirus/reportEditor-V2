const Template = require("../model/templateModel");
const { uploadImg } = require("../config/s3Config");

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
      "name editor header footer url body headerLogo logoAlignment"
    );
    res.status(200).json({
      status: "success",
      message: "Template Data",
      data: template,
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
    const { name, editor, logoAlignment, header, footer, defaultTemp } =
      req.body;
    const file = req.file;
    console.log(file);
    console.log(name, logoAlignment, header, footer, defaultTemp);
    if ((!name, !logoAlignment, !header, !footer, !defaultTemp, !file)) {
      res.status(200).json({
        status: "error",
        message: "Template Data and Image Require",
      });
      return;
    } else {
      let result;
      if (file) {
        result = await uploadImg(file);
        console.log(result);
      }
      const newTemplate = await Template.create({
        name: name,
        editor: editor,
        logoAlignment: logoAlignment,
        header: header,
        footer: footer,
        url: result?.Location,
        defaultTemp,
      });
      res.status(200).json({
        status: "Success",
        message: "Template created successfully",
        newTemplate: newTemplate,
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

exports.updateTemplate = async (req, res) => {
  try {
    const { _id, name, editor, logoAlignment, header, footer, defaultTemp } = req.body;
    const file = req.file;
    if (!file) {
      console.log(".....",req.body);
      await Template.findByIdAndUpdate(_id, req.body);
      res.status(200).json({
        status: "Success",
        message: "Template Updated successfully",
      });
    } else {
      let result;
      console.log(".....",req.body);
      if (file) {
        result = await uploadImg(file);
        console.log(result);
      }
      await Template.findByIdAndUpdate(_id, {
        name: name,
        editor: editor,
        logoAlignment: logoAlignment,
        header: header,
        footer: footer,
        url: result?.Location,
        defaultTemp,
      });
      res.status(200).json({
        status: "Success",
        message: "Template Updated successfully",
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

exports.defaultTempUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const newTemp = await Template.findById(id).select("defaultTemp");
    // await Template.findByIdAndUpdate(newTemp._id, {defaultTemp: !newTemp.defaultTemp});
    await Template.findByIdAndUpdate(id, { defaultTemp: true });

    await Template.updateMany(
      { _id: { $ne: newTemp._id } },
      { $set: { defaultTemp: false } }
    );
    res.status(200).json({
      status: "success",
      message: "Default Template updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
