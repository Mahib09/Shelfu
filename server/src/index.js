const cors = require("cors");
const createServer = require("./utils/server");
const setupRedis = require("./utils/redis");

const app = createServer();
const corsOptions = {
  origin: ["http://localhost:3000", "https://shelfu.vercel.app"], // Allow your frontend to make requests
  credentials: true, // Allow credentials (cookies, etc.)
  methods: ["GET", "POST", "PATCH", "DELETE"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors());

const client = setupRedis();
app.locals.redis = client;

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
