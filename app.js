const express = require("express");
const app = express();
const connectDB = require("./config/connect");
require("dotenv").config();

// Routes Imports
const coursesRouter = require("./routes/courses.router");

app.use(express.static("./public"));
app.use(express.json());

// Courses.route;
app.use("/api/v1/courses", coursesRouter);

app.listen(3000, async () => {
	await connectDB(process.env.MONGO_URI_TEST);
	console.log(`app is listening on port 3000...`);
});
