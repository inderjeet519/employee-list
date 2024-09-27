// // routes/auth.js
// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../model/User');
// const router = express.Router();

// // Register
// router.post('/register', async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const newUser = new User({ username: req.body.username, password: hashedPassword });
//     await newUser.save();
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating user' });
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   const user = await User.findOne({ username: req.body.username });
//   if (!user) return res.status(400).json({ error: 'Invalid credentials' });

//   const isMatch = await bcrypt.compare(req.body.password, user.password);
//   if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

//   const token = jwt.sign({ id: user._id }, 'your_jwt_secret'); // Replace with your own secret
//   res.json({ token });
// });

// module.exports = router;
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ username: req.body.username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, 'your_jwt_secret'); // Replace with your own secret
  res.json({ token });
});

module.exports = router;
