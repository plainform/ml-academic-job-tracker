# ML/CS Academic Job Market Auto-Tracker

Google Sheets + Apps Script template that auto-updates your faculty/postdoc job board from mathjobs.org every morning.

Built by a NeurIPS 2026 ML researcher on the job market this cycle.

## What it does

Every morning at 7 AM UTC, the script fetches new listings from mathjobs.org matching your keywords (machine learning, computer vision, NLP, or any keyword you set) and appends them to a Google Sheet — deduplicating by URL so you never see the same position twice.

## Files

| File | Description |
|------|-------------|
| `tracker.gs` | Google Apps Script — paste into Extensions > Apps Script |
| `free-jobs-preview.csv` | 30 example positions (Fall 2025 season) for the free version |
| `applications-template.csv` | Applications tracking tab template |
| `setup-instructions.html` | Step-by-step setup guide (3 steps, under 5 min) |

## Setup

See `setup-instructions.html` for full instructions. In brief:

1. Open your Google Sheet → Extensions > Apps Script → paste `tracker.gs`
2. Run `setupTrigger()` once (authorizes script + sets daily 7 AM trigger)
3. Run `runNow()` to fetch the first batch immediately

## Sheets structure

The template has 3 sheets:
- **Job Board** — auto-populated by the script (Added, Title, Institution, Deadline, URL, Status, Notes)
- **Applications** — manual tracking (Institution, Position, Deadline, Status, materials checklist)
- **Setup** — configuration instructions and keyword reference

## License

MIT — use, modify, adapt freely.
