// 4-3-3 formation. Each slot lists its eligible positions — a player qualifies
// for the slot if any of their `positions` entries intersects with `eligible`.
//
// Slots are grouped into rows; `Pitch.jsx` renders one flex row per group and
// the rows form a pyramid (top→bottom width: 60% / 75% / 100% / 25%):
//   - FWD: front-3 (LW, ST, RW)
//   - MID: middle-3 (CM1, CM2, CM3)
//   - DEF: back-4 (LB, CB1, CB2, RB)
//   - GK:  single goalkeeper
//
// Card sizing, gaps, and row widths live in styles.css under `.formation-row`
// and `.formation-row--<name>`. Slots only need to know which row they belong
// to and their order within it (the order in this array = left-to-right).

export const FORMATION_433 = [
  // Front-3
  { key: 'LW',  label: 'LW', eligible: ['LW'], row: 'FWD', order: 0 },
  { key: 'ST',  label: 'ST', eligible: ['ST'], row: 'FWD', order: 1 },
  { key: 'RW',  label: 'RW', eligible: ['RW'], row: 'FWD', order: 2 },

  // Middle-3
  { key: 'CM1', label: 'CM', eligible: ['CM'], row: 'MID', order: 0 },
  { key: 'CM2', label: 'CM', eligible: ['CM'], row: 'MID', order: 1 },
  { key: 'CM3', label: 'CM', eligible: ['CM'], row: 'MID', order: 2 },

  // Back-4
  { key: 'LB',  label: 'LB', eligible: ['LB'], row: 'DEF', order: 0 },
  { key: 'CB1', label: 'CB', eligible: ['CB'], row: 'DEF', order: 1 },
  { key: 'CB2', label: 'CB', eligible: ['CB'], row: 'DEF', order: 2 },
  { key: 'RB',  label: 'RB', eligible: ['RB'], row: 'DEF', order: 3 },

  // GK
  { key: 'GK',  label: 'GK', eligible: ['GK'], row: 'GK',  order: 0 },
];

// Row order, top → bottom. Used by Pitch.jsx to render rows in pyramid order.
export const ROW_ORDER = ['FWD', 'MID', 'DEF', 'GK'];

export const MODES = [
  { id: 'real-madrid', label: 'Real Madrid',  color: '#FEBE10' },
  { id: 'arsenal',     label: 'Arsenal',      color: '#EF0107' },
  { id: 'man-utd',     label: 'Manchester United', color: '#DA291C' },
  { id: 'barcelona',   label: 'Barcelona',    color: '#A50044' },
  { id: 'ac-milan',    label: 'AC Milan',     color: '#FB090B' },
  { id: 'world',       label: 'World XI',     color: '#2563eb' },
];
