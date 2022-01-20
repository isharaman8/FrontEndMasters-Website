const tweets = require("./public/JSON/tweets");
const connectDB = require("./config/connect");
const Tweet = require("./models/tweets.model");
require("dotenv").config();

const populate = async (tweets) => {
	try {
		await connectDB(process.env.MONGO_URI_TEST);
		await Tweet.deleteMany();
		await Tweet.create(tweets);
		console.log(`Done`);
		process.exit(0);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

populate(tweets);
