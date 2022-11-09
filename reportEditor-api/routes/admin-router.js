var express = require('express');
var router = express.Router();
const { adminRegister, adminLogin, adminLogout, dashboard} = require("../controllers/admin-controller");
const { protect } = require("../helpers/auth");


router.route("/").get(protect, dashboard);
router.route("/register").post(adminRegister);
router.route("/login").post(adminLogin);
router.route("/logout").post(protect, adminLogout)
// router.route("/sendVerificationCode/").post(adminLogin);
// router.route("/verify/account/:id")


module.exports = router;