let express = require('express');
let router = express.Router();

router.use("/admin", require("./admin-router"))
router.use("/admin/department", require("./admin-department-router"))
router.use("/user/role", require("./role-router"))
router.use("/user/activity", require("./user-activity-router"))
router.use("/user", require("./user-router"))
router.use("/report", require("./reportRoutes"))

module.exports = router;