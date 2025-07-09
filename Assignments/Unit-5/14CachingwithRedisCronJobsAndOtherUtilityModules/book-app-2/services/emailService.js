const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: process.env.EMAIL_SERVICE_PROVIDER,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVICE_AUTH_EMAIL,
    pass: process.env.EMAIL_SERVICE_AUTH_PASS,
  },
});

const sendEmailWithAttachment = async (to, filePath) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_SERVICE_SEND_FROM,
    to,

    text: "Please find attached the PDF report of your bulk book upload.",
    attachments: [{ filename: "report.pdf", path: filePath }],
  });
  return info.messageId;
};

module.exports = { sendEmailWithAttachment };
