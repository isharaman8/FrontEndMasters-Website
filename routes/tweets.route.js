const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploads");
const {postTweet,getTweets,getTweetsPagination} = require("../controllers/tweets.controller");


router.route("/test").get(getTweetsPagination);
router.route("/").get(getTweets).post(
		upload.fields([{ name: "img" }, { name: "tweetLogo" }]),
		postTweet
	);

module.exports = router;
