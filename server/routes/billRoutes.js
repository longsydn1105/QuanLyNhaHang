const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');
const { verifyToken, verifyRole } = require('../middlewares/auth');

router.post('/', verifyToken, billController.create);
router.get('/', verifyToken, verifyRole('admin'), billController.getAll);
router.get('/:id', verifyToken, billController.getById);
router.patch('/:id/add-items', verifyToken, billController.addItems);
router.post('/:id/checkout', verifyToken, billController.checkout);
router.get('/by-day', verifyToken, verifyRole('admin'), billController.getByDay);
router.get("/revenue", verifyToken, verifyRole("admin"), billController.getRevenueStats);

module.exports = router;