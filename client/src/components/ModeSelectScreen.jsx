import { MODES } from '../config/formations.js';

export default function ModeSelectScreen({ onSelect }) {
  return (
    <div className="screen mode-select">
      <header className="hero">
        <h1>
          <span className="of">Team of</span>
          <span className="the">the Season</span>
        </h1>
        <p>Pick a mode, then lock in players slot-by-slot to build your starting lineup.</p>
      </header>
      <div className="mode-grid">
        {MODES.map((m) => (
          <button
            key={m.id}
            className="mode-card"
            style={{ '--accent': m.color }}
            onClick={() => onSelect(m.id)}
          >
            <span className="mode-label">{m.label}</span>
          </button>
        ))}
      </div>
      <footer className="hint">Click a card to begin.</footer>
    </div>
  );
}
