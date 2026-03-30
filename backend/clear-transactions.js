const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Transaction = require('./models/Transaction');

require('dotenv').config();

const BACKUP_DIR = path.join(__dirname, 'backups');

// Ensure backups directory exists
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

const clearTransactions = async () => {
  try {
    console.log('\n⚠️  CẢNH BÁO: BẠN CHUẨN BỊ XÓA TẤT CẢ GIAO DỊCH!');
    console.log('========================================');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/real-estate', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Get count before deletion
    const transactionCount = await Transaction.countDocuments();

    console.log('\n📊 Dữ liệu hiện tại:');
    console.log(`   - Giao dịch: ${transactionCount}`);

    // Create backup before deletion
    console.log('\n💾 Đang tạo backup dữ liệu...');
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(BACKUP_DIR, `backup-transactions-${timestamp}.json`);
    
    const backup = {
      timestamp: new Date().toISOString(),
      transactions: await Transaction.find(),
      count: transactionCount
    };

    fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2));
    console.log(`✓ Backup saved: ${backupFile}`);

    // Ask for confirmation
    console.log('\n❌ Nhập "DELETE_TRANSACTIONS" để xác nhận xóa tất cả giao dịch:');
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Xác nhận: ', async (answer) => {
      rl.close();

      if (answer !== 'DELETE_TRANSACTIONS') {
        console.log('\n✓ Đã hủy. Dữ liệu được giữ nguyên.');
        process.exit(0);
      }

      // Delete all transactions
      console.log('\n🗑️  Đang xóa giao dịch...');

      const result = await Transaction.deleteMany({});
      console.log(`✓ Đã xóa ${result.deletedCount} giao dịch`);

      // Log the deletion
      const logFile = path.join(BACKUP_DIR, `deletion-log-transactions-${timestamp}.txt`);
      const logContent = `
Deletion Log - Transactions
===========================
Thời gian: ${new Date().toISOString()}

Xóa: ${result.deletedCount} giao dịch

Backup được lưu tại: ${backupFile}
      `.trim();

      fs.writeFileSync(logFile, logContent);
      
      console.log('\n✅ Xóa giao dịch thành công!');
      console.log(`📝 Log file: ${logFile}`);
      console.log(`💾 Backup file: ${backupFile}`);

      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
};

clearTransactions();
