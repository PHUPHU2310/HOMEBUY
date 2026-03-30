const mongoose = require('mongoose');
const Transaction = require('./models/Transaction');
require('dotenv').config();

const clearTransactions = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/real-estate', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Kết nối MongoDB thành công');

    // Delete all transactions
    const result = await Transaction.deleteMany({});
    console.log(`✅ Đã xóa ${result.deletedCount} giao dịch từ database`);

    // Close connection
    await mongoose.connection.close();
    console.log('Ngắt kết nối MongoDB thành công');
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
};

clearTransactions();
