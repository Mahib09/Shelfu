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

const getUserCollection = async (req, res) => {
  try {
    const { userId } = req.params;
    const Id = parseInt(userId);

    const userCollectionData = await prisma.userCollection.findMany({
      where: {
        userId: Id,
      },
      include: {
        volume: true,
      },
    });

    if (userCollectionData.length === 0) {
      return res.status(200).json({ message: "No collection data found." });
    }

    res.json(userCollectionData);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserCollectionBySeries = async (req, res) => {
  try {
    const { seriesName, userId } = req.params;
    const id = parseInt(userId);

    const userCollectionData = await prisma.userCollection.findMany({
      where: {
        userId: id,
        volume: {
          seriesName: seriesName,
        },
      },
      include: {
        volume: true,
      },
    });
    if (userCollectionData.length === 0) {
      return res.status(200).json({ message: "No collection data found." });
    }

    res.json(userCollectionData);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserCollectionByStatus = async (req, res) => {
  try {
    const { status, userId } = req.params;
    const id = parseInt(userId);
    const collectionByStatus = await prisma.userCollection.findMany({
      where: {
        userId: id,
        status: status,
      },
      include: {
        volume: true,
      },
    });
    if (collectionByStatus.length === 0) {
      return res.status(200).json({ message: "No collection data found." });
    }
    res.json(collectionByStatus);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCategoryorNotes = async (req, res) => {
  try {
    const { userCollectionId } = req.params;
    const id = parseInt(userCollectionId);
    const { status, notes } = req.body;

    if (!["Owned", "Want_To_Buy", "For_Sale"].includes(status)) {
      res.status(400).json({ message: "Invalid Status" });
    }

    const updatedData = await prisma.userCollection.update({
      where: {
        userCollectionId: id,
      },
      data: {
        ...(status && { status: status }),
        ...(notes && { notes: notes }),
      },
    });
    res.status(200).json(updatedData);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteVolume = async (req, res) => {
  try {
    const { userCollectionId } = req.params;
    const id = parseInt(userCollectionId);

    const deleteData = await prisma.userCollection.delete({
      where: {
        userCollectionId: id,
      },
    });
    res.status(200).json(deleteData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addMangatoUserCollection,
  getUserCollection,
  getUserCollectionBySeries,
  getUserCollectionByStatus,
  updateCategoryorNotes,
  deleteVolume,
};
