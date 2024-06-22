const express = require('express')
const auth = require('../middleware/auth');
const vendorController = require('../controllers/vendorController');
const router = express.Router();

router.post('/',auth.checkAuth,vendorController.create)
router.get('/',auth.checkAuth,vendorController.getAllVendors)
router.get('/search', auth.checkAuth,vendorController.searchVendors);
router.get('/:id',auth.checkAuth,auth.isAdmin,vendorController.getVendor)
router.put('/:id',auth.checkAuth,auth.isAdmin,vendorController.updateVendor)
router.delete("/:id",auth.checkAuth,auth.isAdmin,vendorController.deleteVendor)


module.exports=router;