import Pitch from './Pitch.jsx';
import { FORMATION_433, MODES } from '../config/formations.js';

export default function ResultScreen({ mode, slots, onRestart, onPlayAgain }) {
  const modeMeta = MODES.find((m) => m.id === mode);

  // Map locked slot state into the shape Pitch expects (display + locked).
  const finalSlots = {};
  for (const cfg of FORMATION_433) {
    const s = slots?.[cfg.key];
    finalSlots[cfg.key] = s
      ? { locked: true, player: s.player, display: s.player }
      : { locked: true, player: null, display: null };
  }

  return (
    <div className="screen result" style={{ '--accent': modeMeta?.color }}>
      <header className="result-header">
        <h1>Your Best XI</h1>
        <p>{modeMeta?.label} · Final lineup</p>
        <p className="hint">Slots locked in. Choose to play again or pick another mode.</p>
      </header>
      <Pitch
        formation={FORMATION_433}
        slots={finalSlots}
        pool={[]}
        onTick={() => {}}
        onLock={() => {}}
      />
      <div className="result-actions">
        <button onClick={onPlayAgain}>Play Again</button>
        <button className="secondary" onClick={onRestart}>Choose Mode</button>
      </div>
    </div>
  );
}
