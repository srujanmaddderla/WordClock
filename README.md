# World Word Clock

A single-page app that shows the current time, spelled out in words, for any
country and timezone in the world — alongside the current time in India.

- Pick any country/timezone from the dropdown (grouped by country, ~250
  countries, ~340 IANA timezones).
- Both panels update live, once per second.
- Time-in-words is rounded to the nearest 5 minutes (e.g. "Ten Past Ten",
  "Quarter To Six", "Half Past Five", "Midnight", "Noon").
- UTC offsets are computed in real time, so they're correct through daylight
  saving transitions.

## Public API

No key required. Returns JSON.

```
GET /api/time?tz=<IANA timezone>
```

Examples:

```
GET /api/time?tz=Asia/Kolkata
GET /api/time?tz=America/New_York
```

Omitting `tz` defaults to UTC. Response:

```json
{
  "timezone": "Asia/Kolkata",
  "country": "India",
  "city": "Kolkata",
  "utcOffset": "UTC+05:30",
  "date": "Saturday, 3 October 2026",
  "time24": "19:45:18",
  "time12": "07:45:18 PM",
  "phrase": "Quarter To Eight"
}
```

## Development

```bash
npm install
npm run dev
```

## Stack

React + Vite + Tailwind CSS + Framer Motion, with a Vercel serverless
function (`api/time.js`) sharing its time-computation logic with the
frontend (`src/lib/clock.js`, `src/lib/timezones.js`, `src/lib/wordClock.js`).
