const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
function createServer() {
  const app = express();
  app.use(express.json());
  const corsOptions = {
    origin: "http://localhost:3000", // Allow your frontend to make requests
    credentials: true, // Allow credentials (cookies, etc.)
    methods: ["GET", "POST", "PATCH", "DELETE"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"],
  };

  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.options("*", cors());
  app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin"); // Restrict to same origin
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp"); // Ensure embedded content is same-origin
    next();
  });
  routes(app);
  return app;
}

module.exports = createServer;
