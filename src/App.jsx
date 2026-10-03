import { useMemo, useState } from 'react';
import ClockPanel from './components/ClockPanel';
import TimezoneSelect from './components/TimezoneSelect';
import { buildTimezoneGroups, getZoneInfo, guessLocalTimezone } from './lib/timezones';

const IST_ZONE = 'Asia/Kolkata';

function App() {
  const groups = useMemo(() => buildTimezoneGroups(), []);
  const [selectedZone, setSelectedZone] = useState(() => {
    const guess = guessLocalTimezone();
    return guess === IST_ZONE ? 'America/New_York' : guess;
  });

  const selectedInfo = useMemo(() => getZoneInfo(selectedZone), [selectedZone]);
  const istInfo = useMemo(() => getZoneInfo(IST_ZONE), []);

  return (
    <div className="min-h-screen w-full bg-ink">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-20">
        <header className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.35em] text-gray-500">World Clock</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl text-white">
            Time, spelled out.
          </h1>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Pick any country and timezone to see what time it is there right now —
            in words — alongside the current time in India.
          </p>
        </header>

        <div className="mb-10 max-w-md mx-auto">
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 text-center">
            Select Country &amp; Timezone
          </label>
          <TimezoneSelect groups={groups} value={selectedZone} onChange={setSelectedZone} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <ClockPanel
            title="India Standard Time"
            subtitle={`${istInfo.countryName} — ${istInfo.city}`}
            timeZone={IST_ZONE}
            offsetStr={istInfo.offsetStr}
            accent
          />
          <ClockPanel
            title="Selected Timezone"
            subtitle={`${selectedInfo.countryName} — ${selectedInfo.city}`}
            timeZone={selectedZone}
            offsetStr={selectedInfo.offsetStr}
          />
        </div>

        <section className="mt-16 mx-auto max-w-xl rounded-xl border border-white/10 bg-panel/50 p-5 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gray-500 mb-2">Public API</p>
          <p className="text-sm text-gray-400 mb-3">
            Get the same data as JSON for any timezone — no key required.
          </p>
          <code className="block rounded-lg bg-ink px-4 py-3 text-xs sm:text-sm text-accent/90 overflow-x-auto">
            GET /api/time?tz={selectedZone}
          </code>
        </section>

        <footer className="mt-10 text-center text-xs text-gray-600">
          Updates live, every second · Times rounded to the nearest 5 minutes in word form
        </footer>
      </div>
    </div>
  );
}

export default App;
