const admin = require("firebase-admin");
const firebasekey = require("../../FIREBASE_SERVICE_KEY.json"); // Path to your Firebase service account key

try {
  admin.initializeApp({
    credential: admin.credential.cert(firebasekey),
  });
} catch (error) {}

module.exports = admin;
