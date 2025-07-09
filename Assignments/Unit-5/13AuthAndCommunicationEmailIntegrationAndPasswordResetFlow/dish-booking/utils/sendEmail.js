const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
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
  return transporter.sendMail({
    from: process.env.EMAIL_SERVICE_SEND_FROM,
    to,
    subject,
    text,
  });
};

module.exports = sendEmail;
