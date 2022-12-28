const express = require("express");
const { createTable, getAllTables, deleteTable } = require("../controllers/tableController");
const router = express.Router();

router.route("/").post(createTable);
router.route("/:id").get(getAllTables);
router.route("/:id").delete(deleteTable);

module.exports = router;