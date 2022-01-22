const { INTERNAL_SERVER_ERROR } = require("../utils/error_codes");
const path = require("path");

const getCourseImage = async (req, res) => {
	try {
		const filePath = path.join(
			__dirname,
			`../uploads/coursesImages/${req.params.fileName}`
		);
		return res.sendFile(filePath);
	} catch (err) {
		console.log("Error", err);
		return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
	}
};

const getTweetImage = async (req, res) => {
	try {
		const filePath = path.join(
			__dirname,
			`../uploads/tweets/${req.params.fileName}`
		);
		return res.sendFile(filePath);
	} catch (err) {
		console.log("Error", err);
		return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
	}
};
const getAuthorImage = async (req, res) => {
	try {
		const filePath = path.join(
			__dirname,
			`../uploads/authorImages/${req.params.fileName}`
		);
		return res.sendFile(filePath);
	} catch (err) {
		console.log("Error", err);
		return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
	}
};
module.exports = { getCourseImage, getAuthorImage, getTweetImage };
