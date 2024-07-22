const updatingCourse = JSON.parse(localStorage.getItem("updatingCourse")) || {};
const updateCourse = async (e, course) => {
	e.preventDefault();

	let upObj = {
		courseName: document.querySelector("#courseName").value,
		description: document.querySelector("#description").value,
		publishedAt: document.querySelector("#publishedAt").value,
	};

	const previewFile = document.getElementById("previewImage").files[0];
	const webpFile = document.getElementById("webpImg").files[0];

	if (!previewFile || !webpFile) {
		alert("Upload All the files");
		return;
	}
	const fd = new FormData();
	fd.append("previewImage", previewFile);
	fd.append("webpImg", webpFile);
	fd.append("courseName", document.querySelector("#courseName").value);
	fd.append("description", document.querySelector("#description").value);
	fd.append("publishedAt", document.querySelector("#publishedAt").value);
	fd.append("popular", document.querySelector("#popular").value);
	fd.append("duration", updatingCourse.duration);

	let url = `/api/v1/courses/${course._id}`;

	let api = await fetch(url, {
		method: "PATCH",
		body: fd,
		headers: {
			Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
		},
	});
	let data = await api.json();
	console.log(data);
	if (data.author !== undefined) {
		alert(`Update Successful`);
		window.location.href = "/ADMIN/dashboard.html";
	}
};

const preFillForm = (course) => {
	document.querySelector("#courseName").value = course.courseName;
	document.querySelector("#description").value = course.description;
	document.querySelector("#publishedAt").value = course.publishedAt;
	document.querySelector("#popular").value = course.popular;
};

document.querySelector("#updateForm").addEventListener("submit", (event) => {
	updateCourse(event, updatingCourse);
});

// Pre fill FOrm
preFillForm(updatingCourse);
