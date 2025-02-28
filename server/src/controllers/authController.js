const admin = require("../services/firebaseService");
const prisma = require("../services/prismaService");
const { serialize } = require("cookie");

const signUp = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const firebaseId = decodedToken.uid;
    const email = decodedToken.email;
    const name = decodedToken.name || "";

    let user = await prisma.users.findUnique({
      where: { firebaseUId: firebaseId },
    });

    if (user) {
      return res
        .status(200)
        .json({ success: true, message: "User already registered", user });
    }

    user = await prisma.users.create({
      data: {
        firebaseUId: firebaseId,
        email: email,
        name: name,
      },
    });

    const sessionToken = await admin.auth().createSessionCookie(token, {
      expiresIn: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("token", sessionToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
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

const login = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    const sessionToken = await admin.auth().createSessionCookie(token, {
      expiresIn: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("token", sessionToken, {
      httpOnly: true,
      secure: false, // Set to true in production (HTTPS)
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User Logged In successfully",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in" });
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
const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: false, // Change to `true` in production for HTTPS
    sameSite: "Strict",
    path: "/",
    maxAge: 0, // Expire immediately
  });

  res.status(200).json({ message: "Logged out" });
};

module.exports = { signUp, login, getProfile, logout };
