const fs = require("fs");
const path = require("path");

function logBaseRoutesFromFiles(routesDir, port) {
  const files = fs.readdirSync(routesDir);

  console.log("\n📌 Registered Base Routes:");

  files.forEach((file) => {
    // Skip non-JS files or files that don't follow *.routes.js
    if (file.endsWith(".routes.js")) {
      const routeBase = file.split(".")[0]; // e.g., "course" from "course.routes.js"
      console.log(`http://localhost:${port}/${routeBase}`);
    }
  });

  console.log();
}

module.exports = logBaseRoutesFromFiles;
