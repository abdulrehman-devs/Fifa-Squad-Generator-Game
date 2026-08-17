import Slot from './Slot.jsx';
import { ROW_ORDER } from '../config/formations.js';

export default function Pitch({ formation, slots, pool, cycleId, onTick, onLock }) {
  // Group slots by their `row` field, preserving the order defined in
  // formations.js (which already encodes left→right within each row).
  const byRow = formation.reduce((acc, s) => {
    (acc[s.row] ||= []).push(s);
    return acc;
  }, {});

  return (
    <div className="pitch">
      <div className="pitch-lines">
        <div className="center-circle" />
        <div className="center-line" />
        <div className="penalty-box top" />
        <div className="penalty-box bottom" />
      </div>
      <div className="formation">
        {ROW_ORDER.map((rowKey) => {
          const rowSlots = byRow[rowKey] || [];
          if (!rowSlots.length) return null;
          return (
            <div key={rowKey} className={`formation-row formation-row--${rowKey.toLowerCase()}`}>
              {rowSlots.map((s) => (
                <Slot
                  key={s.key}
                  slotConfig={s}
                  slotState={slots[s.key]}
                  pool={pool}
                  cycleId={cycleId}
                  onTick={onTick}
                  onLock={onLock}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
