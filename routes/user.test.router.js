const express = require("express");
const router = express.Router();

const {
	registerUser,
	loginUser,
	deleteUser,
	getUsers,
} = require("../controllers/user.controller");

router.route("/test").get(getUsers);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/:id").delete(deleteUser);

module.exports = router;
