const express = require("express");
const app = express();
const connectDB = require("./config/connect");
require("dotenv").config();

// Routes Imports
const coursesRouter = require("./routes/courses.router");
const authorRouter = require("./routes/authors.test.route");
const userRouter = require("./routes/user.test.router");
const tweetsRouter = require("./routes/tweets.route");

app.use(express.static("./public"));
app.use(express.json());

// Courses.route;
app.use("/api/v1/courses", coursesRouter);

// Authors route;
app.use("/api/v1/author", authorRouter);
app.use("/api/v1/tweets", tweetsRouter);

// User Router
app.use("/api/v1/users", userRouter);

app.listen(3000, async () => {
	await connectDB(process.env.MONGO_URI_TEST);
	console.log(`app is listening on port 3000...`);
});
