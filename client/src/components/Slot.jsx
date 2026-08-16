import { motion, AnimatePresence } from 'framer-motion';
import useShuffle from '../hooks/useShuffle.js';

export default function Slot({ slotConfig, slotState, pool, cycleId, onTick, onLock }) {
  const { key, label, eligible, left, top, anchor } = slotConfig;
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

  // Anchor determines how the card aligns inside its absolutely-positioned
  // cell. The slot is a 0-width point at (left%, top%) of the pitch; the
  // anchor shifts it so the card's left/centre/right edge lands at that
  // point. Cards are `width: 26%` of pitch width (matches reference).
  const anchorTransform = {
    left:   'translate(0, -50%)',
    center: 'translate(-50%, -50%)',
    right:  'translate(-100%, -50%)',
  }[anchor || 'center'];

  return (
    <button
      type="button"
      className={`slot ${locked ? 'locked' : 'open'}`}
      style={{
        left: `${left}%`,
        top: `${top}%`,
        transform: anchorTransform,
      }}
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
              src={display.imageUrl}
              alt={display.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.12 }}
              onError={(e) => {
                e.currentTarget.src = '/images/placeholder.svg';
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
