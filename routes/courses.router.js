const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploads");

const {
	getCoursesStatic,
	createCourses,
	getCourses,
} = require("../controllers/courses.controller");

router.route("/test").get(getCoursesStatic);
router
	.route("/")
	.get(getCourses)
	.post(
		upload.fields([{ name: "webpImg" }, { name: "previewImage" }]),
		createCourses
	);

module.exports = router;
