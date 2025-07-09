const client = require("../config/redisClient");

const saveStatus = async (userId, email, successCount, failCount) => {
  const status = {
    userId,
    email,
    successCount,
    failCount,
    timestamp: new Date().toISOString(),
  };
  await client.set(`bulkStatus:${userId}`, JSON.stringify(status));
};

const getAllStatusKeys = async () => {
  return await client.keys("bulkStatus:*");
};

const getStatusByKey = async (key) => {
  const data = await client.get(key);
  return JSON.parse(data);
};

const deleteStatusByKey = async (key) => {
  await client.del(key);
};

module.exports = {
  saveStatus,
  getAllStatusKeys,
  getStatusByKey,
  deleteStatusByKey,
};
