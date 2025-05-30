const jwt = require('jsonwebtoken');

// Xác thực token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Không có token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Lưu thông tin người dùng vào req.user

        console.log('Token verified:', req.user); // debug log

        next();
    } catch (err) {

    }
};

//Phân quyền theo vai trò admin và staff
const verifyRole = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập' });
        }
        next();
    };
};

module.exports = {
    verifyToken,
    verifyRole
 }