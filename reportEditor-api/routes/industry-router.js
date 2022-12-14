const express = require("express");
const router = express.Router();

const {createIndustry,getAllIndustry,updateIndustry,deleteIndustry,updateStatus,getAllIndustryByStatus, getAllIndustryByDepartmentId} = require("../controllers/industry-controller");

router.route("/").get(getAllIndustry).post(createIndustry);
router.route("/:id").patch(updateIndustry).delete(deleteIndustry);
router.route("/update-status/:id").patch(updateStatus);
router.route("/getByStatus").get(getAllIndustryByStatus);
router.route("/getindustryBy/DeptId/:departmentId").get(getAllIndustryByDepartmentId);

module.exports = router;