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
//
// Each tick avoids picking the same player it picked last time when possible,
// so the slot visibly changes on every tick — even when the eligible pool
// has only 2 players.
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
    let lastPickId = null;

    const tick = () => {
      if (cancelled) return;
      const eligiblePlayers = pool.filter((p) =>
        p.positions.some((pos) => eligible.includes(pos))
      );
      if (eligiblePlayers.length === 0) {
        lastPickId = null;
        onTickRef.current(slotKey, null);
        return;
      }

      // Prefer a pick that's different from the last tick so the visible
      // card always changes (when the eligible set is > 1). With 1 player
      // we just repeat that one — there's no other choice.
      const candidates =
        eligiblePlayers.length > 1
          ? eligiblePlayers.filter((p) => p.id !== lastPickId)
          : eligiblePlayers;
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      lastPickId = pick?.id ?? null;
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
