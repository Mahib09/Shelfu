const express = require("express");
const routes = require("./routes");
function createServer() {
  const app = express();
  app.use(express.json());
  routes(app);
  return app;
}

module.exports = createServer;
