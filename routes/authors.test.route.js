const express = require("express");
const router = express.Router();

const { getAuthorsStatic } = require("../controllers/authors.controller");

router.route("/").get(getAuthorsStatic);

module.exports = router;
