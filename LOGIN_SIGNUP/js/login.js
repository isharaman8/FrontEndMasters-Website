const loginUser = async (event) => {
	event.preventDefault();
	const url = `https://masai-api-mocker.herokuapp.com/auth/login`;

	let loginObj = {
		password: document.querySelector("#password").value,
		username: document.querySelector("#username").value,
	};

	const api = await fetch(url, {
		method: "POST",
		body: JSON.stringify(loginObj),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await api.json();
	checkValidUser(data);
};

function checkValidUser(data) {
	if (data.error == false) {
		alert("Login Successful");
		window.location.href = "/mainHome.html";
	} else {
		alert("Login Failed");
		return;
	}
}

document.querySelector("#loginForm").addEventListener("submit", loginUser);
