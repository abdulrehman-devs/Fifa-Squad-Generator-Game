import Slot from './Slot.jsx';

export default function Pitch({ formation, slots, pool, cycleId, onTick, onLock }) {
  return (
    <div className="pitch">
      <div className="pitch-lines">
        <div className="center-circle" />
        <div className="center-line" />
        <div className="penalty-box top" />
        <div className="penalty-box bottom" />
      </div>
      <div className="formation">
        {formation.map((s) => (
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
    </div>
  );
}
