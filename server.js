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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running → ${PORT}`);
});


module.exports = setAlerts;
