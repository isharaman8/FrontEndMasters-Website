// local Storages
const endUser = JSON.parse(localStorage.getItem("frontEndUser")) || {};
const userPlan = JSON.parse(localStorage.getItem("frontEndUserPlan")) || [];

document.getElementById("cdForm").addEventListener("submit", (event) => {
	checkout(event, endUser, userPlan[1]);
});

function checkout(event, endUser, planPrice) {
	event.preventDefault();

	let date = new Date();
	let time = date.toLocaleTimeString();
	let accountNumber = endUser["description"].split(",")[0].split("");
	for (let i = 0; i < accountNumber.length - 4; i++) {
		accountNumber[i] = "X";
	}
	accountNumber = accountNumber.join("");

	let otpSubmitted = document.querySelector("#otp").value;

	if (otpSubmitted == 123456) {
		alert(`Your Purchase of $${planPrice} is successful`);
		alert(`Your A/C ${accountNumber} is debited by USD${planPrice} at ${time}`);
		window.location.href = "/LOGIN_SIGNUP/login.html";
	} else {
		alert("WRONG OTP SUBMITTED");
	}
}
