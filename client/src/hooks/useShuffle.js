import { useEffect, useRef } from 'react';

// Drives a per-slot shuffle. Each slot ticks on its own interval and reads
// from the shared `pool` (filtered by `eligible`) at every tick. The caller
// passes `onTick(slotKey, player)` so React state stays the source of truth.
//
// `enabled` is false once the slot is locked — the interval clears itself.
// `cycleId` is bumped by the parent when ANY other slot locks; changing it
// restarts the shuffle+settle cycle so the remaining open slots keep cycling.
//
// After `shuffleDurationMs` the hook stops the interval but leaves the last
// shown player on display — the slot is then "ready to pick". The user must
// click to lock it (which removes them from the pool) before the next cycle
// begins for the remaining slots.
export default function useShuffle({
  slotKey,
  eligible,
  pool,
  enabled,
  cycleId,
  onTick,
  intervalMs = 80,
  shuffleDurationMs = 2500,
}) {
  const onTickRef = useRef(onTick);
  onTickRef.current = onTick;

  useEffect(() => {
    if (!enabled) return undefined;

    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      const eligiblePlayers = pool.filter((p) =>
        p.positions.some((pos) => eligible.includes(pos))
      );
      if (eligiblePlayers.length === 0) {
        onTickRef.current(slotKey, null);
        return;
      }
      const pick = eligiblePlayers[Math.floor(Math.random() * eligiblePlayers.length)];
      onTickRef.current(slotKey, pick);
    };

    tick();
    const shuffleId = setInterval(tick, intervalMs);
    const stopId = setTimeout(() => {
      if (cancelled) return;
      clearInterval(shuffleId);
      // Leave the most recent tick on display — slot is now "ready to pick".
    }, shuffleDurationMs);

    return () => {
      cancelled = true;
      clearInterval(shuffleId);
      clearTimeout(stopId);
    };
  }, [slotKey, eligible, pool, enabled, cycleId, intervalMs, shuffleDurationMs]);
}
