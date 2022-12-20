const express = require("express");
const router = express.Router();
const { 
        createChart,
        getChart,
        updateChart,
        deleteChart,
        getAllChart,
        getChartbyId
      } = require("../controllers/chartController");

//All Charts Route In a Single Model
router.route("/").post(createChart).get(getChart);
router.route("/:id").patch(updateChart).delete(deleteChart);
router.route("/:id").get(getAllChart);
router.route("/chartId/").get(getChartbyId);


module.exports = router;
