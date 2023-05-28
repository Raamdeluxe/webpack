import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCO6fDaj_vw3K-Y4Mzr9RsxG5kStRKchCk",
	authDomain: "webpack-3900b.firebaseapp.com",
	projectId: "webpack-3900b",
	storageBucket: "webpack-3900b.appspot.com",
	messagingSenderId: "43583070350",
	appId: "1:43583070350:web:6e1d15cf129b7b6fffa9df",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, "form");

getDocs(colRef)
	.then((snapshot) => {
		let form = [];
		snapshot.docs.forEach((doc) => {
			form.push({ ...doc.data(), id: doc.id });
		});
		console.log(form);
	})
	.catch((err) => {
		console.log(err.message);
	});

export { colRef };
