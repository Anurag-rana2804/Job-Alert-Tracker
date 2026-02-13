const puppeteer = require("puppeteer");

async function scrapeJobs() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  await page.goto("https://www.freelancer.com/jobs", {
    waitUntil: "domcontentloaded",
    timeout: 60000
  });

  await page.waitForSelector(".JobSearchCard-item");

  const jobs = await page.evaluate(() => {
    const jobCards = document.querySelectorAll(".JobSearchCard-item");

    return Array.from(jobCards).map(job => {
      const titleEl = job.querySelector(".JobSearchCard-primary-heading a");
      const budgetEl = job.querySelector(".JobSearchCard-secondary-price");
      const skillsEl = job.querySelectorAll(".JobSearchCard-primary-tags a");

      return {
        title: titleEl ? titleEl.innerText : "No Title",
        link: titleEl
          ? "https://www.freelancer.com" + titleEl.getAttribute("href")
          : "No Link",
        budget: budgetEl ? budgetEl.innerText : "Not Mentioned",
        skills: skillsEl
          ? Array.from(skillsEl).map(s => s.innerText)
          : [],
        postedTime: new Date().toISOString()
      };
    });
  });

  await browser.close();
  return jobs;
}

module.exports = scrapeJobs;
