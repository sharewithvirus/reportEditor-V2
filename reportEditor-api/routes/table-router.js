const express = require("express");
const { createTable, getAllTables } = require("../controllers/tableController");
const router = express.Router();

router.route("/").post(createTable);
router.route("/:id").get(getAllTables);


module.exports = router;