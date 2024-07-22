const addCourse = async (e) => {
	e.preventDefault();

	const previewFile = document.getElementById("previewImage").files[0];
	const webpFile = document.getElementById("webpImg").files[0];

	if (!previewFile || !webpFile) {
		alert("Upload All the files");
		return;
	}

	let _date = new Date();
	let date = _date.toDateString();

	let publishedAtPart = document.querySelector("#publishedAt").value || date;

	const fd = new FormData();
	fd.append("previewImage", previewFile);
	fd.append("webpImg", webpFile);
	fd.append("courseName", document.querySelector("#courseName").value);
	fd.append("description", document.querySelector("#description").value);
	fd.append("publishedAt", publishedAtPart);
	fd.append("popular", document.querySelector("#popular").value);
	fd.append("duration", document.querySelector("#duration").value);
	fd.append("author", document.querySelector("#authorId").value);

	let url = `/api/v1/courses/`;

	let api = await fetch(url, {
		method: "POST",
		body: fd,
		headers: {
			Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
		},
	});
	let data = await api.json();
	if (data.author !== undefined) {
		alert(`Course Added Successfully`);
		window.location.href = "/ADMIN/dashboard.html";
	}
};

document.querySelector("#updateForm").addEventListener("submit", (event) => {
	addCourse(event);
});

let _date = new Date();
let date = _date.toDateString();
document.querySelector("#publishedAt").value = date;
