const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

const mangaRoutes = require("./routes/mangaRoutes");
const userCollectionRoutes = require("./routes/userCollectionRoutes");
const authRoutes = require("./routes/authRoutes");
app.use("/manga", mangaRoutes);
app.use("/usercollection", userCollectionRoutes);
app.use("/auth", authRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on Http://localhost:${PORT}`);
});
