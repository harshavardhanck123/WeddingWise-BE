const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const User = require('../models/username'); // Ensure the correct path to your User model

const auth = {
    // Middleware to check if the user is authenticated and has a valid token
    checkAuth: (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
        
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
              return res.status(401).json({ message: 'Unauthorized' });
            }
        
            const token = authHeader.split(' ')[1];
        
            try {
              const decodedToken = jwt.verify(token, config.JWT_SECRET);
              req.userId = decodedToken.id;
              next();
            } catch (error) {
              return res.status(401).json({ message: 'Invalid token' });
            }
          } catch (error) {
            console.error('Error in checkAuth middleware:', error);
            res.status(500).json({ message: 'Internal server error' });
          }
      },

    // Middleware to check if the user is an admin
    isAdmin: async (request, response, next) => {
        try {
            // Get the user id from the request object
            const userId = request.userId;

            // Find the user by id in the database
            const user = await User.findById(userId);

            // If the user is not found or not an admin, return an error
            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            if (user.role !== 'admin') {
                return response.status(403).json({ message: 'Forbidden: You do not have the required permissions' });
            }

            // If the user is an admin, call the next middleware
            next();
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
};
// Export the auth object
module.exports = auth;
