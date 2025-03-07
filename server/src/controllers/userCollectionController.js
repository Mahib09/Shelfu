const prisma = require("../services/prismaService");

const addMangatoUserCollection = async (req, res) => {
  try {
    const { userId, isbn, status, notes, volumeInfo } = req.body;
    const redis = req.app.locals.redis;
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
          author: volumeInfo.author[0] || "unknown",
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
    await redis.del(`userCollection:${userId}`);
    return res.status(201).json({ success: true, createRecord });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserCollection = async (req, res) => {
  try {
    const { userId } = req.params;
    const redis = req.app.locals.redis;
    const id = parseInt(userId);

    const cachedCollection = await redis.get(`userCollection:${userId}`);
    if (cachedCollection) {
      return res.status(200).json(JSON.parse(cachedCollection));
    }

    const user = await prisma.users.findUnique({
      where: {
        userId: id, // Use Firebase UID for the query
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

    await redis.set(
      `userCollection:${userId}`,
      JSON.stringify(userCollectionData),
      "EX",
      3600
    );

    return res.status(200).json(userCollectionData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCategoryorNotes = async (req, res) => {
  try {
    const { userCollectionId } = req.params;
    const id = parseInt(userCollectionId);
    const redis = req.app.locals.redis;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid userCollectionId" });
    }

    const { userId, status, notes } = req.body;

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
    await redis.del(`userCollection:${userId}`);
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
    const redis = req.app.locals.redis;
    const { userId } = req.body;
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid userCollectionId" });
    }

    const deleteData = await prisma.userCollection.delete({
      where: {
        userCollectionId: id,
      },
    });
    await redis.del(`userCollection:${userId}`);
    return res.status(200).json(deleteData);
  } catch (error) {
    console.log(error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Volume does not exist" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addMangatoUserCollection,
  getUserCollection,
  updateCategoryorNotes,
  deleteVolume,
};
