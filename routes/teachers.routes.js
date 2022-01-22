const upload = require("../middlewares/uploads");

const express = require("express");
const router = express.Router();

const Teacher = require("../models/teachers.model");
const {
	body,
	validationResults,
	validationResult,
} = require("express-validator");

router.post(
	"/",
	upload.single("profile_pic"),
	body("name").isLength({ min: 3 }).withMessage("Please enter a valid name"),
	body("job").isLength({ min: 3 }).withMessage("Please enter a valid job"),
	body("description")
		.isLength({ min: 10 })
		.withMessage("Please enter a valid description"),
	body("current_status")
		.isIn(["Past", "Active"])
		.withMessage("Please enter current status from Pasr or Active"),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(500).send(errors.array());
			}

			const teacher = await Teacher.create({
				name: req.body.name,
				profile_url: req.file.path,
				job: req.body.job,
				description: req.body.description,
				git_link: req.body.git_link,
				linkedIn_link: req.body.linkedIn_link,
				twitter_link: req.body.twitter_link,
				other_link: req.body.other_link,
				current_status: req.body.current_status,
			});
			return res.status(500).send(teacher);
		} catch (err) {
			return res.status(400).send(err.message);
		}
	}
);

router.get("/", async (req, res) => {
	try {
		const teachers = await Teacher.find().lean().exec();
		return res.status(500).send(teachers);
	} catch (err) {
		return res.status(400).send(err.message);
	}
});
router.patch("/:id", async (req, res) => {
	try {
		const teachers = await Teacher.findByIdAndUpdate(req.params.id, req.body)
			.lean()
			.exec();
		return res.status(500).send(teachers);
	} catch (err) {
		return res.status(400).send(err.message);
	}
});
router.delete("/:id", async (req, res) => {
	try {
		const teachers = await Teacher.findByIdAndDelete(req.params.id)
			.lean()
			.exec();
		return res.status(500).send(teachers);
	} catch (err) {
		return res.status(400).send(err.message);
	}
});

module.exports = router;
