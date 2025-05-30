const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');
const { verifyToken, verifyRole } = require('../middlewares/auth');

router.get('/', verifyToken, dishController.getAllDishes);
router.post('/', verifyToken, verifyRole('admin'), dishController.createDish);
router.put('/:id', verifyToken, verifyRole('admin'), dishController.updateDish);
router.delete('/:id', verifyToken, verifyRole('admin'), dishController.deleteDish);

module.exports = router;