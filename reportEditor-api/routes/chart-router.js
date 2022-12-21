const express = require("express");
const router = express.Router();
const { 
        createChart,
        getChart,
        updateChart,
        deleteChart,
        getAllChart,
        getChartByChartId,
        getChartbyId,
        chartDelete
      } = require("../controllers/chartController");

//All Charts Route In a Single Model
router.route("/").post(createChart).get(getChart);
router.route("/:id").patch(updateChart).delete(chartDelete);
router.route("/:id").get(getAllChart);
router.route("/chartId").get(getChartByChartId);


module.exports = router;
