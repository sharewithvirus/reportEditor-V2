const express = require("express");
const router = express.Router();
const { createPieChart, 
        getPieChart,
        createDonutChart,
        getDonutChart,
        createBarChart,
        getBarChart,
        createLineChart,
        getLineChart,
        createStackChart,
        getStackChart,
        createRadarChart,
        getRadarChart
      } = require("../controllers/chartController");

//PIE-Chart Routes
router.route("/pie-chart").post(createPieChart).get(getPieChart);

//Donut-Chart Routes
router.route("/donut-chart").post(createDonutChart).get(getDonutChart);

//Bar-Chart Routes
router.route("/bar-chart").post(createBarChart).get(getBarChart);

//Line-Chart Routes  
router.route("/line-chart").post(createLineChart).get(getLineChart);

//Stacked-Bar-Chart Routes
router.route("/stack-chart").post(createStackChart).get(getStackChart);

//Radar-Chart Routes
router.route("/radar-chart").post(createRadarChart).get(getRadarChart);

//Area-Chart Routes

//MultiBar-Chart Routes

//BarAndLine-Chart Routes


module.exports = router;
