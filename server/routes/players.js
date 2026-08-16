const express = require('express');
const players = require('../data/players.json');

const router = express.Router();

router.get('/:mode', (req, res) => {
  const { mode } = req.params;

  if (mode === 'world') {
    return res.json(players);
  }

  const filtered = players.filter((p) => p.team === mode);
  if (filtered.length === 0) {
    return res.status(404).json({ error: 'Mode not found' });
  }
  return res.json(filtered);
});

module.exports = router;
