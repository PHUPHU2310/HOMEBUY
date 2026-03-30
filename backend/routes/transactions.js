const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { authenticate } = require('../middleware/authMiddleware');

// Public routes
router.get('/', transactionController.getAllTransactions);
router.get('/stats', transactionController.getTransactionStats);
router.get('/by-status/:status', transactionController.getTransactionsByStatus);
router.get('/by-type/:type', transactionController.getTransactionsByType);
router.get('/property/:propertyId', transactionController.getTransactionsByProperty);
router.get('/:id', transactionController.getTransactionById);

// Protected routes
router.get('/user/my-transactions', authenticate, transactionController.getUserTransactions);

// Admin routes
router.post('/', authenticate, transactionController.createTransaction);
router.put('/:id', authenticate, transactionController.updateTransaction);
router.delete('/:id', authenticate, transactionController.deleteTransaction);

module.exports = router;
