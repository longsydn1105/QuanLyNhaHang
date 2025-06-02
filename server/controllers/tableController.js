 const Table = require('../models/Table');

 // Lấy tất cả các bàn
 exports.getAll = async (req, res) => {
    try {
        const tables = await Table.find();
        res.json(tables);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách bàn', error: err.message });
    }
};

// Lấy bàn theo ID
exports.getById = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) {
      return res.status(404).json({ message: 'Không tìm thấy bàn' });
    }
    res.json(table);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};


// Tạo ra bàn mới
exports.create = async (req, res) => { 
    try {
        const table = await Table.create(req.body);
        res.status(201).json(table);
    } catch (err) {
        res.status(400).json({ message: 'Tạo bàn thất bại', error: err.message });
    }
};

// Cập nhập trạng thái bàn
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updated = await Table.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        
        if (!updated) return res.status(404).json({ message: 'Bàn không tồn tại' });
        
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: 'Cập nhật trạng thái bàn thất bại', error: err.message });
    }
};

exports.delete = async (req, res) => {
	try {
		const table = await Table.findById(req.params.id);
		if (!table) {
			return res.status(404).json({ message: 'Không tìm thấy bàn' });
		}

		await Table.findByIdAndDelete(req.params.id);
		res.json({ message: 'Đã xoá bàn thành công!' });
	} catch (err) {
		res.status(500).json({ message: 'Lỗi khi xoá bàn', error: err.message });
	}
};