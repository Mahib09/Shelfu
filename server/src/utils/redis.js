const { Redis } = require("@upstash/redis");

function setupRedis() {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  // No need to connect manually — it uses HTTP requests.

  return redis;
}

module.exports = setupRedis;
