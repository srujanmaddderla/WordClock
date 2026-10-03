import { useEffect, useState } from 'react';
import { getZonedParts } from './clock';

/**
 * Ticks once per second and returns the current hour/minute/second plus a
 * formatted date label, all computed in the given IANA timezone.
 */
export function useZonedTime(timeZone) {
  const [parts, setParts] = useState(() => getZonedParts(timeZone));

  useEffect(() => {
    setParts(getZonedParts(timeZone));
    const id = setInterval(() => setParts(getZonedParts(timeZone)), 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return parts;
}
