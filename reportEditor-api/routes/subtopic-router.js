const express = require("express");
const router = express.Router();
const {
  getTopicList,
  createSubTopic,
  updateSubTopic,
  deleteSubTopic,
} = require("../controllers/subTopicController");

router.route("/").get(getTopicList).post(createSubTopic).put(updateSubTopic);
router.route("/:id").delete(deleteSubTopic);

module.exports = router;
