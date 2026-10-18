// ML/CS Academic Job Market Auto-Tracker
// Paste into Extensions > Apps Script in your Google Sheet.
// Run setupTrigger() once — then updateJobs() fires every morning at 7 AM UTC.

const FEEDS = [
  "https://www.mathjobs.org/jobs/jobs_rss.cgi?keywords=machine+learning",
  "https://www.mathjobs.org/jobs/jobs_rss.cgi?keywords=computer+vision",
  "https://www.mathjobs.org/jobs/jobs_rss.cgi?keywords=natural+language+processing",
  "https://www.mathjobs.org/jobs/jobs_rss.cgi?keywords=artificial+intelligence",
];

// AcademicJobsOnline fallback (uncomment if mathjobs feeds are empty)
// const AJO_SEARCH = "https://academicjobsonline.org/ajo/jobs?field=21&type=1&format=rss";

function updateJobs() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const board = ss.getSheetByName("Job Board");
  if (!board) { Logger.log("Sheet 'Job Board' not found."); return; }

  const existing = getExistingUrls_(board);
  const today = Utilities.formatDate(new Date(), "UTC", "yyyy-MM-dd");
  let added = 0;

  for (const url of FEEDS) {
    try {
      const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
      if (response.getResponseCode() !== 200) {
        Logger.log("Feed returned " + response.getResponseCode() + ": " + url);
        continue;
      }
      const jobs = parseRss_(response.getContentText());
      for (const job of jobs) {
        if (!existing.has(job.url)) {
          board.appendRow([today, job.title, job.institution, job.deadline, job.url, "New", ""]);
          existing.add(job.url);
          added++;
        }
      }
    } catch (e) {
      Logger.log("Feed error: " + url + " — " + e.message);
    }
  }

  Logger.log("updateJobs: " + added + " new positions added on " + today);
}

function getExistingUrls_(sheet) {
  const data = sheet.getDataRange().getValues();
  const urls = new Set();
  for (let i = 1; i < data.length; i++) {
    if (data[i][4]) urls.add(String(data[i][4]));
  }
  return urls;
}

function parseRss_(xml) {
  try {
    const doc = XmlService.parse(xml);
    const channel = doc.getRootElement().getChild("channel");
    if (!channel) return [];
    return channel.getChildren("item").map(item => ({
      title: item.getChildText("title") || "",
      institution: extractInstitution_(item.getChildText("title") || ""),
      deadline: extractDeadline_(item.getChildText("description") || ""),
      url: item.getChildText("link") || "",
    }));
  } catch (e) {
    Logger.log("RSS parse error: " + e.message);
    return [];
  }
}

function extractInstitution_(title) {
  // mathjobs format: "University Name - Position Title"
  const dash = title.indexOf(" - ");
  return dash > 0 ? title.slice(0, dash).trim() : title;
}

function extractDeadline_(description) {
  const m = description.match(
    /\b(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{1,2},?\s+\d{4}/i
  );
  return m ? m[0] : "See listing";
}

// Run this function ONCE from the Apps Script editor to set up the daily trigger.
function setupTrigger() {
  // Remove any existing triggers for updateJobs to avoid duplicates
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === "updateJobs")
    .forEach(t => ScriptApp.deleteTrigger(t));

  ScriptApp.newTrigger("updateJobs")
    .timeBased()
    .everyDays(1)
    .atHour(7)  // 7 AM UTC
    .create();

  Logger.log("Daily trigger set: updateJobs runs every day at 7 AM UTC.");
}

// Manual run: call this to fetch jobs right now without waiting for the trigger.
function runNow() {
  updateJobs();
}
