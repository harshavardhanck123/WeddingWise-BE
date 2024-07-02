const express = require('express')
const auth = require('../middleware/auth');
const budgetController = require('../controllers/budgetController');
const router = express.Router();

router.post('/',auth.checkAuth,budgetController.create)
router.get('/',budgetController.getAllBudget)
router.get('/:id',auth.checkAuth,budgetController.getBudget)
router.put('/:id',auth.checkAuth,auth.isAdmin,budgetController.updateBudget)
router.delete("/:id",auth.checkAuth,auth.isAdmin,budgetController.deleteBudget)

module.exports=router;