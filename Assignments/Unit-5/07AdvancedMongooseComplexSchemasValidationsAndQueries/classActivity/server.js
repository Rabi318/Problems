const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = 3000;

connectDB();
app.use(express.json());

app.use("/user", require("./routes/userRouter"));
app.use("/order", require("./routes/orderRouter"));

app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} 😎😎`);
});
