const express = require("express");
const os = require("os");
const dns = require("dns");
const readFileContent = require("./read");

const app = express();
const PORT = 3000;

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});
app.get("/readfile", (req, res) => {
  readFileContent((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

app.get("/systemdetails", (req, res) => {
  const cpus = os.cpus();
  const details = {
    platform: os.platform(),
    totalMemory: `${(os.totalmem() / 1024 ** 3).toFixed(2)} GB`,
    freeMemory: `${(os.freemem() / 1024 ** 3).toFixed(2)} GB`,
    cpuModel: cpus.length ? cpus[0].model : "Unknown",
  };
  res.json(details);
});

app.get("/getip", (req, res) => {
  const hostname = "masaischool.com";
  dns.lookup(hostname, (err, address) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ hostname, ip: address });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} 😎😎`);
});
