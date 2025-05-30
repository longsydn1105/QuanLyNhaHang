const Dish = require('../models/Dish');

// Lấy danh sách tất cả món ăn : GET all dishes
exports.getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.json(dishes);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách món ăn', error: err.message });
    }
};

// Tạo món ăn mới: POST a new Dish
exports.createDish = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        if (!name || !price) {
            return res.status(400).json({ message: 'Tên và giá món ăn là bắt buộc.' });
        }

        const dish = await Dish.create({ name, price, description });
        res.status(201).json(dish);
    } catch (err) {
        res.status(400).json({ message: 'Tạo món ăn thất bại', error: err.message });
    }
};

// Cập nhập món ăn: PUT a dish
exports.updateDish = async (req, res) => {
    try {
        const updated = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updated) return res.status(404).json({ message: 'Món ăn không tồn tại' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: 'Cập nhật thất bại', error: err.message });
    }
};

// Xoá món ăn: DELETE a dish
exports.deleteDish = async (req, res) => {
    try {
        const deleted = await Dish.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Món ăn không tồn tại' });
        res.json({ message: 'Món ăn đã được xoá thành công' , data: deleted });
    } catch (err) {
        res.status(500).json({ message: 'Xoá món ăn thất bại', error: err.message });
    }
}