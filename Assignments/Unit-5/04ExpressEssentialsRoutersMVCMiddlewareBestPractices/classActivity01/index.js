const express = require("express");
const courseRouter = require("./routes/course.routes");
const logBaseRoutesFromFiles = require("./utils/logBaseRoutes");
const path = require("path");
const app = express();
const PORT = 3000;

//index.js is responsible for the listering the server and handling the routes

app.use(express.json());
app.use("/courses", courseRouter);

app.listen(PORT, () => {
  console.log("Server listening on port 😎 ", PORT);
  logBaseRoutesFromFiles(path.join(__dirname, "routes"), PORT);
});
