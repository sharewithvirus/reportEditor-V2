var express = require('express');
var router = express.Router();
const { getAllActivityOfUser, getPaginatedActivityOfUser} = require("../controllers/activity-controller");
const { protect } = require("../helpers/auth");


router.route("/").get(protect, getAllActivityOfUser);
router.route("/:page/:limit").get(protect, getPaginatedActivityOfUser);
// router.route("/create").post(createDepartment);


module.exports = router;