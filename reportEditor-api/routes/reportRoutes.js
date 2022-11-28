const express = require("express");
const router = express.Router();
const {
  getReportsList,
  createReport,
  singleReportData,
  updateReport,

} = require("../controllers/reportController");

router.route("/").get(getReportsList).post(createReport).put(updateReport);
router.route("/reportData/:id").get(singleReportData);
// router.route("/:id").delete();

module.exports = router;