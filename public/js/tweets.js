import tweetsArray from "../JSON/tweets.js";
let windowQuery = window.matchMedia("(max-width: 900px)");

const tweetDates = [
	"3:33am · Mar 1, 2019",
	"3:57pm · Oct 11, 2020",
	"5:51pm · Aug 29, 2020",
	"5:44pm · Aug 27, 2020",
	"11:43pm · Apr 28, 2020",
];
tweetsArray.forEach(
	(tweet) =>
		(tweet.publishedAt =
			tweetDates[Math.floor(Math.random() * tweetDates.length)])
);

const appendTweets = (tweets, appendingDiv) => {
	appendingDiv.innerHTML = "";
	tweets.forEach((tweet) => {
		// CREATING ELEMENTS
		// texts
		const name = document.createElement("h4");
		const username = document.createElement("p");
		const tweetDesc = document.createElement("p");
		const hrTag = document.createElement("hr");
		const publishedAt = document.createElement("p");

		// images
		const tweetImg = document.createElement("img");
		const userImg = document.createElement("img");

		// divs
		const mainDiv = document.createElement("div");
		const textDiv = document.createElement("div");
		const userMainDiv = document.createElement("div");
		const userTextDiv = document.createElement("div");

		// SETTING ATTRIBUTES AND TEXT CONTENTS
		// texts
		name.textContent = tweet.name;
		username.textContent = tweet.username;

		let descToArray = tweet.tweet.split(" ");
		for (let i = 0; i < descToArray.length; i++) {
			if (descToArray[i][0] == "@") {
				descToArray[i] = `<span class="blueWord">${descToArray[i]}</span>`;
			}
		}

		tweetDesc.innerHTML = descToArray.join(" ");
		publishedAt.textContent = tweet.publishedAt;

		// images
		tweetImg.src = tweet.tweetLogo;
		userImg.src = tweet.img;

		// ADDING IDS AND CLASSES
		mainDiv.classList.add("tweetMainDiv");
		textDiv.classList.add("tweetTextDiv");
		userMainDiv.classList.add("tweetUserMain");
		userTextDiv.classList.add("tweetUserText");
		tweetImg.classList.add("tweetLogo");

		// APPENDING
		userTextDiv.append(name, username);
		userMainDiv.append(userImg, userTextDiv);

		textDiv.append(tweetDesc, hrTag, publishedAt);
		mainDiv.append(userMainDiv, tweetImg, textDiv);
		appendingDiv.append(mainDiv);
	});
};

const setHiddenClass = (arr) => {
	for (let i = 0; i < 4; i++) {
		arr[i].classList.add("hiddenClass");
	}
};

// DEFINING PARTICULAR NO. OF TWEETS
let tweetsOne = tweetsArray.slice(0, 6);
let tweetsTwo = tweetsArray.slice(6, 12);
let tweetsThree = tweetsArray.slice(1, 7);

// DEFINING APPENDING DIVS
let tweetDiv1 = document.getElementById("cell1");
let tweetDiv2 = document.getElementById("cell2");
let tweetDiv3 = document.getElementById("cell3");

appendTweets(tweetsOne, tweetDiv1);
appendTweets(tweetsTwo, tweetDiv2);
appendTweets(tweetsThree, tweetDiv3);

window.addEventListener("DOMContentLoaded", () => {
	let pageOneTweets = document.querySelectorAll("#cell1 >.tweetMainDiv");
	let pageTwoTweets = document.querySelectorAll("#cell2 >.tweetMainDiv");
	let pageThreeTweets = document.querySelectorAll("#cell3 >.tweetMainDiv");

	for (let i = 0; i < 4; i++) {
		pageOneTweets[i].classList.add("hiddenClass");
		pageTwoTweets[i].classList.add("hiddenClass");
		pageThreeTweets[i].classList.add("hiddenClass");
	}
});
