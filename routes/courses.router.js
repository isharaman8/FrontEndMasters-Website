const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploads");
const authorize = require("../middlewares/authorize");
const authenticate = require("../middlewares/authentication");

const {
	getCoursesStatic,
	createCourses,
	getCourses,
	deleteCourse,
	updateCourse,
} = require("../controllers/courses.controller");

router.delete("/:id", authenticate, authorize(["admin"]), deleteCourse);
router.patch(
	"/:id",
	authenticate,
	authorize(["admin"]),
	upload.fields([{ name: "webpImg" }, { name: "previewImage" }]),
	updateCourse
);
router.route("/test").get(authenticate, authorize(["admin"]), getCoursesStatic);
router
	.route("/")
	.get(getCourses)
	.post(
		authenticate,
		authorize(["admin"]),
		upload.fields([{ name: "webpImg" }, { name: "previewImage" }]),
		createCourses
	);

module.exports = router;
