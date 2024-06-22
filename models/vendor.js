const mongoose=require('mongoose')

const vendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    serviceType: { type: String, required: true }, // E.g., Catering, Photography
    contactDetails: {
      phone: { type: String, required: true },
      email: { type: String, required: true }
    },
    priceRange: { type: String, required: true }, // E.g., $1000-$2000
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Vendor', vendorSchema);
  