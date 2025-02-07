const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const mangaRoutes = require("./routes/mangaRoutes");
const userCollectionRoutes = require("./routes/userCollectionRoutes");
app.use("/manga", mangaRoutes);
app.use("/userCollection", userCollectionRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on Http://localhost:${PORT}`);
});
