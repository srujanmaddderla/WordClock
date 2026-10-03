import ct from 'countries-and-timezones';
import { getCurrentOffset } from './clock.js';

function cityLabel(zoneId) {
  const parts = zoneId.split('/');
  return parts[parts.length - 1].replace(/_/g, ' ');
}

/**
 * Builds a list of countries, each with their timezones, sorted alphabetically.
 * Every entry carries a ready-to-display label and the real-time (DST-aware)
 * UTC offset, not just the zone's static standard-time offset.
 */
export function buildTimezoneGroups() {
  const countries = ct.getAllCountries();
  const timezones = ct.getAllTimezones();

  const groups = Object.values(countries)
    .map((country) => {
      const zones = (country.timezones || [])
        .map((zoneId) => timezones[zoneId])
        .filter(Boolean)
        .map((zone) => ({
          id: zone.name,
          city: cityLabel(zone.name),
          offsetMinutes: zone.utcOffset,
          offsetStr: getCurrentOffset(zone.name),
        }))
        .sort((a, b) => a.offsetMinutes - b.offsetMinutes || a.city.localeCompare(b.city));

      return {
        code: country.id,
        name: country.name,
        zones,
      };
    })
    .filter((group) => group.zones.length > 0)
    .sort((a, b) => a.name.localeCompare(b.name));

  return groups;
}

export function getZoneInfo(zoneId) {
  const zone = ct.getTimezone(zoneId);
  if (!zone) return null;
  const countryCode = zone.countries?.[0];
  const country = countryCode ? ct.getCountry(countryCode) : null;
  return {
    id: zone.name,
    city: cityLabel(zone.name),
    offsetStr: getCurrentOffset(zone.name),
    countryName: country?.name ?? null,
    countryCode: countryCode ?? null,
  };
}

export function guessLocalTimezone() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const zone = tz && ct.getTimezone(tz);
    if (zone) return zone.aliasOf ?? zone.name;
  } catch {
    // ignore, fall through to default
  }
  return 'America/New_York';
}
