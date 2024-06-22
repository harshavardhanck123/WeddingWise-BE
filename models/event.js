const mongoose=require('mongoose')
const User=require('./username')

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    budget: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  });
  
  module.exports = mongoose.model('Event', eventSchema);
  