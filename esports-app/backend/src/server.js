require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/giaidau', require('./routes/giaiDauRoutes'));
app.use('/api/trandau', require('./routes/tranDauRoutes'));

// Phục vụ luôn giao diện (frontend) để chạy 1 lệnh duy nhất
app.use(express.static(path.join(__dirname, '../../frontend')));

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
}
module.exports = app;
