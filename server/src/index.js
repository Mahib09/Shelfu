const cors = require("cors");
const createServer = require("./utils/server");

const app = createServer();
app.use(cors());

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on Http://localhost:${PORT}`);
});
