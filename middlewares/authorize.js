const { StatusCodes } = require("http-status-codes");
const { FORBIDDEN } = StatusCodes;

const authorise = (permittedRoles) => {
	return (req, res, next) => {
		const user = req.user;
		let isAllowed = false;

		if (permittedRoles.includes(user.role)) {
			isAllowed = true;
		}

		if (isAllowed) {
			next();
		} else {
			return res.status(FORBIDDEN).send({ message: "Permission denied" });
		}
	};
};

module.exports = authorise;
