import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ModeSelectScreen from './components/ModeSelectScreen.jsx';
import GameScreen from './components/GameScreen.jsx';
import ResultScreen from './components/ResultScreen.jsx';

export default function App() {
  const [mode, setMode] = useState(null);
  const [pool, setPool] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [finalSlots, setFinalSlots] = useState(null);
  // Bumped to force GameScreen to reset when "Play Again" is chosen.
  const [resetKey, setResetKey] = useState(0);

  // Fetch pool whenever the selected mode changes.
  useEffect(() => {
    if (!mode) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    setCompleted(false);
    setFinalSlots(null);
    axios
      .get(`https://fifa-squad-generator-game.onrender.com/api/players/${mode}`)
      .then((res) => {
        if (cancelled) return;
        setPool(res.data);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.response?.data?.error || 'Failed to load players');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [mode]);

  const handleComplete = useCallback((slots) => {
    setFinalSlots(slots);
    setCompleted(true);
  }, []);

  const handleRestart = () => {
    setCompleted(false);
    setFinalSlots(null);
    setMode(null);
    setPool([]);
  };

  const handlePlayAgain = () => {
    setCompleted(false);
    setFinalSlots(null);
    setResetKey((k) => k + 1);
  };

  if (!mode) return <ModeSelectScreen onSelect={setMode} />;

  if (loading) {
    return (
      <div className="screen loading">
        <p>Loading players…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="screen error">
        <p>{error}</p>
        <button onClick={() => setMode(null)}>Back</button>
      </div>
    );
  }

  if (completed && finalSlots) {
    return (
      <ResultScreen
        mode={mode}
        slots={finalSlots}
        onRestart={handleRestart}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  return (
    <GameScreen
      key={resetKey}
      mode={mode}
      initialPool={pool}
      onComplete={handleComplete}
      onBack={() => setMode(null)}
    />
  );
}
