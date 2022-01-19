const Course = require("../models/courses.model");
const redis = require("../config/redis");

const { StatusCodes } = require("http-status-codes");

const { INTERNAL_SERVER_ERROR, OK } = StatusCodes;

const getCoursesStatic = async (req, res) => {
	try {
		let courses = await redis.get("courses");
		if (courses) return res.status(OK).send(JSON.parse(courses));
		else {
			courses = await Course.find().lean().exec();
			await redis.set(`courses`, JSON.stringify(courses));
			return res.status(OK).send(courses);
		}
	} catch (err) {
		console.log("Error", err);
		return res.status(INTERNAL_SERVER_ERROR).send({ err: err.messgage });
	}
};

const getCourses = async (req, res) => {
	try {
		const queryObject = {};
		const { courseName } = req.query;
		if (courseName) {
			queryObject.courseName = { $regex: courseName, $options: "i" };
		}
		const courses = await Course.find(queryObject);
		return res.status(OK).send({ courses, courseCount: courses.length });
	} catch (err) {
		console.log("Error", err);
		return res.status(INTERNAL_SERVER_ERROR).send({ err: err.message });
	}
};

const createCourses = async (req, res) => {
	try {
		let course = req.body;
		let webpPath = req.files.webpImg[0].path;
		let previewPath = req.files.previewImage[0].path;

		course.webpImg = webpPath;
		course.previewImage = previewPath;
		course = await Course.create(course);

		await redis.set(`courses.${course._id}`, JSON.stringify(course));

		let allCourses = await redis.get("courses");
		if (allCourses) {
			let parsedCourses = JSON.parse(allCourses);
			allCourses = [...parsedCourses, course];
			await redis.set(`courses`, JSON.stringify(allCourses));
		} else {
			allCourses = await Course.find().lean().exec();
			await redis.set(`courses`, JSON.stringify(allCourses));
		}

		return res.status(OK).send(course);
	} catch (err) {
		console.log("Error", err);
		return res.status(INTERNAL_SERVER_ERROR).send({ err: err.message });
	}
};

module.exports = { getCoursesStatic, createCourses, getCourses };
