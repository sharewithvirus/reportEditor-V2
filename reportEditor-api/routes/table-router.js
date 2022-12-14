const express = require("express");
const { createTable } = require("../controllers/tableController");
const router = express.Router();

router.route("/").post(createTable);

module.exports = router;