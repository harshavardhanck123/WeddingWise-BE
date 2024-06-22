const mongoose=require('mongoose')

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    bookingDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Booking', bookingSchema);
  