const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (token) => {
	return (
		new Promise(res, req),
		() => {
			jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
				if (err) return reject(err);
				resolve(decoded);
			});
		}
	);
};

module.exports = async (req, res, next) => {
	if (!req?.headers?.authorization) {
		return res.status(400).send({ message: "Provide valid token" });
	}

	const bearerToken = req.headers.authorization;
	if (!bearerToken.startsWith("Bearer "))
		return res
			.status(400)
			.send({ message: "Please provide a valid authorization token" });

	const token = bearerToken.split(" ")[1];
	let user;
	try {
		user = verifyToken(token);
	} catch (err) {
		console.log(err);
		return res.status(500).send({ message: err.message });
	}

	req.user = user.user;

	next();
};
