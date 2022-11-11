var express = require('express');
var router = express.Router();
const { createRole, getAllRole, roleStatusUpdate, roleDelete } = require("../controllers/role-controller")
const {protect} = require("../helpers/auth")


router.route("/").get( getAllRole);
router.route("/update-status/").post(roleStatusUpdate);
router.route("/create").post(createRole);
// router.route("/update/:id").patch(updateDepartment);
router.route("/delete/:id").delete(roleDelete);  


module.exports = router;