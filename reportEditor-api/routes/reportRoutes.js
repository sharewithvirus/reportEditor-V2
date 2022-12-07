const express = require("express");
const router = express.Router();
const {
  getReportsList,
  createReport,
  singleReportData,
  getSingleReport,
  updateReport,

} = require("../controllers/reportController");

router.route("/").get(getReportsList).post(createReport).put(updateReport);
//router.route("/reportData/:id").get(getSingleReport);
router.route("/single-report/:id").get(getSingleReport);

// router.route("/:id").delete();
module.exports = router;