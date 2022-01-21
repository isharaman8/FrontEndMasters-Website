const {Schema, model} = require("mongoose");


const tweetSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    tweet: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    tweetLogo: {
        type: String,
        required: true,
    },
});

module.exports = model("Tweet", tweetSchema);
