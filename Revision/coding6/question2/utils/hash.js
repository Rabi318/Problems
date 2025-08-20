const bcrypt = require("bcryptjs");

const hashData = async (data) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(data, salt);
};

const compareData = async (data, hashed) => {
  return await bcrypt.compare(data, hashed);
};

module.exports = { hashData, compareData };
