const { Request, Response } = require("express");
const prisma = require("../services/prismaService");

const addMangatoUserCollection = async (req, res) => {
  try {
    const { userId, volumeId, status, notes, volumeInfo } = req.body;

    // Validate required fields
    if (userId === "" || volumeId === "" || status === "") {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let volume = await prisma.volumes.findUnique({
      where: { volumeId: volumeId },
    });

    if (!volume && volumeInfo) {
      volume = await prisma.volumes.create({
        data: {
          volumeId: volumeInfo.volumeId,
          volumeNumber: volumeInfo.volumeNumber,
          seriesName: volumeInfo.seriesName,
          author: volumeInfo.author,
          booksApiId: volumeInfo.booksApiId,
          description: volumeInfo.description,
          publisher: volumeInfo.publisher,
          isbn: volumeInfo.isbn,
          releaseDate: volumeInfo.releaseDate,
          coverImage: volumeInfo.coverImage,
        },
      });
    }
    if (!volume && !volumeInfo) {
      return res
        .status(400)
        .json({ message: "Volume does not exist and volumeInfo is required" });
    }
    const createRecord = await prisma.userCollection.create({
      data: {
        userId: userId,
        volumeId: volumeId,
        status: status,
        notes: notes,
      },
    });

    return res.status(201).json(createRecord);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
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
      return res.status(404).json({ message: "No collection data found." });
    }

    return res.status(200).json(userCollectionData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserCollectionBySeries = async (req, res) => {
  const { seriesName, userId } = req.body;
  if (!userId || !seriesName) {
    return res.status(400).json({ message: "Missing required parameters" });
  }
  try {
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
      return res.status(404).json({ message: "No collection data found." });
    }

    res.json(userCollectionData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserCollectionByStatus = async (req, res) => {
  try {
    const { status, userId } = req.body;

    if (!status || !userId) {
      return res.status(400).json({ message: "Missing required parameters" });
    }
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
      return res.status(404).json({ message: "No collection data found." });
    }

    res.status(200).json(collectionByStatus);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCategoryorNotes = async (req, res) => {
  try {
    const { userCollectionId } = req.params;
    const id = parseInt(userCollectionId);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid userCollectionId" });
    }

    const { status, notes } = req.body;

    if (!status && !notes) {
      return res.status(400).json({ message: "No Changes Provided" });
    }

    if (status && !["Owned", "Want_To_Buy", "For_Sale"].includes(status)) {
      return res.status(400).json({ message: "Invalid Status" });
    }

    const updatedData = await prisma.userCollection.update({
      where: { userCollectionId: id },
      data: {
        ...(status && { status }),
        ...(notes && { notes }),
      },
    });

    return res.status(200).json(updatedData);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Volume does not exist" });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteVolume = async (req, res) => {
  try {
    const { userCollectionId } = req.params;
    const id = parseInt(userCollectionId);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid userCollectionId" });
    }

    const deleteData = await prisma.userCollection.delete({
      where: {
        userCollectionId: id,
      },
    });

    return res.status(200).json(deleteData);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Volume does not exist" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
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
