const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploads");
const {
	getAuthorsStatic,
	createAuthor,
	deleteAuthor,
} = require("../controllers/authors.controller");

router.post("/", upload.single("authorImg"), createAuthor);
router.route("/").get(getAuthorsStatic);
router.delete("/:id", deleteAuthor);

module.exports = router;
