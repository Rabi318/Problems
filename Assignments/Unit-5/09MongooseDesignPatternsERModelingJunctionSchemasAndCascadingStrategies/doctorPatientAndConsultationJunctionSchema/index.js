const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./configs/db");

const app = express();

app.use(express.json());

dotenv.config();
connectDB();

app.use("/doctors", require("./routes/doctorRoutes"));
app.use("/patients", require("./routes/patientRoutes"));
app.use("/consultations", require("./routes/consultationRoutes"));
app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT} 😎😎`);
});
