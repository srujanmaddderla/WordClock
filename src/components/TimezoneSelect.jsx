export default function TimezoneSelect({ groups, value, onChange }) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-white/10 bg-panel px-4 py-3 pr-10
                   text-sm text-gray-100 shadow-inner outline-none transition-colors
                   focus:border-accent/60 focus:ring-1 focus:ring-accent/40 cursor-pointer"
        aria-label="Select country and timezone"
      >
        {groups.map((group) => (
          <optgroup key={group.code} label={group.name}>
            {group.zones.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {group.name} — {zone.city} ({zone.offsetStr})
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
