import { getZoneInfo } from '../src/lib/timezones.js';
import { getZonedParts } from '../src/lib/clock.js';
import { timeToWords } from '../src/lib/wordClock.js';

function pad(n) {
  return String(n).padStart(2, '0');
}

/**
 * GET /api/time?tz=<IANA timezone>
 *
 * Returns the current time in the given timezone, spelled out in words,
 * alongside the raw digital time, date, country, and UTC offset.
 *
 * Examples:
 *   /api/time?tz=Asia/Kolkata
 *   /api/time?tz=America/New_York
 *
 * Omitting `tz` defaults to UTC.
 */
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed. Use GET.' });
    return;
  }

  const tzParam = (req.query.tz || 'UTC').toString();
  const info = getZoneInfo(tzParam);

  if (!info) {
    res.status(400).json({
      error: `Unknown timezone "${tzParam}".`,
      hint: 'Pass a valid IANA timezone identifier, e.g. tz=Asia/Kolkata or tz=America/New_York.',
    });
    return;
  }

  let parts;
  try {
    parts = getZonedParts(info.id);
  } catch {
    res.status(400).json({ error: `Could not resolve time for "${tzParam}".` });
    return;
  }

  const { hour, minute, second, dateLabel } = parts;
  const hour12 = ((hour + 11) % 12) + 1;
  const period = hour >= 12 ? 'PM' : 'AM';

  res.status(200).json({
    timezone: info.id,
    country: info.countryName,
    city: info.city,
    utcOffset: info.offsetStr,
    date: dateLabel,
    time24: `${pad(hour)}:${pad(minute)}:${pad(second)}`,
    time12: `${pad(hour12)}:${pad(minute)}:${pad(second)} ${period}`,
    phrase: timeToWords(hour, minute),
  });
}
