const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, "../uploads"));
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const filefilter = (req, file, cb) => {
	if (
		file.mimetype === "image/png" ||
		file.mimetype === "image/jpeg" ||
		file.mimetype === "image/jpg"
	) {
		cb(null, true);
	} else cb(null, false);
};

const upload = multer({
	storage: storage,
	fileFilter: filefilter,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
});

const uploadSingle = (fn) => {
	return (req, res, next) => {
		const uploadItem = upload.single(fn);
		uploadItem(req, res, function (err) {
			if (err instanceof multer.MulterError) {
				console.log(err);
				return res.send({ message: err.message, errType: "multerError" });
			} else if (err) {
				console.log(err);
				return res.send({ message: err.message, errType: "normalError" });
			}
			next();
		});
	};
};

const uploadMultiple = (fileSize, fieldName) => {
	return (req, res, next) => {
		const uploadItem = upload.array(fieldName, fileSize);
		uploadItem(req, res, function (err) {
			if (err instanceof multer.MulterError) {
				console.log(err);
				return res.send({ message: err.message, errType: "multerError" });
			} else if (err) {
				console.log(err);
				return res.send({ message: err.message, errType: "normalError" });
			}
			next();
		});
	};
};

module.exports = { uploadSingle, uploadMultiple };
