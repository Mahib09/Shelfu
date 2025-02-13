const routes = (app) => {
  const mangaRoutes = require("../routes/mangaRoutes");
  const userCollectionRoutes = require("../routes/userCollectionRoutes");
  const authRoutes = require("../routes/authRoutes");
  app.use("/manga", mangaRoutes);
  app.use("/usercollection", userCollectionRoutes);
  app.use("/auth", authRoutes);
};

module.exports = routes;
