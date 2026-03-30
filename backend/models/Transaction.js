const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  price: {
    type: Number,
    required: true,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
  type: {
    type: String,
    enum: ['Sale', 'Rental', 'Lease'],
    required: true,
  },
  description: String,
  notes: String,
  paymentTerms: {
    method: {
      type: String,
      enum: ['Cash', 'Bank Transfer', 'Installment'],
    },
    installments: [
      {
        percentage: Number,
        dueDate: Date,
        amount: Number,
        paid: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  documents: [
    {
      name: String,
      url: String,
      uploadedAt: Date,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
