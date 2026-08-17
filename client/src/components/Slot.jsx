import { motion, AnimatePresence } from 'framer-motion';
import useShuffle from '../hooks/useShuffle.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
// Backend returns relative image paths like `/images/placeholder.svg`. Prefix
// them with the API origin so the browser hits the Render backend, not Vercel.
const toAbsolute = (url) =>
  url && url.startsWith('/') ? `${API_URL}${url}` : url;

export default function Slot({ slotConfig, slotState, pool, cycleId, onTick, onLock }) {
  const { key, label, eligible } = slotConfig;
  const { locked, display } = slotState;

  // Drive the shuffle only while this slot is open. The hook restarts on
  // every `cycleId` change so that locking any peer slot kicks the rest of
  // the open slots into a fresh 2.5s shuffle cycle.
  useShuffle({
    slotKey: key,
    eligible,
    pool,
    enabled: !locked,
    cycleId,
    onTick,
  });

  const isEmpty = !display;

  return (
    <button
      type="button"
      className={`slot ${locked ? 'locked' : 'open'}`}
      onClick={() => !locked && !isEmpty && onLock(key)}
      disabled={locked || isEmpty}
      aria-label={locked ? `${label}: ${display.name}` : `${label} slot, click to lock`}
    >
      <div className="slot-label">{label}</div>
      <div className="slot-photo">
        <AnimatePresence mode="wait">
          {isEmpty ? (
            <motion.div
              key="empty"
              className="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No players
            </motion.div>
          ) : (
            <motion.img
              key={display.id}
              src={toAbsolute(display.imageUrl)}
              alt={display.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.12 }}
              onError={(e) => {
                e.currentTarget.src = `${API_URL}/images/placeholder.svg`;
              }}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="slot-name">{display?.name || (isEmpty ? '—' : 'Shuffling…')}</div>
      {locked && <div className="lock-badge">✓</div>}
    </button>
  );
}
