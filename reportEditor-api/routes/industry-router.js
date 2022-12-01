const express = require("express");
const router = express.Router();

const {createIndustry,getAllIndustry,updateIndustry,deleteIndustry,updateStatus} = require("../controllers/industry-controller");

router.route("/").get(getAllIndustry).post(createIndustry);
router.route("/:id").patch(updateIndustry).delete(deleteIndustry);
router.route("/update-status/:id").patch(updateStatus);

module.exports = router;