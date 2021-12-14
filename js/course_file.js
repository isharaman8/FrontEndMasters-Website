import courses from "/JSON/courses.js";

// ADDING DURATIONS
const videoLengths = [
	"3 hrs 30 minutes",
	"2 hrs 11 minutes",
	"5 hrs 44 minutes",
	"1 hr 17 minutes",
	"5 hrs 19 minutes",
];

for (let i = 0; i < courses.length; i++) {
	courses[i].duration =
		videoLengths[Math.floor(Math.random() * videoLengths.length)];
}

const appendCourses = (courses) => {
	console.log(courses);

	document.querySelector("#courses").innerHTML = "";
	courses.forEach((course) => {
		// CREATING ELEMENTS
		const title = document.createElement("h2");
		const authorName = document.createElement("p");
		const authorJob = document.createElement("p");
		const description = document.createElement("p");
		const duration = document.createElement("p");
		const ccTag = document.createElement("p");

		// buttons
		const watchFreePrevBtn = document.createElement("button");
		const getFullAccessBtn = document.createElement("button");

		// imgs
		const authorImg = document.createElement("img");
		const backgroundImg = document.createElement("img");

		// divs
		const mainDiv = document.createElement("div");
		const authorCredsDiv = document.createElement("div");
		const authorCredsTextDiv = document.createElement("div");
		const textDiv = document.createElement("div");

		// span
		const durationSpan = document.createElement("span");
		const buttonSpan = document.createElement("span");

		// SETTING ATTRIBUTES AND TEXT CONTENTS
		title.textContent = course.courseName;
		authorName.textContent = course.author;
		authorJob.textContent = course.authorJob;
		description.textContent = course.desc;
		duration.textContent = course.duration;
		ccTag.textContent = `cc`;

		// buttons
		watchFreePrevBtn.textContent = `Watch Free Preview`;
		getFullAccessBtn.textContent = `Get Full Access`;

		//images
		authorImg.src = course.authorImg;
		backgroundImg.src = course.webpImg;

		// adding classes
		ccTag.classList.add("ccTag");
		authorCredsDiv.classList.add("authorMainDiv");
		authorCredsTextDiv.classList.add("authorTextDiv");
		mainDiv.classList.add("courseMainDiv");
		textDiv.classList.add("courseTextDiv");
		durationSpan.classList.add("durationSpan");
		buttonSpan.classList.add("buttonSpan");
		backgroundImg.classList.add("bigImage");

		// APPENDING
		authorCredsTextDiv.append(authorName, authorJob);
		authorCredsDiv.append(authorImg, authorCredsTextDiv);

		durationSpan.append(duration, ccTag);
		buttonSpan.append(watchFreePrevBtn, getFullAccessBtn);
		textDiv.append(
			title,
			authorCredsDiv,
			description,
			durationSpan,
			buttonSpan
		);
		mainDiv.append(backgroundImg, textDiv);

		// APPENDING TO MAIN DIV
		document.querySelector("#courses").append(mainDiv);
	});
};

appendCourses(courses);
