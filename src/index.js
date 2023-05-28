import "./styles/form.scss";
import { colRef } from "./firebaseinit.js";
import { addDoc } from "firebase/firestore";

// create a form element
const form = document.createElement("form");
form.classList.add("form");

// create an input element for name
const nameInput = document.createElement("input");
nameInput.setAttribute("type", "text");
nameInput.setAttribute("name", "name");
nameInput.setAttribute("placeholder", "Enter your name");

// create an input element for email
const emailInput = document.createElement("input");
emailInput.setAttribute("type", "email");
emailInput.setAttribute("name", "email");
emailInput.setAttribute("placeholder", "Enter your email");

// create a submit button
const submitBtn = document.createElement("button");
submitBtn.setAttribute("type", "submit");
submitBtn.innerText = "Submit";

// append all the elements to the form
form.appendChild(nameInput);
form.appendChild(emailInput);
form.appendChild(submitBtn);

// append the form to the body
document.body.appendChild(form);

submitBtn.addEventListener("click", (e) => {
	e.preventDefault();

	// Get the form input values
	const name = nameInput.value;
	const email = emailInput.value;

	// Store the form data in Firestore
	addDoc(colRef, {
		name: name,
		email: email,
	})
		.then(() => {
			console.log("Form data stored in Firebase");
			form.reset();
		})
		.catch((error) => {
			console.error("Error storing form data: ", error);
		});
});
