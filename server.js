const express = require("express");
const cors = require("cors");

const app = express();

// CORS Fix
app.use(
  cors({
    origin: "*", // allow all domains
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  })
);

let alertJobs = [];

app.get("/alerts", (req, res) => {
  res.json(alertJobs);
});

function setAlerts(jobs) {
  alertJobs = jobs;
}

app.listen(5000, () => {
  console.log("Server running...");
});

module.exports = setAlerts;
