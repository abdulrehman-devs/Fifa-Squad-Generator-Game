require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const playersRouter = require('./routes/players');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use('/api/players', playersRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
