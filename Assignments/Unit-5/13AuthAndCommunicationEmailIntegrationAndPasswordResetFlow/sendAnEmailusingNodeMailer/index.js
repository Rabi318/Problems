const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

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

app.get("/sendmail", async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_SERVICE_SEND_FROM,
      to: `rabinarayansahoo9658@gmail.com, venugopal.burli@masaischool.com`,
      subject: "Test Email from NEM Student",
      text: "This is a testing Mail sent by NEM student, no need to reply.",
    });
    console.log("Email Send: ", info.messageId);
    res.send("Email send successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
