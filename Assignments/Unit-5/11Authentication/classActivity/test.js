const corn = require("node-cron");

const job = corn.schedule("*/30 * * * * *", () => {
  console.log("running a task every minute");
});
