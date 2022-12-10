const express = require("express");
const router = express.Router();
const {
  getTopicList,
  createSubTopic,
  updateSubTopic,
  updateSubTopicData,
  deleteSubTopic,
} = require("../controllers/subTopicController");

router.route("/").get(getTopicList).post(createSubTopic).put(updateSubTopic).patch(updateSubTopicData);
router.route("/:id").delete(deleteSubTopic);

module.exports = router;
