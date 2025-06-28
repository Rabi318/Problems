const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
connectDB();

app.use("/", userRoutes);
app.use("/", bookRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
