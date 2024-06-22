const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Role field to distinguish between users and admins
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
