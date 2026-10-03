/**
 * Pure (non-React) helpers for reading the current time in a given IANA
 * timezone. Shared between the frontend hook and the serverless API so the
 * two never drift apart.
 */
export function getZonedParts(timeZone) {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hourCycle: 'h23',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'longOffset',
  });

  const parts = Object.fromEntries(
    formatter.formatToParts(now).map((p) => [p.type, p.value])
  );

  // "GMT+05:30" / "GMT-04:00" / "GMT" (zero offset) -> "UTC+05:30" etc.
  const offsetStr = parts.timeZoneName && parts.timeZoneName !== 'GMT'
    ? parts.timeZoneName.replace('GMT', 'UTC')
    : 'UTC+00:00';

  return {
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second),
    weekday: parts.weekday,
    dateLabel: `${parts.weekday}, ${parts.day} ${parts.month} ${parts.year}`,
    offsetStr,
  };
}

/**
 * Current real-time UTC offset for a timezone (DST-aware), formatted as
 * "UTC+05:30". Cheaper than getZonedParts when only the offset is needed.
 */
export function getCurrentOffset(timeZone) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'longOffset',
  });
  const part = formatter.formatToParts(new Date()).find((p) => p.type === 'timeZoneName');
  if (!part || part.value === 'GMT') return 'UTC+00:00';
  return part.value.replace('GMT', 'UTC');
}
