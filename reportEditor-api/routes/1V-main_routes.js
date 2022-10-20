let express = require('express');
let router = express.Router();

router.use("/", require("./main-router"))

module.exports = router;