const admin = require("firebase-admin");

let firebaseKey;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // Load from Heroku env var (stringified JSON with escaped newlines)
  firebaseKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  firebaseKey.private_key = firebaseKey.private_key.replace(/\\n/g, "\n");
} else {
  // Load locally from file (fallback)
  const path = require("path");
  firebaseKey = require(path.resolve(
    __dirname,
    "../../FIREBASE_SERVICE_KEY.json"
  ));
}

try {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseKey),
  });
} catch (error) {
  console.error("Firebase initialization error:", error);
}

module.exports = admin;
