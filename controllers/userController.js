const User=require('../models/username')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config.js');
const mongoose=require('mongoose')
const userController={
// Register a new user
register : async (req, res) => {
  try {
    const { username, email, password,role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword,role});
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
},
// Login a user
login: async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, config.JWT_SECRET, { expiresIn: '1d' });

    // Set the token in the response headers
    res.setHeader('Authorization', `Bearer ${token}`);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role:user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},
logout: async (request, response) => {
  try {
      response.clearCookie('token');
      response.json({ message: 'Logout Successful' });
  } catch (error) {
      response.status(500).json({ message: error.message });
  }
},
// Get user profile by id
getProfile: async (req, res) => {
  try {
    // Access the user ID from req.params
    const userId = req.params.id;

    
    // Retrieve the user from the database using the user ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user data in the response
    res.json(user);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
},


// Get all users (Admin only)
getAllUsers : async (req, res) => {
  try {
    const users=await User.find()
    res.json(users)

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
    
  }
},
updateUser: async (req, res) => {
  try {
      const userID = req.params.id;
      const { username, role, } = req.body;
      // Ensure the user is authenticated
      if (!req.userId) {
          return res.status(400).json({ message: 'User ID is required' });
      }
      const user = await User.findByIdAndUpdate(userID, { username,role }, { new: true, runValidators: true });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  }
  catch (error) {
      res.status(400).json({ error: error.message });
  }
},

// Delete a user (Admin only)
deleteUser : async (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const userId = req.params.id;

    // Check if the user ID is valid
    if (!userId) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Attempt to find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(userId);

    // Check if the user was found and deleted successfully
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return a success message
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
}
}
module.exports=userController;