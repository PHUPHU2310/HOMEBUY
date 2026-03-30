const mongoose = require('mongoose');
const Property = require('./models/Property');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/real-estate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  Property.deleteMany({})
    .then(() => {
      console.log('✅ Đã xóa hết dữ liệu mẫu');
      process.exit(0);
    })
    .catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
}).catch(err => {
  console.error('❌ Lỗi kết nối:', err);
  process.exit(1);
});
