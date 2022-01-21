const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploads");

const {
	getAuthorsStatic,
	createAuthor,
} = require("../controllers/authors.controller");

router
	.route("/")
	.get(getAuthorsStatic)
	.post(upload.single("authorImg"), createAuthor);

module.exports = router;
