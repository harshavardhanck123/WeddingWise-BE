const express = require('express');
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth.checkAuth, bookingController.createBooking);
router.get('/', auth.checkAuth, bookingController.getBookings);
router.get('/:id', auth.checkAuth, bookingController.getBookingById);
router.put('/:id', auth.checkAuth, bookingController.updateBooking);
router.delete('/:id', auth.checkAuth, bookingController.deleteBooking);

module.exports = router;
