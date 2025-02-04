require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

app.use(cors());
app.use(bodyParser.json());

// Dummy user (Replace with database in a real app)
const users = [
  { username: 'admin', password: '$2a$10$9Gxh6BqJXKMT4EycmEdAsOHx9IH4XbCkqlNvdpb2ZhBfXfA2ZnWjG' } // "password123" hashed
];

// Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Protected Route (Example)
app.get('/api/protected', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Access denied' });

  jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    res.json({ message: 'Access granted', user: decoded });
  });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
