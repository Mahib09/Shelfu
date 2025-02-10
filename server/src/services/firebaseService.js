const admin = require("firebase-admin");
require("dotenv").config(); // Load the environment variables

// Parse the Firebase service key from the environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_KEY);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

module.exports = admin;
