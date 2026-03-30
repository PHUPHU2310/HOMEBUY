const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Property = require('./models/Property');
const Transaction = require('./models/Transaction');
const User = require('./models/User');

require('dotenv').config();

const BACKUP_DIR = path.join(__dirname, 'backups');

// Ensure backups directory exists
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

const clearDatabase = async () => {
  try {
    console.log('\n⚠️  CẢNH BÁO: BẠN CHUẨN BỊ XÓA TẤT CẢ DỮ LIỆU!');
    console.log('========================================');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/real-estate', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Get counts before deletion
    const propertyCount = await Property.countDocuments();
    const transactionCount = await Transaction.countDocuments();
    const userCount = await User.countDocuments();

    console.log('\n📊 Dữ liệu hiện tại:');
    console.log(`   - Bất động sản: ${propertyCount}`);
    console.log(`   - Giao dịch: ${transactionCount}`);
    console.log(`   - Người dùng: ${userCount}`);

    // Create backup before deletion
    console.log('\n💾 Đang tạo backup dữ liệu...');
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(BACKUP_DIR, `backup-${timestamp}.json`);
    
    const backup = {
      timestamp: new Date().toISOString(),
      properties: await Property.find(),
      transactions: await Transaction.find(),
      users: await User.find(),
      counts: {
        properties: propertyCount,
        transactions: transactionCount,
        users: userCount
      }
    };

    fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2));
    console.log(`✓ Backup saved: ${backupFile}`);

    // Ask for confirmation
    console.log('\n❌ Nhập "DELETE_ALL" để xác nhận xóa tất cả dữ liệu:');
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Xác nhận: ', async (answer) => {
      rl.close();

      if (answer !== 'DELETE_ALL') {
        console.log('\n✓ Đã hủy. Dữ liệu được giữ nguyên.');
        process.exit(0);
      }

      // Delete all data
      console.log('\n🗑️  Đang xóa dữ liệu...');

      const propertyResult = await Property.deleteMany({});
      console.log(`✓ Đã xóa ${propertyResult.deletedCount} bất động sản`);

      const transactionResult = await Transaction.deleteMany({});
      console.log(`✓ Đã xóa ${transactionResult.deletedCount} giao dịch`);

      const userResult = await User.deleteMany({});
      console.log(`✓ Đã xóa ${userResult.deletedCount} người dùng`);

      // Log the deletion
      const logFile = path.join(BACKUP_DIR, `deletion-log-${timestamp}.txt`);
      const logContent = `
Deletion Log
============
Thời gian: ${new Date().toISOString()}

Xóa:
- ${propertyResult.deletedCount} bất động sản
- ${transactionResult.deletedCount} giao dịch
- ${userResult.deletedCount} người dùng

Backup được lưu tại: ${backupFile}
      `.trim();

      fs.writeFileSync(logFile, logContent);
      
      console.log('\n✅ Xóa tất cả dữ liệu thành công!');
      console.log(`📝 Log file: ${logFile}`);
      console.log(`💾 Backup file: ${backupFile}`);
      console.log('\n⚡ Để khôi phục dữ liệu, chạy:');
      console.log(`   node restore-database.js ${backupFile}`);

      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
};

clearDatabase();
