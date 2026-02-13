const teamSkills = [
  "Data Entry",
  "Internet Research",
  "Leads",
  "Customer Service",
  "Web Search",
  "Virtual Assistant",
  "Data Processing",
  "Web Scraping",
  "Linkedin",
  "Customer Support",
  "Data Mining",
  "Email Marketing",
  "LinkedIn Recruiting",
  "Lead Generation",
  "Email Handling",
  "Administrative Support",
  "Transcription",
  "Human Resources",
  "Data Scraping",
  "Interviewing",
  "B2B Marketing",
  "Apollo",
  "Chat Operation",
  "Video Upload",
  "DNS",
  "Helpdesk",
  "Data Cleansing",
  "Talent Acquisition",
  "Customer Experience",
  "Contact Center Services",
  "Data Collection",
  "Email Campaign",
  "ChatGPT",
  "Generative AI",
  "Data Annotating",
];

function matchJobs(jobs) {
  return jobs.filter((job) =>
    job.skills.some((skill) => teamSkills.includes(skill)),
  );
}

module.exports = matchJobs;
