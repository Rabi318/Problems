const cron = require("node-cron");
const redis = require("../utils/redisClient");
const { books, users } = require("../db/data");

const getBulkKey = (userId) => `bulkBooks:${userId}`;
const getCacheKey = (userId) => `books:${userId}`;

cron.schedule("*/2 * * * *", async () => {
  console.log("🔄 Cron Job Running...");
  for (const user of users) {
    const key = getBulkKey(user.id);
    const data = await redis.get(key);
    if (!data) continue;

    const toInsert = JSON.parse(data).map((b) => ({
      id: Date.now().toString() + Math.random(),
      title: b.title,
      author: b.author,
      userId: user.id,
    }));

    books.push(...toInsert);
    await redis.del(key); // remove pending bulk
    await redis.del(getCacheKey(user.id)); // invalidate cache
    console.log(`✅ Inserted ${toInsert.length} books for ${user.username}`);
  }
});
