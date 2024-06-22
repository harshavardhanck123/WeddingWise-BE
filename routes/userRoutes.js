const express = require('express')
const userController = require('../controllers/userController')
const auth = require('../middleware/auth');
const router = express.Router();

// User Registration
router.post('/register', userController.register);

// User Login
router.post('/login',userController.login);

router.post('/logout',userController.logout);

// Get User Profile
router.get('/profile/:id', auth.checkAuth, userController.getProfile);

// Delete User Profile
router.delete('/delete/:id', auth.checkAuth, userController.deleteUser);

// Get All Users (Admin only)
router.get('/allUsers', auth.checkAuth,auth.isAdmin,  userController.getAllUsers);

router.put('/edit/:id', auth.checkAuth, userController.updateUser);

/*router.get('/:id', auth.checkAuth, auth.isAdmin, userController.getUserById);
router.put('/:id', auth.checkAuth, auth.isAdmin, userController.updateUserById);
router.delete('/:id', auth.checkAuth, auth.isAdmin, userController.deleteUserById);*/
module.exports = router;