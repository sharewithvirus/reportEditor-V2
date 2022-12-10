const express = require('express');
const router = express.Router();

router.use("/admin", require("./admin-router"));
router.use("/admin/department", require("./admin-department-router"));
router.use("/user/role", require("./role-router"));
router.use("/user/activity", require("./user-activity-router"));
router.use("/user", require("./user-router"));
router.use("/report", require("./reportRoutes"));
router.use("/template", require("./templateRoutes"));
router.use("/industry", require("./industry-router"));
router.use("/subtopic", require("./subtopic-router"));
router.use("/chart", require("./chart-router"));

module.exports = router;