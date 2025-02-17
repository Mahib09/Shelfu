const admin = require("../services/firebaseService");
const prisma = require("../services/prismaService");

const signUp = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check if user already exists in Prisma database
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    const newUser = await prisma.users.create({
      data: {
        name: name,
        email: userRecord.email,
        firebaseUId: userRecord.uid,
      },
    });

    // Send email verification (optional)
    await admin.auth().generateEmailVerificationLink(email);

    res.status(201).json({
      message: "User created successfully. Please verify your email.",
      userId: newUser.userId,
    });
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

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email and Password Required" });
  }
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    if (!userRecord) {
      return res.status(400).json({ message: "User Not Found" });
    }
    const token = await admin.auth().createCustomToken(userRecord.uid);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ message: "Error logging in", error: error.message });
  }
};
const googleSignIn = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: "ID token is required" });
  }

  try {
    // Verify the ID token using Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Check if the user exists in your database (e.g., Prisma)
    const existingUser = await prisma.users.findUnique({
      where: { firebaseUId: uid },
    });

    if (!existingUser) {
      // If the user doesn't exist, create a new user in your database
      const newUser = await prisma.users.create({
        data: {
          firebaseUId: uid,
          email: decodedToken.email,
        },
      });

      res.status(201).json({
        message: "User created successfully",
        userId: newUser.userId,
      });
    } else {
      // If the user exists, just return success
      res.status(200).json({
        message: "User logged in successfully",
        userId: existingUser.userId,
      });
    }
  } catch (error) {
    console.error("Error verifying ID token:", error);
    res
      .status(500)
      .json({ message: "Error verifying ID token", error: error.message });
  }
};
const getProfile = async (req, res) => {
  const userId = req.userId;
  const user = await admin.auth().getUser(userId);
  res.json({ userProfile: user });
};

module.exports = { signUp, login, googleSignIn, getProfile };
