const Bill = require('../models/Bill');
const Table = require('../models/Table');

// Tạo hoá đơn mới
exports.create = async (req, res) => { 
    try {
        const bill = await Bill.create(req.body);
        
        // console.log("Bill created:", bill); // Debug log
        // console.log("Bill ID:", bill._id); // Debug log

        const updateResult =  await Table.findByIdAndUpdate(
          req.body.tableID,
          { $set: { currentBillID: bill._id } },
          { new: true, runValidators: true }
        );

        // console.log("Table updated:", updateResult); // Debug log

        res.status(201).json(bill);
    } catch (err) {
        res.status(400).json({ message: 'Tạo hoá đơn thất bại', error: err.message });
    }
}

// Thêm món mới vào hoá đơn
exports.addItem = async (req, res) => {
    try {
        const { dishID, quantity, note, price, name } = req.body; 
        const total = quantity * price; // Tính tổng tiền cho món
        const bill = await Bill.findByIdAndUpdate(
            req.params.id,
            { $push: { items: { dishID, quantity, note, price, name, total } } },
            { new: true }
        );

        if (!bill) {
            return res.status(404).json({ message: 'Không tìm thấy hoá đơn để thêm món' });
        }

        res.json(bill);
    } catch (err) {
        res.status(400).json({ message: 'Thêm món vào hoá đơn thất bại', error: err.message });
    }
}

// Thanh toán hoá đơn
exports.checkout = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndUpdate(
      req.params.id,
      { status: 'paid'},
      { new: true }
    );
    
    console.log("Bill after checkout:", bill); // Debug log

    if (!bill) {
      return res.status(404).json({ message: 'Không tìm thấy hoá đơn' });
    }

    // Xoá liên kết bill khỏi bàn
    const updateResult = await Table.findByIdAndUpdate(
          bill.tableID,
          { $set: { currentBillID: null } },
          { new: true, runValidators: true }
        );

    // console.log("Table after checkout:", updateResult); // Debug log
     
    res.json({ message: 'Thanh toán thành công', bill });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi thanh toán hoá đơn', error: err.message });
  }
};

// Lấy danh sách hoá đơn theo ngày
exports.getByDay = async (req, res) => {
  try {
    const date = new Date(req.query.date); // yyyy-mm-dd

    if (!date) {
      return res.status(400).json({ message: 'Thiếu tham số ngày (date)' });
    }

    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);

    const bills = await Bill.find({
      createAt: {
        $gte: date,
        $lt: nextDay
      }
    });

    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy hoá đơn theo ngày', error: err.message });
  }
};

// Tính tiền tổng của hoá đơn
exports.getTotalAmount = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ message: 'Không tìm thấy hoá đơn' });

    const total = bill.items.reduce((sum, item) => sum + item.total, 0);

    res.json({ total });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tính tổng số tiền', error: err.message });
  }
}

// Tính tổng doanh thu theo ngày, tuần, tháng
exports.getRevenueStats = async (req, res) => {
  try {
    const { type, date } =req.query;

    if(!date) return res.status(400).json({ message: 'Thiếu tham số ngày (date)' });

    const inputDate = new Date(date);

    let startDate, endDate;

    if (type === 'day') {
      startDate = new Date(inputDate.setHours(0, 0, 0, 0));
      endDate = new Date(inputDate.setHours(23, 59, 59, 999));
    } else if (type === 'week') {
      const dayOfWeek = inputDate.getDay();
      const diffToMonDay = (dayOfWeek === 0 ? -6 : 1 - dayOfWeek);

      startDate = new Date (inputDate);
      startDate.setDate(inputDate.getDate() + diffToMonDay);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 7);
    } else if (type === 'month') {
      startDate = new Date(inputDate.getFullYear(), inputDate.getMonth(), 1);
      endDate = new Date(inputDate.getFullYear(), inputDate.getMonth() + 1, 1);
    } else {
      return res.status(400).json({ message: 'Tham số "type" phải là "day" hoặc "week" hoặc "month"' });
    }

    const bills = await Bill.find({
      createAt: {
        $gte: startDate,
        $lt: endDate
      }
    });

    const revenue = bills.reduce((sum, bill) => {
      const total = bill.items.reduce((s, item) => s +item.total, 0);
      return sum + total;
    }, 0);

    res.json({ revenue, count: bills.length });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy thống kê doanh thu', error: err.message });
  }
}