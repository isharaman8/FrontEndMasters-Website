const express = require("express");
const app = express();
const connectDB = require("./config/connect");
require("dotenv").config();

app.use(express.static("./public"));
app.use(express.json());

app.listen(7000, async () => {
	await connectDB(process.env.MONGO_URI);
	console.log(`app is listening on port 7000...`);
});
