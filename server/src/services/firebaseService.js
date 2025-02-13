const admin = require("firebase-admin");
require("dotenv").config(); // To load environment variables (if necessary)
const firebasekey = require("../../FIREBASE_SERVICE_KEY.json"); // Path to your Firebase service account key

// Initialize Firebase Admin SDK
console.log("Initializing Firebase Admin SDK..."); // Log initialization step

try {
  admin.initializeApp({
    credential: admin.credential.cert(firebasekey),
  });
  console.log("Firebase Admin SDK Initialized Successfully."); // Log success
} catch (error) {
  console.error("Error initializing Firebase Admin SDK:", error); // Log error
}

module.exports = admin;
