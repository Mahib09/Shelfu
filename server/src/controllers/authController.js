const admin = require("../services/firebaseService");
const prisma = require("../services/prismaService");

const signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create user in Firebase
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Create user in Prisma database
    const newUser = await prisma.users.create({
      data: {
        email: userRecord.email,
      },
    });

    // Return success response
    res
      .status(201)
      .json({ message: "User created successfully", userId: newUser.userId });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating user", error: error.message });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Authenticate user with Firebase
    const userRecord = await admin.auth().getUserByEmail(email);
    // Here you can check password if needed using Firebase client SDK in the frontend

    // Generate Firebase Token (JWT)
    const token = await admin.auth().createCustomToken(userRecord.uid);

    // Send the token as a response
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ message: "Error logging in", error: error.message });
  }
};

module.exports = { signUp, login };
