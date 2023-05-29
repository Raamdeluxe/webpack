import "./styles/form.scss";
import { colRef } from "./firebaseinit.js";
import { addDoc } from "firebase/firestore";

// Create a form
const form = document.createElement("form");
form.classList.add("form");

// Create the first step
const step1 = document.createElement("div");
step1.classList.add("step1");

// Create the width input
const widthInput = document.createElement("input");
widthInput.setAttribute("type", "number");
widthInput.setAttribute("name", "width");
widthInput.setAttribute("placeholder", "Width: Min 60 cm - Max 200 cm");

// Create the height input
const heightInput = document.createElement("input");
heightInput.setAttribute("type", "number");
heightInput.setAttribute("name", "height");
heightInput.setAttribute("placeholder", "Height: Min 100 cm - Max 300 cm");

// Create the next button
const nextBtn = document.createElement("button");
nextBtn.setAttribute("type", "button");
nextBtn.innerText = "Next";

// Add an event listener to the next button
nextBtn.addEventListener("click", () => {
	// Hide the first step
	step1.style.display = "none";
	// Show the second step
	step2.style.display = "block";
});

// Append the elements to the first step
step1.appendChild(widthInput);
step1.appendChild(heightInput);
step1.appendChild(nextBtn);

// Append the first step to the form
form.appendChild(step1);

// Create the second step
const step2 = document.createElement("div");
step2.classList.add("step2");
step2.style.display = "none";

// Create the name input
const nameInput = document.createElement("input");
nameInput.setAttribute("type", "text");
nameInput.setAttribute("name", "name");
nameInput.setAttribute("placeholder", "Name");

// Create the email input
const emailInput = document.createElement("input");
emailInput.setAttribute("type", "email");
emailInput.setAttribute("name", "email");
emailInput.setAttribute("placeholder", "Email");

// Create the back button
const backBtn = document.createElement("button");
backBtn.setAttribute("type", "button");
backBtn.innerText = "Back";

// Add an event listener to the back button
backBtn.addEventListener("click", () => {
	// Hide the second step
	step2.style.display = "none";
	// Show the first step
	step1.style.display = "block";
});

// Create the submit button
const submitBtn = document.createElement("button");
submitBtn.setAttribute("type", "submit");
submitBtn.innerText = "Submit";

// Add an event listener to the submit button
// Add an event listener to the submit button
submitBtn.addEventListener("click", async (e) => {
	e.preventDefault();

	// Get the width and height values from the input fields
	let width = widthInput.value;
	let height = heightInput.value;

	// Parse the input values as floats
	width = parseFloat(width);
	height = parseFloat(height);

	// Fetch the JSON file
	const response = await fetch(
		"https://raw.githubusercontent.com/Raamdeluxe/test/main/data/price.json"
	);

	const data = await response.json();

	// Check if the width or height is less than 60
	if (width < 60 || height < 60) {
		// Find the nearest width and height key values in the JSON file
		const widthKeys = Object.keys(data);
		const heightKeys = Object.keys(data[widthKeys[0]]);
		width = findNearestValue(width, widthKeys);
		height = findNearestValue(height, heightKeys);
	} else if (width >= 200 || height > 300) {
		// Display an error message in the console
		console.error("Width or height is too high!");
		return;
	} else if (width >= 190) {
		// Round the values down to the nearest ten
		width = Math.floor(width / 10) * 10;
		height = Math.floor(height / 10) * 10;
	} else {
		// Round the values up to the nearest ten
		width = Math.ceil(width / 10) * 10;
		height = Math.ceil(height / 10) * 10;
	}

	// Get the price based on the rounded width and height
	const price = data[width][height];

	// Log the calculated price to the console
	console.log(`Calculated price: € ${price}`);

	// Log the rounded values to the console
	console.log(`Rounded width: ${width}`);
	console.log(`Rounded height: ${height}`);
	console.log(`Price: ${price}`);

	// Get the form input values
	const name = nameInput.value;
	const email = emailInput.value;

	// Store the form data in Firestore
	addDoc(colRef, {
		name: name,
		email: email,
		width: width,
		height: height,
		price: price,
	})
		.then(() => {
			console.log("Form data stored in Firebase");
			form.reset();
		})
		.catch((error) => {
			console.error("Error storing form data: ", error);
		});

	// Reset the form
	form.reset();
});

// Helper function to find the nearest value in an array
function findNearestValue(value, array) {
	return array.reduce((prev, curr) => {
		return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
	});
}

// Create the button container
const buttonContainer = document.createElement("div");
buttonContainer.classList.add("button-container");

// Append the buttons to the button container
buttonContainer.appendChild(backBtn);
buttonContainer.appendChild(submitBtn);

// Append the elements to the second step
step2.appendChild(nameInput);
step2.appendChild(emailInput);
step2.appendChild(buttonContainer);

// Append the second step to the form
form.appendChild(step2);

// Append the form to the body
document.body.appendChild(form);
