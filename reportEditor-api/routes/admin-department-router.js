var express = require('express');
var router = express.Router();
const { createDepartment, getAllDepartments, departmentStatusUpdate, updateDepartment} = require("../controllers/department-controller")
const {protect} = require("../helpers/auth")


router.route("/").get(protect, getAllDepartments);
router.route("/update-status/").post(protect, departmentStatusUpdate);
router.route("/create").post(createDepartment);
router.route("/update/:id").patch(updateDepartment);


module.exports = router;