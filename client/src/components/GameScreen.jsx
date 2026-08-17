import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Pitch from './Pitch.jsx';
import { FORMATION_433, MODES } from '../config/formations.js';

function makeInitialSlots() {
  return Object.fromEntries(
    FORMATION_433.map((s) => [s.key, { locked: false, player: null, display: null }])
  );
}

export default function GameScreen({ mode, initialPool, onComplete, onBack }) {
  const [pool, setPool] = useState(initialPool);
  const [slots, setSlots] = useState(makeInitialSlots);
  
  const [cycleId, setCycleId] = useState(0);
  const slotsRef = useRef(slots);
  slotsRef.current = slots;

  useEffect(() => {
    setPool(initialPool);
    setSlots(makeInitialSlots());
    setCycleId((c) => c + 1);
  }, [initialPool]);

  const handleTick = (slotKey, player) => {
    setSlots((prev) => {
      const slot = prev[slotKey];
      if (!slot || slot.locked) return prev;
      // Always apply the tick — even when the picked player matches the
      // current display — so React re-renders the slot and framer-motion
      // can run its enter/exit animations. This guarantees every open
      // slot visibly cycles on every tick.
      return { ...prev, [slotKey]: { ...slot, display: player } };
    });
  };

  const handleLock = useCallback((slotKey) => {
    const current = slotsRef.current[slotKey];
    if (!current || current.locked || !current.display) return;
    const lockedPlayer = current.display;
    setSlots((prev) => ({
      ...prev,
      [slotKey]: { locked: true, player: lockedPlayer, display: lockedPlayer },
    }));
    setPool((prev) => prev.filter((p) => p.id !== lockedPlayer.id));
    setCycleId((c) => c + 1);
  }, []);

  const lockedCount = useMemo(
    () => Object.values(slots).filter((s) => s.locked).length,
    [slots]
  );

  // Detect game completion and pass the final slot map upward.
  useEffect(() => {
    if (lockedCount === FORMATION_433.length) onComplete(slots);
  }, [lockedCount, slots, onComplete]);

  const modeMeta = MODES.find((m) => m.id === mode);
  const totalSlots = FORMATION_433.length;
  const isComplete = lockedCount === totalSlots;

  return (
    <div className="screen game">
      <header className="game-header" style={{ '--accent': modeMeta?.color }}>
        <button className="back" onClick={onBack}>← Modes</button>
        <h2>{modeMeta?.label}</h2>
        <div className="progress">{lockedCount} / {totalSlots} locked</div>
      </header>
      <Pitch
        formation={FORMATION_433}
        slots={slots}
        pool={pool}
        cycleId={cycleId}
        onTick={handleTick}
        onLock={handleLock}
      />
      <footer className="hint">
        {isComplete
          ? 'All slots locked — lineup complete!'
          : 'Shuffle stops after 2.5s. Click a slot to lock the player; the rest will reshuffle.'}
      </footer>
    </div>
  );
}
