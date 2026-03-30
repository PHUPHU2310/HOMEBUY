const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Property = require('./models/Property');
const Transaction = require('./models/Transaction');
const User = require('./models/User');

require('dotenv').config();

const BACKUP_DIR = path.join(__dirname, 'backups');

const listBackups = () => {
  if (!fs.existsSync(BACKUP_DIR)) {
    console.log('❌ Thư mục backup không tồn tại');
    return [];
  }

  const files = fs.readdirSync(BACKUP_DIR);
  return files
    .filter(f => f.startsWith('backup-') && f.endsWith('.json'))
    .sort()
    .reverse(); // Most recent first
};

const restoreDatabase = async () => {
  try {
    console.log('\n📂 RESTORE DATABASE');
    console.log('=====================================');

    const backups = listBackups();

    if (backups.length === 0) {
      console.log('❌ Không tìm thấy backup nào');
      process.exit(1);
    }

    console.log('\n📋 Danh sách backup:');
    backups.forEach((backup, idx) => {
      console.log(`${idx + 1}. ${backup}`);
    });

    // Get user input
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('\nChọn số backup (1-' + backups.length + '): ', async (choice) => {
      const idx = parseInt(choice) - 1;

      if (idx < 0 || idx >= backups.length) {
        console.log('❌ Lựa chọn không hợp lệ');
        rl.close();
        process.exit(1);
      }

      const backupFile = path.join(BACKUP_DIR, backups[idx]);

      // Read backup file
      const backupData = JSON.parse(fs.readFileSync(backupFile, 'utf8'));

      console.log('\n📊 Thông tin backup:');
      console.log(`   Thời gian: ${backupData.timestamp}`);
      console.log(`   - Bất động sản: ${backupData.counts?.properties || backupData.properties?.length || 0}`);
      console.log(`   - Giao dịch: ${backupData.counts?.transactions || backupData.transactions?.length || 0}`);
      console.log(`   - Người dùng: ${backupData.counts?.users || backupData.users?.length || 0}`);

      // Connect to MongoDB
      console.log('\n⚙️  Kết nối MongoDB...');
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/real-estate', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      rl.question('\n⚠️  BẠN MUỐN XÓA DỮ LIỆU HIỆN TẠI TRƯỚC KHI RESTORE? (yes/no): ', async (clearAnswer) => {
        rl.close();

        if (clearAnswer === 'yes') {
          console.log('\n🗑️  Đang xóa dữ liệu hiện tại...');
          await Property.deleteMany({});
          await Transaction.deleteMany({});
          await User.deleteMany({});
          console.log('✓ Dữ liệu hiện tại đã được xóa');
        }

        // Restore data
        console.log('\n📥 Đang khôi phục dữ liệu...');

        if (backupData.properties && backupData.properties.length > 0) {
          await Property.insertMany(backupData.properties);
          console.log(`✓ Đã khôi phục ${backupData.properties.length} bất động sản`);
        }

        if (backupData.transactions && backupData.transactions.length > 0) {
          await Transaction.insertMany(backupData.transactions);
          console.log(`✓ Đã khôi phục ${backupData.transactions.length} giao dịch`);
        }

        if (backupData.users && backupData.users.length > 0) {
          await User.insertMany(backupData.users);
          console.log(`✓ Đã khôi phục ${backupData.users.length} người dùng`);
        }

        console.log('\n✅ Khôi phục dữ liệu thành công!');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
};

restoreDatabase();
