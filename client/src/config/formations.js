// 4-3-3 formation. Each slot lists its eligible positions — a player qualifies
// for the slot if any of their `positions` entries intersects with `eligible`.
//
// Slots are absolutely positioned inside the pitch. `left` and `top` are
// percentages of the pitch box (0–100). `anchor` controls horizontal
// alignment of the card inside its cell: 'left' anchors to the cell's left
// edge (so the card's left edge sits at `left%`), 'center' (default) centres
// the card, 'right' anchors to the right edge.
//
// Reference positions are measured from the formation reference image.
// Card width is controlled separately in CSS (~26% of pitch width on desktop).
//
// Columns (% of pitch width from the left edge of the pitch):
//   - GK, ST, CM2  → 50   (dead centre)
//   - LW, CM1      → 20.5
//   - RW, CM3      → 79.5
//   - LB           → 0
//   - CB1          → 28.8
//   - CB2          → 71.2
//   - RB           → 100
//
// Rows (% of pitch height from the top edge of the pitch):
//   - Front-3      → 8
//   - Mid-3        → 36
//   - Back-4       → 63
//   - GK           → 88
export const FORMATION_433 = [
  { key: 'GK',  label: 'GK', eligible: ['GK'],   left: 50,  top: 88, anchor: 'center' },
  { key: 'LB',  label: 'LB', eligible: ['LB'],   left: 0,   top: 63, anchor: 'left'   },
  { key: 'CB1', label: 'CB', eligible: ['CB'],   left: 28.8, top: 63, anchor: 'center' },
  { key: 'CB2', label: 'CB', eligible: ['CB'],   left: 71.2, top: 63, anchor: 'center' },
  { key: 'RB',  label: 'RB', eligible: ['RB'],   left: 100, top: 63, anchor: 'right'  },
  { key: 'CM1', label: 'CM', eligible: ['CM'],   left: 20.5, top: 36, anchor: 'center' },
  { key: 'CM2', label: 'CM', eligible: ['CM'],   left: 50,  top: 36, anchor: 'center' },
  { key: 'CM3', label: 'CM', eligible: ['CM'],   left: 79.5, top: 36, anchor: 'center' },
  { key: 'LW',  label: 'LW', eligible: ['LW'],   left: 20.5, top: 8,  anchor: 'center' },
  { key: 'ST',  label: 'ST', eligible: ['ST'],   left: 50,  top: 8,  anchor: 'center' },
  { key: 'RW',  label: 'RW', eligible: ['RW'],   left: 79.5, top: 8,  anchor: 'center' },
];

export const MODES = [
  { id: 'real-madrid', label: 'Real Madrid',  color: '#FEBE10' },
  { id: 'arsenal',     label: 'Arsenal',      color: '#EF0107' },
  { id: 'man-utd',     label: 'Manchester United', color: '#DA291C' },
  { id: 'barcelona',   label: 'Barcelona',    color: '#A50044' },
  { id: 'ac-milan',    label: 'AC Milan',     color: '#FB090B' },
  { id: 'world',       label: 'World XI',     color: '#2563eb' },
];
