const checkLogin = (data) => {
	if (data.token !== undefined) {
		localStorage.setItem("adminToken", data.token);
		window.location.href = "/ADMIN/dashboard.html";
	}
};

const loginAdmin = async (e) => {
	e.preventDefault();

	const username = document.querySelector("#username").value;
	const password = document.querySelector("#password").value;

	const credObj = { username: username, password: password };

	const url = `http://localhost:5000/api/v1/users/login`;

	const api = await fetch(url, {
		method: "POST",
		body: JSON.stringify(credObj),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await api.json();
	checkLogin(data);
};

document.querySelector("#login").addEventListener("submit", loginAdmin);
