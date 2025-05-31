const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require("../middlewares/auth");

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get("/check-role", verifyToken, (req, res) => {
  res.json({ role: req.user.role }); 
});

module.exports = router;

