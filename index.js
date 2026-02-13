const fs = require("fs");
const scrapeJobs = require("./scraper");
const matchJobs = require("./matcher");
const sendTelegram = require("./telegram");
const setAlerts = require("./server");
const cron = require("node-cron");

let seenJobs = [];

if (fs.existsSync("seenJobs.json")) {
  seenJobs = JSON.parse(
    fs.readFileSync("seenJobs.json")
  );
}

async function runSystem() {
  console.log("Checking jobs...");

  const jobs = await scrapeJobs();
  const matchedJobs = matchJobs(jobs);

  const newAlerts = [];

  matchedJobs.forEach(job => {
    if (!seenJobs.includes(job.link)) {

      const message = `
🚀 New Job Match

📌 ${job.title}
💰 ${job.budget}
🛠 ${job.skills.join(", ")}

🔗 ${job.link}
`;

      sendTelegram(message);

      seenJobs.push(job.link);
      newAlerts.push(job);

      console.log("New:", job.title);

    } else {
      console.log("Skipped:", job.title);
    }
  });

  fs.writeFileSync(
    "seenJobs.json",
    JSON.stringify(seenJobs, null, 2)
  );

  setAlerts(newAlerts);
}

runSystem();

cron.schedule("*/5 * * * *", () => {
  runSystem();
});
