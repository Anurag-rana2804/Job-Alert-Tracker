const puppeteer = require("puppeteer");
const chromium = require("chrome-aws-lambda");

async function scrapeJobs() {
  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath:
        await chromium.executablePath,
      headless: chromium.headless
    });

    const page = await browser.newPage();

    await page.goto(
      "https://www.freelancer.com/jobs",
      {
        waitUntil: "domcontentloaded",
        timeout: 60000
      }
    );

    await page.waitForSelector(
      ".JobSearchCard-item"
    );

    const jobs = await page.evaluate(() => {
      const jobCards =
        document.querySelectorAll(
          ".JobSearchCard-item"
        );

      return Array.from(jobCards).map(
        job => {
          const titleEl =
            job.querySelector(
              ".JobSearchCard-primary-heading a"
            );

          const budgetEl =
            job.querySelector(
              ".JobSearchCard-secondary-price"
            );

          const skillsEl =
            job.querySelectorAll(
              ".JobSearchCard-primary-tags a"
            );

          return {
            title: titleEl
              ? titleEl.innerText
              : "No Title",

            link: titleEl
              ? "https://www.freelancer.com" +
                titleEl.getAttribute("href")
              : "No Link",

            budget: budgetEl
              ? budgetEl.innerText
              : "Not Mentioned",

            skills: skillsEl
              ? Array.from(skillsEl).map(
                  s => s.innerText
                )
              : [],

            postedTime:
              new Date().toISOString()
          };
        }
      );
    });

    await browser.close();
    return jobs;

  } catch (err) {
    console.log(
      "Scraper Error:",
      err.message
    );
    return [];
  }
}

module.exports = scrapeJobs;
