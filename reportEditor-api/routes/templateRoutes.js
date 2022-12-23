const { Router } = require("express");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "temp/" });
const {
  getAllTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  singleTemplateData,
  defaultTempUpdate
} = require("../controllers/templateController");

exports.createPdf = async (req, res) => {};

router.route("/").get(getAllTemplate).post(upload.single("templateImg"), createTemplate).put(upload.single("templateImg"),updateTemplate);
router.route("/templateData/:id").get(singleTemplateData);
router.route("/:id").delete(deleteTemplate).patch(defaultTempUpdate);

module.exports = router;
