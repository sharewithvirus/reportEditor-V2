const express = require("express");
const router = express.Router();
const { 
        createChart,
        getChart,
        updateChart,
        deleteChart,
        getAllChart,
<<<<<<< HEAD
        getChartByChartId
=======
        getChartbyId
>>>>>>> 6ea3c94302831d487150dee6edd36bcdc397b29c
      } = require("../controllers/chartController");

//All Charts Route In a Single Model
router.route("/").post(createChart).get(getChart);
router.route("/:id").patch(updateChart).delete(deleteChart);
router.route("/:id").get(getAllChart);
<<<<<<< HEAD
router.route("/chartId").get(getChartByChartId);


=======
router.route("/chartId/").get(getChartbyId);
>>>>>>> 6ea3c94302831d487150dee6edd36bcdc397b29c

module.exports = router;
