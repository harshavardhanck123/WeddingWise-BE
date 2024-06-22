const Booking = require('../models/Booking');
const Event = require('../models/event');
const Vendor = require('../models/vendor');
const User = require('../models/username');

const bookingController = {
    createBooking: async (req, res) => {
        try {
            const { eventId, vendorId, bookingDate } = req.body;

            // Ensure the user is authenticated
            if (!req.userId) {
                return res.status(400).json({ message: 'User ID is required' });
            }

            // Check if the event exists
            const event = await Event.findById(eventId);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }

            // Check if the vendor exists
            const vendor = await Vendor.findById(vendorId);
            if (!vendor) {
                return res.status(404).json({ message: 'Vendor not found' });
            }

            // Create new booking entry
            const newBooking = new Booking({
                userId: req.userId,
                eventId,
                vendorId,
                bookingDate,
            });

            await newBooking.save();
            res.status(201).json(newBooking);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getBookings: async (req, res) => {
        try {
            const bookings = await Booking.find() .populate('userId', 'name email') // Populate user information with only name and email fields
            .populate('eventId', 'title description date') // Populate event information
            .populate('vendorId', 'name service contact'); // Populate vendor information;
            res.json(bookings);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getBookingById: async (req, res) => {
        try {
            const bookingId = req.params.id;
            const booking = await Booking.findById(bookingId)
            .populate('userId', 'name email') // Populate user information with only name and email fields
            .populate('eventId', 'title description date') // Populate event information
            .populate('vendorId', 'name service contact'); // Populate vendor information;

            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }

            res.json(booking);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updateBooking: async (req, res) => {
        try {
            const bookingId = req.params.id;
            const { eventId, vendorId, bookingDate, status } = req.body;

            // Validate the presence of required fields
            if (!eventId || !vendorId || !bookingDate || !status) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const updatedBooking = await Booking.findByIdAndUpdate(
                bookingId,
                { eventId, vendorId, bookingDate, status },
                { new: true, runValidators: true }
            ).populate('userId eventId vendorId');

            if (!updatedBooking) {
                return res.status(404).json({ message: 'Booking not found' });
            }

            res.json(updatedBooking);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteBooking: async (req, res) => {
        try {
            const bookingId = req.params.id;
            await Booking.findByIdAndDelete(bookingId);
            res.json({ message: 'Booking deleted' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = bookingController;
