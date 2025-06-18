const express = require("express");
const logger = require("./eventLogger");
const delayMessage = require("./delay");

const app = express();
const PORT = 3000;

// /test route
app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

// /emit route
app.get("/emit", (req, res) => {
  const { message } = req.query;

  if (!message) {
    return res
      .status(400)
      .json({ error: 'Query parameter "message" is required.' });
  }

  const timestamp = new Date().toISOString();
  logger.emit("log", message);

  res.json({
    status: "Event logged",
    timestamp: timestamp,
  });
});

// /delay route
app.get("/delay", async (req, res) => {
  const { message, time } = req.query;

  try {
    const delayedMessage = await delayMessage(message, time);
    res.json({
      message: delayedMessage,
      delay: `${time}ms`,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} 😎😎`);
});
