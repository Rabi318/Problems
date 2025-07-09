const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateReportPDF = async (status) => {
  const doc = new PDFDocument();
  const filePath = path.join(
    __dirname,
    `../../reports/report-${status.userId}.pdf`
  );
  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);
  doc.fontSize(18).text("Bulk Insertion Report", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`User ID: ${status.userId}`);
  doc.text(`Email: ${status.email}`);
  doc.text(`Timestamp: ${status.timestamp}`);
  doc.text(`Successful Insertions: ${status.successCount}`);
  doc.text(`Failed Insertions: ${status.failCount}`);

  doc.end();

  return new Promise((resolve) => {
    stream.on("finish", () => resolve(filePath));
  });
};

module.exports = { generateReportPDF };
