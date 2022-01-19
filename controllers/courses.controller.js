const Course = require("../models/courses.model");
const { StatusCodes } = require("http-status-codes");
const { INTERNAL_SERVER_ERROR, OK } = StatusCodes;
const redis = require("../config/redis");
const multer = require("multer");
const webpUpload = multer({ dest: "../uploads/webpImages" });
const previewUpload = multer({ dest: "../uploads/previewImages" });

const getCourses = async (req, res) => {
	try {
		let courses = await redis.get("courses");
		if (courses) return res.status(OK).send(courses);
		else {
			courses = await Course.find().lean().exec();
			await redis.set(`courses`, JSON.stringify(courses));
			return res.status(OK).send(courses);
		}
	} catch (err) {
		console.log("Error", err);
		return res.status(INTERNAL_SERVER_ERROR).send();
	}
};
module.exports = { getCourses };
