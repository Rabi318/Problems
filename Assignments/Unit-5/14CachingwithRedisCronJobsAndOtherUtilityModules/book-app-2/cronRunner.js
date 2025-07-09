const cron = require("node-cron");
const reportEmailJob = require("./cron/reportEmailJob");

// Run every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  console.log("Running report email cron job...");
  await reportEmailJob();
});
