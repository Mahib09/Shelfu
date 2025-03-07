const { createClient } = require("redis");

async function setupRedis() {
  const client = createClient();

  client.on("error", (err) => console.error("Redis Client Error:", err));

  try {
    await client.connect();
    console.log("Connected to Redis ✅");
  } catch (error) {
    console.error("Failed to connect to Redis ❌", error);
  }

  return client;
}

module.exports = setupRedis;
