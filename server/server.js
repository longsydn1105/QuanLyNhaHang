require('dotenv').config();  
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const open = require('open').default; 

const app = express();
app.use(express.json()); // đọc JSON từ body

// Kết nối tới MongoDB
connectDB();

// Serve static files từ thư mục client/
app.use(express.static(path.join(__dirname, '../client')));

// Các route chính
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tables', require('./routes/tableRoutes'));
app.use('/api/dishes', require('./routes/dishRoutes'));
app.use('/api/bills', require('./routes/billRoutes'));

// Routes cho giao diện người dùng
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/login.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/admin.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/register.html'));
});

app.get('/staff', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/staff.html'));
});

app.get('/order', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/order.html'));
});

// Cổng server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB(); 
  
  app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    open(`http://localhost:${PORT}`);
  });
};

startServer();
