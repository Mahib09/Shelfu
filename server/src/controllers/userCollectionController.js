const prisma = require("../services/prismaService");

const addMangatoUserCollection = async (req, res) => {
  try {
    const { userId, isbn, status, notes, volumeInfo } = req.body;

    // Validate required fields
    if (userId === "" || isbn === "" || status === "") {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let volume = await prisma.volumes.findUnique({
      where: { booksApiId: volumeInfo.isbn },
    });

    if (!volume && volumeInfo) {
      volume = await prisma.volumes.create({
        data: {
          volumeNumber: volumeInfo.volumeNumber,
          seriesName: volumeInfo.title,
          author: Array.isArray(volumeInfo.authors)
            ? volumeInfo.authors[0]
            : volumeInfo.authors || "",
          booksApiId: volumeInfo.isbn,
          description: volumeInfo.description,
          publisher: volumeInfo.publisher,
          isbn: volumeInfo.isbn,
          releaseDate: volumeInfo.releaseDate,
          coverImageUrl: volumeInfo.image,
        },
      });
    }
    if (!volume && !volumeInfo) {
      console.log("400");
      return res
        .status(400)
        .json({ message: "Volume does not exist and volumeInfo is required" });
    }
    const createRecord = await prisma.userCollection.create({
      data: {
        userId: userId,
        volumeId: volume.volumeId,
        status: status,
        notes: notes,
      },
    });

    return res.status(201).json({ success: true, createRecord });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserCollection = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await prisma.users.findUnique({
      where: {
        firebaseUId: userId, // Use Firebase UID for the query
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userCollectionData = await prisma.userCollection.findMany({
      where: {
        userId: user.userId,
      },
      include: {
        volume: true,
      },
    });

    if (userCollectionData.length === 0) {
      return res
        .status(200)
        .json({ message: "No collection data found.", data: [] });
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
