const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        //Check kết nối database
        console.log('MONGO_URI =', process.env.MONGO_URI);
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in .env file');
        }else {
            console.log('MONGO_URI =', process.env.MONGO_URI);
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Kết nối database thành công: ${conn.connection.host}`);
    } catch (error) {
        console.error('Kết nối database thất bại:', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;