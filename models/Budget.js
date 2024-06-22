const mongoose=require('mongoose')

const budgetSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    title:{type: mongoose.Schema.Types.String,ref:'Event',required:true},
    category: { type: String, required: true }, // E.g., Venue, Catering, Decorations
    amount: { type: Number, required: true },
    spent: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Budget', budgetSchema);
  