const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

let alertJobs = [];

app.get("/alerts", (req, res) => {
  res.json(alertJobs);
});

function setAlerts(jobs) {
  alertJobs = jobs;
}

app.listen(5000, () => {
  console.log(
    "Server running → http://localhost:5000"
  );
});

module.exports = setAlerts;
