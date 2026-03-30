import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const transactionService = {
  getAllTransactions: () => axios.get(`${API_BASE_URL}/transactions`),
  getTransactionById: (id) => axios.get(`${API_BASE_URL}/transactions/${id}`),
  createTransaction: (data) => axios.post(`${API_BASE_URL}/transactions`, data),
  updateTransaction: (id, data) => axios.put(`${API_BASE_URL}/transactions/${id}`, data),
  deleteTransaction: (id) => axios.delete(`${API_BASE_URL}/transactions/${id}`),
};

export default transactionService;
