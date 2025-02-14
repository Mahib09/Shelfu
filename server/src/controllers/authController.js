const admin = require("../services/firebaseService");
const prisma = require("../services/prismaService");

const signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const userRecord = await admin.auth.createUser({
      email,
      password,
    });

    const newUser = await prisma.users.create({
      data: {
        email: userRecord.email,
      },
    });

    res
      .status(201)
      .json({ message: "User created successfully", userId: newUser.userId });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email and Password Required" });
  }
  try {
    const userRecord = await admin.auth.getUserByEmail(email);
    if (!userRecord) {
      return res.status(400).json({ message: "User Not Found" });
    }
    const token = await admin.auth.createCustomToken(userRecord.uid);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ message: "Error logging in", error: error.message });
  }
};

module.exports = { signUp, login };
