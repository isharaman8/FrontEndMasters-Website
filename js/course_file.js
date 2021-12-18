import courses from "/JSON/courses.js";
import navbar from "../components/header.js";
import footer from "../components/footer.js";

// using components
document.querySelector("#navbar").innerHTML = navbar();
document.querySelector("#footer").innerHTML = footer();
let id;

// GLOBAL DIVS
let allCourseDiv = document.querySelector("#allCourses");
let popularCourseDiv = document.querySelector("#popularCourses");
let searchCourseDiv = document.querySelector("#searchDiv");

// ADDING DURATIONS
const videoLengths = [
	"3 hrs 30 minutes",
	"2 hrs 11 minutes",
	"5 hrs 44 minutes",
	"1 hr 17 minutes",
	"5 hrs 19 minutes",
];

const popularVideo = [true, false];

for (let i = 0; i < courses.length; i++) {
	courses[i].duration =
		videoLengths[Math.floor(Math.random() * videoLengths.length)];
}
for (let i = 0; i < courses.length; i++) {
	courses[i].isPopular =
		popularVideo[Math.floor(Math.random() * popularVideo.length)];
}

function appendCourses(courses, appendingDiv) {
	document.getElementById("allCourses").innerHTML = "";
	document.getElementById("popularCourses").innerHTML = "";
	document.querySelector("#searchDiv").innerHTML = "";

	// SETTING CONDITION FOR APPENDING DIV
	if (appendingDiv.id === "popularCourses") {
		courses = courses.filter((course) => course.isPopular === true);
	}

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

		// EVENT LISTENERS
		let previewListeners = [watchFreePrevBtn, backgroundImg, title];
		previewListeners.forEach((one) => {
			one.addEventListener("click", () => {
				goToPreviewPage(course);
			});
		});

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
		appendingDiv.append(mainDiv);
	});
}

function goToPreviewPage(course) {
	localStorage.setItem("previewCourse", JSON.stringify(course));
	window.location.href = "preview.html";
}

function searchResults() {
	let query = document.querySelector("#searchCourse").value;
	if (!query) {
		document.getElementById("allCoursesLi").click();
		clearTimeout(id);
		return;
	}
	let filteredData = courses.filter((course) => {
		return course.courseName.toLowerCase().includes(query.toLowerCase());
	});
	// console.log(document.querySelector("#popularCourses").innerHTML);
	// console.log(document.querySelector("#allCourses").innerHTML);

	if (popularCourseDiv.innerHTML) {
		document.querySelector("#headingAndSearch > h1").textContent =
			"Popular Search Result";
	} else {
		document.querySelector("#headingAndSearch > h1").textContent =
			"Course Search Results";
	}
	appendCourses(filteredData, searchCourseDiv);
}

function debouncing(func, delay) {
	clearTimeout(id);
	id = setTimeout(() => {
		func();
	}, delay);
}
// INITIALIZING MAIN FUNCTION
appendCourses(courses, allCourseDiv);

// GLOBAL EVENT LISTENERS

document.querySelector("#popularLi").addEventListener("click", () => {
	document.querySelector("#headingAndSearch > h1").textContent =
		"View Popular Courses";
	appendCourses(courses, popularCourseDiv);
	document.querySelector("#allCoursesLi").style.backgroundColor = "#161616";
	document.querySelector("#popularLi").style.backgroundColor = "#0a57a3";

	// rgb(194, 194, 194);
	console.log(document.querySelector("#popularLi").style.color);
	document.querySelector("#popularLi").style.color = "white";
	document.querySelector("#allCoursesLi").style.color = "rgb(194, 194, 194)";
});

document.querySelector("#allCoursesLi").addEventListener("click", () => {
	document.querySelector("#headingAndSearch > h1").textContent =
		"Frontend Masters Courses";

	appendCourses(courses, allCourseDiv);
	document.querySelector("#allCoursesLi").style.backgroundColor = "#0a57a3";
	document.querySelector("#popularLi").style.backgroundColor = "#161616";

	document.querySelector("#popularLi").style.color = "rgb(194, 194, 194)";
	document.querySelector("#allCoursesLi").style.color = "white";
});

document.querySelector("#searchCourse").addEventListener("input", (event) => {
	debouncing(searchResults, 1000);
});
