const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on Http://localhost:${PORT}`);
});
