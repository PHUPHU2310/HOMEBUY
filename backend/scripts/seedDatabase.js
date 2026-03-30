const mongoose = require('mongoose');
const Property = require('../models/Property');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const sampleProperties = require('../data/sampleProperties');
const sampleTransactions = require('../data/sampleTransactions');

require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/real-estate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    console.log('🌱 Bắt đầu seeding database...');

    // Clear existing data
    await Property.deleteMany({});
    await Transaction.deleteMany({});
    console.log('✓ Đã xóa dữ liệu cũ');

    // Create sample users (agents/sellers)
    const seller1 = await User.findOneAndUpdate(
      { email: 'agent1@realestate.com' },
      {
        name: 'Nguyễn Thị Hương',
        email: 'agent1@realestate.com',
        password: 'password123',
        role: 'Agent',
        phone: '0909111111',
        bio: 'Chuyên về bất động sản Quận 1, Quận 3',
      },
      { upsert: true, new: true }
    );

    const seller2 = await User.findOneAndUpdate(
      { email: 'agent2@realestate.com' },
      {
        name: 'Trần Minh Đức',
        email: 'agent2@realestate.com',
        password: 'password123',
        role: 'Agent',
        phone: '0909222222',
        bio: 'Chuyên về biệt thự, nhà phố cao cấp',
      },
      { upsert: true, new: true }
    );

    console.log('✓ Đã tạo tài khoản agent');

    // Add properties with owner references
    const propertiesWithOwners = sampleProperties.map((prop, index) => ({
      ...prop,
      owner: index % 2 === 0 ? seller1._id : seller2._id,
    }));

    const createdProperties = await Property.insertMany(propertiesWithOwners);
    console.log(`✓ Đã thêm ${createdProperties.length} bất động sản`);

    // Add transactions with property and user references
    const transactionsWithReferences = sampleTransactions.map((trans, index) => ({
      ...trans,
      propertyId: createdProperties[index]?._id,
      sellerId: index % 2 === 0 ? seller1._id : seller2._id,
    }));

    const createdTransactions = await Transaction.insertMany(transactionsWithReferences);
    console.log(`✓ Đã thêm ${createdTransactions.length} giao dịch`);

    console.log('✅ Seeding hoàn tất thành công!');
    console.log('\n📊 Thống kê:');
    console.log(`   - Bất động sản: ${createdProperties.length}`);
    console.log(`   - Giao dịch: ${createdTransactions.length}`);
    console.log(`   - Agents: 2`);

    console.log('\n🔐 Tài khoản Agent:');
    console.log('   Email: agent1@realestate.com | Password: password123');
    console.log('   Email: agent2@realestate.com | Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khi seeding:', error.message);
    process.exit(1);
  }
};

seedDatabase();
