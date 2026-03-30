const Transaction = require('../models/Transaction');

// Get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('propertyId', 'title price location')
      .populate('buyerId', 'name email')
      .populate('sellerId', 'name email phone')
      .sort({ transactionDate: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('propertyId')
      .populate('buyerId', 'name email phone')
      .populate('sellerId', 'name email phone');
    
    if (!transaction) {
      return res.status(404).json({ message: 'Giao dịch không tồn tại' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get transactions by property ID
exports.getTransactionsByProperty = async (req, res) => {
  try {
    const transactions = await Transaction.find({ propertyId: req.params.propertyId })
      .populate('buyerId', 'name email')
      .populate('sellerId', 'name email phone')
      .sort({ transactionDate: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get transactions by user (seller or buyer)
exports.getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ sellerId: req.user.id }, { buyerId: req.user.id }],
    })
      .populate('propertyId', 'title price location')
      .populate('buyerId', 'name email')
      .populate('sellerId', 'name email')
      .sort({ transactionDate: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get transactions by status
exports.getTransactionsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const transactions = await Transaction.find({ status })
      .populate('propertyId', 'title price location')
      .populate('buyerId', 'name email')
      .populate('sellerId', 'name email')
      .sort({ transactionDate: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get transactions by type
exports.getTransactionsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const transactions = await Transaction.find({ type })
      .populate('propertyId', 'title price location')
      .populate('buyerId', 'name email')
      .populate('sellerId', 'name email')
      .sort({ transactionDate: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create transaction (admin or agent only)
exports.createTransaction = async (req, res) => {
  const transaction = new Transaction(req.body);
  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update transaction
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Giao dịch không tồn tại' });
    }

    Object.assign(transaction, req.body);
    transaction.updatedAt = Date.now();
    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Giao dịch không tồn tại' });
    }
    res.json({ message: 'Giao dịch đã được xóa' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get transaction statistics
exports.getTransactionStats = async (req, res) => {
  try {
    const stats = await Transaction.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalValue: { $sum: '$price' },
        },
      },
    ]);

    const typeStats = await Transaction.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          totalValue: { $sum: '$price' },
        },
      },
    ]);

    res.json({
      byStatus: stats,
      byType: typeStats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
