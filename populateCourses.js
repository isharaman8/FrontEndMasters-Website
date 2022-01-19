const courses = require("./public/JSON/courses");
const connectDB = require("./config/connect");
const Course = require("./models/courses.model");
const Author = require("./models/authors.test.model");
require("dotenv").config();

// const populate = async (courses) => {
// 	try {
// 		await connectDB(process.env.MONGO_URI_TEST);
// 		await Course.deleteMany();
// 		await Course.create(courses);
// 		console.log(`Done`);
// 		process.exit(0);
// 	} catch (err) {
// 		console.log(err);
// 		process.exit(1);
// 	}
// };

for (let elem of courses) {
	delete elem.author;
	delete elem.authorJob;
	delete elem.authorImg;
	elem.previewImage = elem.previewImages;
	delete elem.previewImages;
	elem.description = elem.desc;
	delete elem.desc;
}

const populate = async (courses) => {
	await connectDB(process.env.MONGO_URI_TEST);
	const authors = await Author.find().lean().exec();

	for (let i = 0; i < courses.length; i++) {
		courses[i].author = authors[i]._id;
	}
	console.log(courses);
	await Course.deleteMany();
	await Course.create(courses);
	process.exit(0);
};

populate(courses);
