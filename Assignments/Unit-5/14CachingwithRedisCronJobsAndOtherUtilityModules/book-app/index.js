require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");
require("./jobs/bulkInsertJob"); // starts cron

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);

app.listen(process.env.PORT, () => {
  console.log(`📚 Books API running on http://localhost:${process.env.PORT}`);
});
