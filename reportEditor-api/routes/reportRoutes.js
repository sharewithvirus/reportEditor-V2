const express = require("express");
const router = express.Router();
const {
  getReportsList,
  createReport,
  getSingleReport,
  updateReport,
  createPdfPreview,
  createPDFReport
} = require("../controllers/reportController");

router.route("/").get(getReportsList).post(createReport).put(updateReport);
router.route("/reportData/:id").get(getSingleReport);
router.route("/pdf-preview/:id").get(createPdfPreview);
router.route("/pdf-generate/:id").get(createPDFReport);
module.exports = router;