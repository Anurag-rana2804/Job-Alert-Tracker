const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let alertJobs = [];

// API Route
app.get("/alerts", (req, res) => {
  res.json(alertJobs);
});

// Function to update alerts
function setAlerts(jobs) {
  alertJobs = jobs;
}

// Dynamic Railway Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});

module.exports = setAlerts;
