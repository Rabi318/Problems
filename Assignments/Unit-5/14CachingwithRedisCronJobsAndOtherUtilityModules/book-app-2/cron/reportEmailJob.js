const {
  getAllStatusKeys,
  getStatusByKey,
  deleteStatusByKey,
} = require("../services/redisService");
const { generateReportPDF } = require("../services/pdfService");
const { sendEmailWithAttachment } = require("../services/emailService");
const { log } = require("../utils/logger");

const runReportCron = async () => {
  const keys = await getAllStatusKeys();

  for (const key of keys) {
    const status = await getStatusByKey(key);
    const filePath = await generateReportPDF(status);

    try {
      await sendEmailWithAttachment(status.email, filePath);
      await deleteStatusByKey(key);
      log(`Report sent and deleted for user ${status.userId}`);
    } catch (err) {
      log(`Failed to send report to ${status.email}: ${err.message}`);
    }
  }
};

module.exports = runReportCron;
