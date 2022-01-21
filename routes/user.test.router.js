const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorize");
const authenticate = require("../middlewares/authentication");

const {
	registerUser,
	loginUser,
	deleteUser,
	getUsers,
} = require("../controllers/user.controller");

router.get("/test/admin", authenticate, authorize(["admin"]), getUsers);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/:id").delete(deleteUser);

module.exports = router;
