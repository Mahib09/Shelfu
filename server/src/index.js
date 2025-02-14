const cors = require("cors");
const createServer = require("./utils/server");

const app = createServer();
const corsOptions = {
  origin: "http://localhost:3000", // Allow your frontend to make requests
  credentials: true, // Allow credentials (cookies, etc.)
  methods: ["GET", "POST", "PATCH", "DELETE"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors());

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on Http://localhost:${PORT}`);
});
