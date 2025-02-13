const admin = require("../services/firebaseService"); // Firebase Admin setup

// Firebase Authentication Middleware
const verifyToken = async (req, res, next) => {
  try {
    // Get the token from the Authorization header (e.g., "Bearer <token>")
    const token = req.headers.authorization?.split("Bearer ")[1];

    // If no token is found, return 401 Unauthorized
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token using Firebase Admin SDK
    const decodedToken = await admin.auth.verifyIdToken(token);

    // Attach user information to the request object for further use
    req.user = decodedToken; // This contains UID, email, etc.

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = verifyToken;
