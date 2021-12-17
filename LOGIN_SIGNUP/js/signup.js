import plans from "../../JSON/plans.js";
console.log(plans);
document.querySelector("#register").addEventListener("submit", registerUser);

function mapPlans(plans) {
	plans.forEach((plan) => {
		console.log(plan);
		// CREATING ELEMENTS
		const planName = document.createElement("h3");
		const planDesc = document.createElement("p");
		const price = document.createElement("p");
		const tickIcon = document.createElement("i");

		// spans
		const priceSpan = document.createElement("span");

		// divs
		const textDiv = document.createElement("div");

		// SETTING ATTRIBUTES AND TEXT CONTENTS

		planName.textContent = plan.planType;
		planDesc.textContent = plan.description;
		tickIcon.innerHTML = `check_circle`;
		price.textContent = plan.planPrice;

		// Add Classes and ids
		tickIcon.classList.add("material-icons");
		tickIcon.classList.add("tickIcon");
		textDiv.classList.add("planTextDiv");
		priceSpan.classList.add("priceSpan");

		// appending
		priceSpan.append(tickIcon, price);
		textDiv.append(planName, priceSpan, planDesc);

		document.querySelector("#planSelect").append(textDiv);
	});
}

async function registerUser(event) {
	event.preventDefault();

	let name = `${document.querySelector("#firstName").value} ${
		document.querySelector("#lastName").value
	}`;
	let description = `Payment Method Selected: ${
		document.querySelector("#paymentsSelect").value
	}`;

	let paymentMode = document.querySelector("#paymentsSelect").value;
	const userObj = {
		name: name,
		email: document.querySelector("#email").value,
		password: document.querySelector("#password").value,
		username: document.querySelector("#username").value,
		mobile: document.querySelector("#mobile").value,
		description: description,
	};

	if (
		!(
			userObj.name &&
			userObj.email &&
			userObj.password &&
			userObj.username &&
			userObj.mobile
		)
	) {
		alert("Missing Values");
		return;
	}

	const url = `https://masai-api-mocker.herokuapp.com/auth/register`;

	const api = await fetch(url, {
		method: "POST",
		body: JSON.stringify(userObj),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await api.json();
	checkValidUser(data, paymentMode);
}

function checkValidUser(data, paymentMode) {
	if (data.error == false) {
		alert("Registration Successful");
		localStorage.setItem("frontEndUser", JSON.stringify(data));

		if (paymentMode === "cdCard") window.location.href = "cdCard.html";
		else window.location.href = "payPal.html";
	} else {
		alert("User Already Exist");
	}
}

// initializing functions
mapPlans(plans);
