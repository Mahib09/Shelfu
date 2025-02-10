const express = require("express");

const app = express();

app.use(express.json());

const mangaRoutes = require("./routes/mangaRoutes");
const userCollectionRoutes = require("./routes/userCollectionRoutes");
const authRoutes = require("./routes/authRoutes");
app.use("/manga", mangaRoutes);
app.use("/usercollection", userCollectionRoutes);
app.use("/auth", authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on Http://localhost:${PORT}`);
});
