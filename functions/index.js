/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

admin.initializeApp();
sgMail.setApiKey(functions.config().sendgrid.key);
exports.sendEmail = functions.firestore
	.document("form/{docId}")
	.onCreate((snap, context) => {
		const newValue = snap.data();

		const msg = {
			to: newValue.email,
			cc: "info@raamdeluxe.nl",
			from: "info@raamdeluxe.nl", // Use the email address or domain you verified with SendGrid
			subject: "New Form Submission",
			text: `Hello ${newValue.name}, thank you for your submission. Your estimated price based on the provided width and height is €${newValue.price}.`,
			html: `<p>Hello <strong>${newValue.name}</strong>,<br><br>Thank you for your submission. Your estimated price based on the provided width and height is <strong>€${newValue.price}</strong>.<br><br>Best regards,<br>Raamdeluxe</p>`,
		};

		return sgMail.send(msg);
	});
