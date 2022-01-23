const Course = require("../models/courses.model");

const fs = require("fs");
const path = require("path");

const {
	INTERNAL_SERVER_ERROR,
	OK,
	BAD_REQUEST,
} = require("../utils/error_codes");

const getCoursesStatic = async (req, res) => {
	try {
		const page = req.query.page || 1;
		const size = req.query.size || 10;

		const offset = (page - 1) * size;

		let courses = await Course.find()
			.skip(offset)
			.limit(size)
			.populate("author")
			.lean()
			.exec();
		if (courses.length !== 0) {
			return res.status(OK).send(courses);
		} else return res.status(OK).send(courses);
		// }
	} catch (err) {
		console.log("Error", err);
		return res.status(INTERNAL_SERVER_ERROR).send({ err: err.messgage });
	}
};

const getCourses = async (req, res) => {
	try {
		const queryObject = {};
		const { courseName, author, popular } = req.query;
		let key = [];

		if (courseName) {
			queryObject.courseName = { $regex: courseName, $options: "i" };
			key.push(courseName);
		}

		let courses;
		// Author Query
		if (author) {
			courses = await Course.aggregate([
				{
					$lookup: {
						from: "authors",
						localField: "author",
						foreignField: "_id",
						as: "author",
					},
				},
				{
					$match: {
						"author.author": { $regex: author, $options: "i" },
					},
				},
			]).exec();

			return res.status(OK).send({
				courses,
				nbHits: courses.length,
			});
		}
		if (popular) {
			queryObject.popular = popular === "true" ? true : false;
			key.push(popular);
		}

		courses = await Course.find(queryObject).populate("author");
		if (courses.length !== 0)
			return res.status(OK).send({ courses, courseCount: courses.length });
	} catch (err) {
		console.log("Error", err);
		return res.status(INTERNAL_SERVER_ERROR).send({ err: err.message });
	}
};

const createCourses = async (req, res) => {
	try {
		let course = req.body;
		let webpPath = req.files.webpImg[0].filename;

		let previewPath = req.files.previewImage[0].filename;

		course.webpImg = webpPath;
		course.previewImage = previewPath;
		course = await Course.create(course);

		return res.status(OK).send(course);
	} catch (err) {
		console.log("Error", err);
		return res.status(INTERNAL_SERVER_ERROR).send({ err: err.message });
	}
};

const updateCourse = async (req, res) => {
	try {
		let course = req.body;
		let webpPath = req.files.webpImg[0].filename;
		let previewPath = req.files.previewImage[0].filename;
		course.webpImg = webpPath;
		course.previewImage = previewPath;
		course.popular = req.body.popular == "true" ? true : false;

		console.log(course);
		course = await Course.findByIdAndUpdate(req.params.id, course)
			.lean()
			.exec();

		// Removing Old Files
		previewPath = path.join(
			__dirname,
			`../uploads/coursesImages/${course.previewImage}`
		);
		webpImage = path.join(
			__dirname,
			`../uploads/coursesImages/${course.webpImg}`
		);

		let testPath = course.webpImage;

		// Checking if file path is not a url
		if (testPath && !testPath.startsWith("https")) {
			const allFiles = [previewPath, webpImage];

			for (let oneFile of allFiles) {
				fs.unlink(oneFile, function (err) {
					if (err) console.log(err);
					console.log(`File delete: ${oneFile}`);
				});
			}
		}

		return res.status(OK).send(course);
	} catch (err) {
		console.log("Error", err);
		return res.status(INTERNAL_SERVER_ERROR).send({ error: err.message });
	}
};

const deleteCourse = async (req, res) => {
	try {
		const course = await Course.findByIdAndDelete(req.params.id);
		if (!course) {
			return res.status(BAD_REQUEST).send({ message: `Course not found` });
		}

		const previewPath = path.join(
			__dirname,
			`../uploads/coursesImages/${course.previewImage}`
		);
		const webpImage = path.join(
			__dirname,
			`../uploads/coursesImages/${course.webpImg}`
		);

		let testPath = course.webpImage;

		// Checking if file path is not a url
		if (testPath && !testPath.startsWith("https")) {
			const allFiles = [previewPath, webpImage];

			for (let oneFile of allFiles) {
				fs.unlink(oneFile, function (err) {
					if (err) console.log(err);
					console.log(`File delete: ${oneFile}`);
				});
			}
		}

		return res.status(OK).send(course);
	} catch (err) {
		console.log("Error", err);
		return res.status(INTERNAL_SERVER_ERROR).send({ error: err.message });
	}
};
module.exports = {
	getCoursesStatic,
	createCourses,
	getCourses,
	deleteCourse,
	updateCourse,
};
