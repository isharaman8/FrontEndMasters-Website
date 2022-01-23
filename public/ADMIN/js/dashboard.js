// Get All Courses
const fetchCourses = async (params) => {
	let url = `https://safe-woodland-02335.herokuapp.com/api/v1/courses/test`;
	if (params) {
		url = `${url}?${params}`;
		console.log(url);
	}
	let authToken = localStorage.getItem("adminToken");
	let api = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});
	let data = await api.json();
	return data;
};

// Delete Course Function
const deleteCourse = async (id) => {
	let url = `https://safe-woodland-02335.herokuapp.com/api/v1/courses/${id}`;
	let authToken = localStorage.getItem("adminToken");
	let api = await fetch(url, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});
	let data = await api.json();
	if (data.courseName !== undefined) {
		alert(`Course Deleted`);
		window.location.reload();
	}
};

const mapCourses = (courses) => {
	console.log(courses);
	document.querySelector("#courseTable > tbody").innerHTML = "";
	courses.map((course) => {
		// Creating Elements
		const courseName = document.createElement("td");
		const author = document.createElement("td");
		const publishedAt = document.createElement("td");
		const popular = document.createElement("td");
		const updatetd = document.createElement("td");
		const deletetd = document.createElement("td");
		const mainTr = document.createElement("tr");

		const updateButton = document.createElement("button");
		const deleteButton = document.createElement("button");

		// Setting Attributes
		courseName.textContent = course.courseName;
		author.textContent = course.author.author;
		publishedAt.textContent = course.publishedAt;
		popular.textContent = course.popular;
		updateButton.textContent = "Update";
		deleteButton.textContent = `Delete`;

		// EVENT LISTENERS
		updateButton.addEventListener("click", () => {
			localStorage.setItem("updatingCourse", JSON.stringify(course));
			window.location.href = "/ADMIN/updateCourse.html";
		});

		deleteButton.addEventListener("click", () => {
			deleteCourse(course._id);
		});

		// Appending
		updatetd.append(updateButton);
		deletetd.append(deleteButton);

		mainTr.append(courseName, author, publishedAt, popular, updatetd, deletetd);
		document.querySelector("#courseTable > tbody").append(mainTr);
	});
};

(async () => {
	let courses = await fetchCourses();
	console.log(courses);
	mapCourses(courses);
})();

// Event Listeners
let i = 1;
document.querySelector("#next").addEventListener("click", async () => {
	i++;
	let courses = await fetchCourses(`page=${i}`);
	if (courses.length < 10) {
		document.querySelector("#next").disabled = true;
	}
	if (courses.length === 0) {
		document.querySelector("#next").disabled = true;
		return;
	}
	console.log(courses);
	mapCourses(courses);
});
document.querySelector("#prev").addEventListener("click", async () => {
	i--;
	if (i == 0) {
		i = 1;
		return;
	}
	document.querySelector("#next").disabled = false;
	let courses = await fetchCourses(`page=${i}`);
	mapCourses(courses);
});

document.querySelector("#logout").addEventListener("click", () => {
	localStorage.removeItem("adminToken");
	window.location.href = `/ADMIN/login.html`;
});

document.querySelector("#addCourse").addEventListener("click", () => {
	window.location.href = `/ADMIN/addCourse.html`;
});
