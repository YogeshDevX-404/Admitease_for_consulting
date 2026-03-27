require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

/* ========================
   Middleware
======================== */
app.use(cors({ origin: '*' }));
app.use(express.json());

/* ========================
   Routes
======================== */
app.use('/api/colleges', require('./routes/colleges'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/admin', require('./routes/admin'));

app.get('/', (req, res) => {
  res.json({ message: 'AdmitEase API Running' });
});

/* ========================
   MongoDB Connection
======================== */

const PORT = process.env.PORT || 5000;

// ⚠ Important: use correct env variable name
const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb://localhost:27017/admitease';

if (!process.env.MONGO_URI) {
  console.log('⚠ Using Local MongoDB');
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB Error:', err.message);
    process.exit(1);
  });