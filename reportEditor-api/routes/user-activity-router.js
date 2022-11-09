var express = require('express');
var router = express.Router();
const { getAllActivityOfUser} = require("../controllers/activity-controller");
const { protect } = require("../helpers/auth");


router.route("/").get(protect, getAllActivityOfUser);
// router.route("/create").post(createDepartment);


module.exports = router;