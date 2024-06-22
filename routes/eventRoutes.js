const express = require('express')
const auth = require('../middleware/auth');
const eventController = require('../controllers/eventController');
const router = express.Router();

router.post('/',auth.checkAuth,eventController.create)
router.get('/',auth.checkAuth,eventController.getAllEvents)
router.get('/search',auth.checkAuth, eventController.searchEvents);
router.get('/:id',auth.checkAuth,eventController.getEvent)
router.put('/:id',auth.checkAuth,auth.isAdmin,eventController.updateEvent)
router.delete("/:id",auth.checkAuth,auth.isAdmin,eventController.deleteEvent)


module.exports=router;