const express = require("express");
const router = express.Router();

const {
	getCourseImage,
	getAuthorImage,
	getTweetImage,
} = require("../controllers/image.controller");

router.route("/courses/:fileName").get(getCourseImage);
router.get("/authors/:fileName", getAuthorImage);
router.get("/tweets/:fileName", getTweetImage);

module.exports = router;
