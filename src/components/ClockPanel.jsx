import { motion, AnimatePresence } from 'framer-motion';
import { useZonedTime } from '../lib/useZonedTime';
import { timeToWords } from '../lib/wordClock';

function pad(n) {
  return String(n).padStart(2, '0');
}

export default function ClockPanel({ title, subtitle, timeZone, offsetStr, accent = false }) {
  const { hour, minute, second, dateLabel } = useZonedTime(timeZone);
  const phrase = timeToWords(hour, minute);
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = ((hour + 11) % 12) + 1;

  return (
    <div
      className={`relative flex flex-col justify-between rounded-2xl border p-6 sm:p-8
                  ${accent ? 'border-accent/30 bg-gradient-to-br from-panel to-ink' : 'border-white/10 bg-panel'}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-gray-500">{title}</p>
          {subtitle && <p className="mt-1 text-sm text-gray-400">{subtitle}</p>}
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
          {offsetStr}
        </span>
      </div>

      <div className="my-8 min-h-[4.5rem] flex items-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={phrase}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="font-display text-3xl sm:text-4xl leading-tight text-white"
          >
            {phrase}
          </motion.h2>
        </AnimatePresence>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-2xl tabular-nums text-gray-200">
            {pad(hour12)}:{pad(minute)}:{pad(second)}
            <span className="ml-2 text-sm text-gray-500">{period}</span>
          </p>
          <p className="mt-1 text-xs text-gray-500">{dateLabel}</p>
        </div>
      </div>
    </div>
  );
}
