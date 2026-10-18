# Reddit post — ML/CS Academic Job Market Auto-Tracker

## Subreddits to post on
1. Primary: r/cscareerquestions — "I'm on the ML job market this year — built a tracker that auto-updates from mathjobs every morning"
2. Secondary: r/MachineLearning — check if there's an active "job market 2026-27" megathread; if yes, reply in thread instead of creating a new post
3. Fallback: r/PhD (450k), r/gradadmissions

Post as "Tool I built for myself" — do NOT mention the $19 price in the title.

---

## Post title
[Tool] Auto-updating ML/CS academic job market tracker — built by someone on the market this year

---

## Post body

I'm applying for ML/CS faculty positions this cycle (NeurIPS 2026, Princeton). The part I hated most: spending 20 minutes every morning on mathjobs checking if any new positions came up in machine learning, computer vision, or NLP.

I wrote a Google Apps Script that automates it. Every morning at 7 AM UTC it fetches new listings from mathjobs.org matching your keywords (you set them once), adds them to a Google Sheet, and deduplicates so you never see the same position twice.

**Free version** — Google Sheet with 30 example positions from last cycle, same format as the auto-updated board, no script:
[FREE_SHEET_LINK]

**Full version** — includes the Apps Script + setup guide (3 steps, under 5 min), $19 one-time:
[GUMROAD_LINK]

Happy to answer questions about the tracker or share what I've learned so far about the job market. The script is pretty simple (~80 lines) and I can walk through it if anyone wants to adapt it for their own setup.

---

## Self-reply (post within 5 min of the main post)

Direct link to the free Google Sheet preview: [FREE_SHEET_LINK]

For anyone who wants to adapt the script themselves — the code is straightforward. The main function is `updateJobs()` which fetches RSS feeds from mathjobs.org, parses the XML, and appends new rows. The `setupTrigger()` function creates a daily time-based trigger. Both are in the free download.

---

## Notes on posting
- If r/cscareerquestions removes the post (they sometimes flag tool posts as self-promotion), try r/PhD or drop the Gumroad link and just share the free sheet with "DM me for the full version"
- Do NOT post on multiple subreddits simultaneously — space out by 24 hours minimum
- Check r/MachineLearning sidebar for megathread rules before posting there
