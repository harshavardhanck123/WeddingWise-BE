const Event = require('../models/event')

const eventController = {

    create: async (req, res) => {
        try {
            const { title, description, date, location, budget } = req.body;
            if (!req.userId) {
                return res.status(400).json({ message: 'User ID is required' });
            }
            const newEvent = new Event({
                title,
                description,
                date,
                location,
                budget,
                createdBy: req.userId
            })
            await newEvent.save();
            res.status(201).json(newEvent);
            console.log(newEvent)
        }
        catch (error) {
            res.status(400).json({ error: error.message });

        }
    },
    getAllEvents: async (req, res) => {
        try {
            const Events = await Event.find();
            res.json(Events)
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    getEvent: async (req, res) => {
        try {
            // Access the user ID from req.params
            const eventID = req.params.id;

            // Retrieve the user from the database using the user ID
            const event = await Event.findById(eventID);

            // Check if the user exists
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }

            // Send the user data in the response
            res.json(event);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    updateEvent: async (req, res) => {
        try {
            const eventID = req.params.id;
            const { title, description, date, location, budget } = req.body;
            // Ensure the user is authenticated
            if (!req.userId) {
                return res.status(400).json({ message: 'User ID is required' });
            }
            const event = await Event.findByIdAndUpdate(eventID, { title, description, date, location, budget }, { new: true, runValidators: true });
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.json(event);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    deleteEvent: async (req, res) => {
        try {
            await Event.findByIdAndDelete(req.params.id);
            res.json({ message: 'Event deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    searchEvents: async (req, res) => {
        try {
            console.log('Query Params:', req.query); // Add this line to debug
            const { title, date, location } = req.query;
            const query = {};
        
            if (title) query.title = { $regex: title, $options: 'i' }; // Case-insensitive search
            if (date) query.date = date;
            if (location) query.location = { $regex: location, $options: 'i' };
        
            const events = await Event.find(query);
            res.json(events);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }
}

module.exports = eventController;