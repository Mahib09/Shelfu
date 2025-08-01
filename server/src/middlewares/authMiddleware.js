const admin = require("../services/firebaseService"); // Firebase Admin setup

// Firebase Authentication Middleware
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const idToken = authHeader.split(" ")[1];
    // Verify the token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken, true);

    // Attach user information to the request object for further use
    const user = await admin.auth().getUser(decodedToken.uid);
    req.user = user;
    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = verifyToken;
