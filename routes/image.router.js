const express = require("express");
const router = express.Router();

const { getCourseImage } = require("../controllers/image.controller");

router.route("/courses/:fileName").get(getCourseImage);

module.exports = router;
