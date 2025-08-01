const admin = require("../services/firebaseService");
const prisma = require("../services/prismaService");
const { serialize } = require("cookie");

const signUp = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const firebaseId = decodedToken.uid;
    const email = decodedToken.email;
    const name = decodedToken.name || "";

    // Check if user already exists in your DB
    let user = await prisma.users.findUnique({
      where: { firebaseUId: firebaseId },
    });

    if (user) {
      return res
        .status(200)
        .json({ success: true, message: "User already registered", user });
    }

    // Create new user in DB
    user = await prisma.users.create({
      data: {
        firebaseUId: firebaseId,
        email: email,
        name: name,
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "User signed up successfully", user });
  } catch (error) {
    console.error("Sign-up error:", error);

    if (error.code === "auth/email-already-exists") {
      return res.status(400).json({ message: "Email is already in use" });
    } else if (error.code === "auth/weak-password") {
      return res.status(400).json({ message: "Password is too weak" });
    } else if (error.code === "P2002") {
      return res
        .status(400)
        .json({ message: "User already exists in the database" });
    }

    return res.status(500).json({ message: "Error creating user" });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = req.user;
    const profile = await prisma.users.findUnique({
      where: { firebaseUId: user.uid },
    });

    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ profile, user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signUp, getProfile };
