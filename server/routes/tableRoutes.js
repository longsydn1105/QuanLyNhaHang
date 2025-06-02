const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');
const { verifyToken, verifyRole } = require('../middlewares/auth');

router.get('/', verifyToken, tableController.getAll);
router.get('/:id', tableController.getById);
router.post('/', verifyToken, verifyRole('admin'), tableController.create);
router.patch('/:id/status', verifyToken, tableController.updateStatus);
router.delete('/:id', verifyToken, verifyRole('admin'), tableController.delete);

module.exports = router;
