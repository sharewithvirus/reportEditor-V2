var express = require('express');
var router = express.Router();
const { createUser, getAllUsers, verifyUserToken, createUserPassword, changeUserStatus, updateUser, deleteUser, getAllUsersByDepartment } = require("../controllers/user-controller")
const {protect} = require("../helpers/auth")


router.route("/").get(getAllUsers);
router.route("/create").post(createUser);
router.route("/update/user").post(updateUser);
router.route("/verify/token/:token").get(verifyUserToken);
router.route("/password/create").post(createUserPassword);
router.route("/update-status").post(changeUserStatus);
router.route("/delete/:id").delete(deleteUser);  
router.route("/:teamType/:department").get(getAllUsersByDepartment);
 

module.exports = router;