const express = require("express");
const router = express.Router();
const {
  getReportsList,
  createReport,

} = require("../controllers/reportController");

router.route("/").get(getReportsList).post(createReport);


module.exports = router;