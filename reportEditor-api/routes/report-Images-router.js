const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "temp/" });
const { getAllImagesByReportId, uploadImageToReport } = require("../controllers/reportImages-controller");

//All Charts Route In a Single Model
// router.route("/:id").get(getImageById);
// router.route("/allReportById").get(getAllImagesByReportId);
router.route("/imageUpload/:reportId").post(upload.single("reportImg"), uploadImageToReport);
router.route("/getAllImgByReportId/:reportId").get(getAllImagesByReportId);

module.exports = router;