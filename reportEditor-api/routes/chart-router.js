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
        getRadarChart,
        createAreaChart,
        getAreaChart,
        createMultibarChart,
        getMultibarChart,
        createBarLineChart,
        getBarLineChart,
        updatePieChart,
        deletePieChart,
        createChart,
        getChart,
        updateChart,
        deleteChart,
<<<<<<< HEAD
        getAllChart,
      } = require("../controllers/chartController");

//All Charts Route In a Single Model
router.route("/").post(createChart).get(getAllChart);
router.route("/:id").get(getChart).patch(updateChart).delete(deleteChart);
=======
        getAllChart
      } = require("../controllers/chartController");

//All Charts Route In a Single Model
router.route("/").post(createChart).get(getChart);
router.route("/:id").patch(updateChart).delete(deleteChart);
router.route("/:id").get(getAllChart);
>>>>>>> 17884e7b2cddecb5a3be96b565608fa563558454



//PIE-Chart Routes
router.route("/pie-chart").post(createPieChart).get(getPieChart);
router.route("/pie-chart/:id").patch(updatePieChart).delete(deletePieChart);


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
router.route("/area-chart").post(createAreaChart).get(getAreaChart);

//MultiBar-Chart Routes
router.route("/multibar-chart").post(createMultibarChart).get(getMultibarChart);

//BarAndLine-Chart Routes
router.route("/barline-chart").post(createBarLineChart).get(getBarLineChart);



module.exports = router;
