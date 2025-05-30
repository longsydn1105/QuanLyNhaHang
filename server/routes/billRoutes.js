const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');
const { verifyToken, verifyRole } = require('../middlewares/auth');

router.post('/', verifyToken, billController.create);
router.patch('/:id/add-item', verifyToken, billController.addItem);
router.post('/:id/checkout', verifyToken, billController.checkout);
router.get('/by-day', verifyToken, verifyRole('admin'), billController.getByDay);

module.exports = router;