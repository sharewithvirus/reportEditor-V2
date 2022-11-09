var express = require('express');
var router = express.Router();
const { createRole, getAllRole, roleStatusUpdate } = require("../controllers/role-controller")
const {protect} = require("../helpers/auth")


router.route("/").get( getAllRole);
router.route("/update-status/").post(roleStatusUpdate);
router.route("/create").post(createRole);
// router.route("/update/:id").patch(updateDepartment);


module.exports = router;