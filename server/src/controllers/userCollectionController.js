const { Request, Response } = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addMangatoUserCollection = async (req, res) => {
  try {
    const { userId, volumeId, status, notes } = req.body;

    const createRecord = await prisma.userCollection.create({
      data: {
        userId: userId,
        volumeId: volumeId,
        status: status,
        notes: notes,
      },
    });
    res.status(201).json(createRecord);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addMangatoUserCollection };
