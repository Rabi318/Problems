//?ODMS (Drivers that connect database to node) - Object Document Mapping System - No SQL Database

//?ORMS = Object Relational Mapping System - SQL Database

const express = require("express");
const connectDB = require("./classActivity/configs/mongodb.config");

const userRoutes = require("./classActivity/routes/userRoutes");

const app = express();

const PORT = 3000;
app.use(express.json());

connectDB();

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} 😎😎`);
});
