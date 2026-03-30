const mongoose = require('mongoose');
const Property = require('./models/Property');
require('dotenv').config();

const checkDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/real-estate', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const count = await Property.countDocuments();
    console.log('📊 Số bất động sản trong DB:', count);

    if (count === 0) {
      console.log('✅ Database trống - Dữ liệu đã được xóa thành công!');
    } else {
      console.log('⚠️  Còn', count, 'bất động sản trong DB');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
};

checkDatabase();
