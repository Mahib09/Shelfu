const admin = require("firebase-admin");
require("dotenv").config(); // Load the environment variables
const firebasekey = require("../../FIREBASE_SERVICE_KEY.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(firebasekey),
});

module.exports = admin;
