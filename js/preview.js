const singleCourse = JSON.parse(localStorage.getItem("previewCourse")) || {};

const upperSection = (singleCourse) => {
	document.querySelector("#imageAndAuthor").innerHTML = "";

	// CREATING ELEMENTS
	// images
	const bgImage = document.createElement("img");
	const authorImg = document.createElement("img");

	// texts
	const heading = document.createElement("h1");
	const authorName = document.createElement("h3");
	const authorJob = document.createElement("p");
	const videoDuration = document.createElement("p");
	const ccTag = document.createElement("p");

	// spans
	const durationSpan = document.createElement("span");

	// Divs
	const upperMainDiv = document.createElement("div");
	const upperTextDiv = document.createElement("div");
	const uppAuthorMain = document.createElement("div");
	const uppAuthorText = document.createElement("div");

	// SETTING ATTTRIBUTES AND TEXT CONTENTS
	bgImage.src = singleCourse.webpImg;
	authorImg.src = singleCourse.authorImg;

	heading.textContent = singleCourse.courseName;
	authorName.textContent = singleCourse.author;
	authorJob.textContent = singleCourse.authorJob;
	videoDuration.textContent = singleCourse.duration;
	ccTag.textContent = "cc";

	// ADDING CLASSES AND IDS
	upperMainDiv.id = "upperMainDiv";
	upperTextDiv.id = "upperTextDiv";
	uppAuthorMain.id = "uppAuthorMain";
	uppAuthorText.id = "uppAuthorText";
	durationSpan.classList.add("durationSpan");
	ccTag.classList.add("ccTag");

	// APPENDING
	durationSpan.append(videoDuration, ccTag);

	uppAuthorText.append(authorName, authorJob);
	uppAuthorMain.append(authorImg, uppAuthorText);

	upperTextDiv.append(heading, uppAuthorMain, durationSpan);
	upperMainDiv.append(bgImage, upperTextDiv);

	document.querySelector("#imageAndAuthor").append(upperMainDiv);
};

const bottomSection = (singleCourse) => {
	document.querySelector("#preview").innerHTML = "";
	// CREATING ELEMNENTS
	// images
	const previewImg = document.createElement("img");

	// texts
	const description = document.createElement("p");
	const publishedAt = document.createElement("p");

	// buttons
	const fullAccessBtn = document.createElement("button");

	// divs
	const bottomMainDiv = document.createElement("div");
	const bottomTextDiv = document.createElement("div");

	// SETTING ATTRIBUTES AND TEXT CONTENTS
	previewImg.src = singleCourse.previewImages;
	description.textContent = singleCourse.desc;

	// random published dates
	const randomDates = [
		"December 7, 2021",
		"January 17, 2020",
		"August 5, 2021",
		"September 10, 2020",
		"March 5, 2021",
		"July 12, 2020",
	];

	publishedAt.textContent = `Published: ${
		randomDates[Math.floor(Math.random() * randomDates.length)]
	}`;
	fullAccessBtn.textContent = "Get Unlimited Access Now";

	// ADDING CLASSES AND IDS
	bottomTextDiv.id = "bottomTextDiv";
	bottomMainDiv.id = "bottomMainDiv";

	/*
	-
	-
	EVENT LISTENER FOR BUTTON
	-
	-
	-
	*/

	// APPENDING
	bottomTextDiv.append(description, publishedAt, fullAccessBtn);
	bottomMainDiv.append(previewImg, bottomTextDiv);

	document.querySelector("#preview").append(bottomMainDiv);
};

upperSection(singleCourse);
bottomSection(singleCourse);
