const HOUR_WORDS = [
  'Twelve', 'One', 'Two', 'Three', 'Four', 'Five', 'Six',
  'Seven', 'Eight', 'Nine', 'Ten', 'Eleven',
];

const MINUTE_WORDS = {
  5: 'Five',
  10: 'Ten',
  15: 'Quarter',
  20: 'Twenty',
  25: 'Twenty Five',
  30: 'Half',
};

/**
 * Converts a 24-hour hour/minute pair into a spelled-out phrase,
 * rounded to the nearest 5 minutes, e.g. "Ten Past Ten", "Quarter To Six".
 */
export function timeToWords(hour24, minute) {
  const roundedMinute = Math.round(minute / 5) * 5;
  let hour = hour24;
  let m = roundedMinute;

  if (m === 60) {
    m = 0;
    hour = (hour + 1) % 24;
  }

  if (m === 0) {
    if (hour === 0) return 'Midnight';
    if (hour === 12) return 'Noon';
    return `${HOUR_WORDS[hour % 12]} O'Clock`;
  }

  if (m <= 30) {
    return `${MINUTE_WORDS[m]} Past ${HOUR_WORDS[hour % 12]}`;
  }

  const remainder = 60 - m;
  const nextHour = (hour + 1) % 24;
  return `${MINUTE_WORDS[remainder]} To ${HOUR_WORDS[nextHour % 12]}`;
}
