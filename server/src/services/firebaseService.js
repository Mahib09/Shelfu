const admin = require("firebase-admin");

let firebaseKey;

if (process.env.FIREBASE_SERVICE_KEY) {
  firebaseKey = JSON.parse(process.env.FIREBASE_SERVICE_KEY);
  firebaseKey.private_key = firebaseKey.private_key.replace(/\\n/g, "\n");
} else if (process.env.NODE_ENV !== "production") {
  // Only load local file in development, not on Heroku
  const path = require("path");
  firebaseKey = require(path.resolve(
    __dirname,
    "../../FIREBASE_SERVICE_KEY.json"
  ));
} else {
  throw new Error("Firebase service key is not set.");
}

try {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseKey),
  });
} catch (error) {
  console.error("Firebase initialization error:", error);
}

module.exports = admin;
