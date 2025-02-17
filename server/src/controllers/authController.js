const admin = require("../services/firebaseService");
const prisma = require("../services/prismaService");

const signUp = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    const firebaseId = decodedToken.uid;
    const email = decodedToken.email;
    const name = decodedToken.name || "";

    let user = await prisma.users.findUnique({
      where: {
        firebaseId: firebaseId,
      },
    });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    user = await prisma.users.create({
      data: {
        firebaseId: firebaseId,
        email: email,
        name: name,
      },
    });

    res.cookie("token", token, {
      httpOnly: true, // Can't be accessed via JavaScript (for security)
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // Token expires after 7 days (7 days in milliseconds)
    });

    res
      .status(200)
      .json({ success: true, message: "User logged in successfully" });
  } catch (error) {
    console.error("Sign-up error:", error);

    // Firebase-specific error handling
    if (error.code === "auth/email-already-exists") {
      return res.status(400).json({ message: "Email is already in use" });
    } else if (error.code === "auth/weak-password") {
      return res.status(400).json({ message: "Password is too weak" });
    }

    res.status(500).json({ message: "Error creating user" });
  }
};
const login = async () => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

  res.cookie("token", token, {
    httpOnly: true, // Can't be accessed via JavaScript (for security)
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // Token expires after 7 days (7 days in milliseconds)
  });

  res
    .status(200)
    .json({ success: true, message: "User logged in successfully" });
};
const getProfile = async (req, res) => {
  try {
    const { firebaseId } = req.user;
    const user = await admin.auth().getUser(firebaseId);

    res.status(200).json({ userProfile: user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error retrieving user profile" });
  }
};

module.exports = { signUp, login, getProfile };
