var express = require('express');
var router = express.Router();
const { createDepartment, getAllDepartments, departmentStatusUpdate, updateDepartment, departmentDelete} = require("../controllers/department-controller")
const {protect} = require("../helpers/auth")


router.route("/").get(getAllDepartments);
router.route("/update-status/").post(departmentStatusUpdate);
router.route("/create").post(createDepartment);
router.route("/update/:id").patch(updateDepartment);
router.route("/delete/:id").delete(departmentDelete);  


module.exports = router;