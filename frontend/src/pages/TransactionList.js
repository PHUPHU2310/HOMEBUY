import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './TransactionList.css';

function TransactionList() {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let url = '/api/transactions';
        
        if (filterType) {
          url = `/api/transactions/by-type/${filterType}`;
        } else if (filterStatus) {
          url = `/api/transactions/by-status/${filterStatus}`;
        }

        const response = await axios.get(url);
        setTransactions(response.data);
        setLoading(false);
      } catch (err) {
        setError(t('transaction.loadError'));
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [filterType, filterStatus]);

  const getStatusBadgeColor = (status) => {
    const colors = {
      Pending: '#fff3cd',
      'Under Review': '#cfe2ff',
      Completed: '#d1e7dd',
      Cancelled: '#f8d7da',
    };
    return colors[status] || '#f0f0f0';
  };

  const getStatusTextColor = (status) => {
    const colors = {
      Pending: '#856404',
      'Under Review': '#084298',
      Completed: '#0f5132',
      Cancelled: '#842029',
    };
    return colors[status] || '#333';
  };

  const formatPrice = (price) => {
    if (price >= 1000000000) {
      return (price / 1000000000).toFixed(1) + ' tỷ';
    } else if (price >= 1000000) {
      return (price / 1000000).toFixed(1) + ' triệu';
    }
    return price.toLocaleString('vi-VN');
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN');
  };

  if (loading) {
    return <div className="transaction-loading">{t('transaction.loading')}</div>;
  }

  return (
    <div className="transaction-page">
      <div className="transaction-container">
        <div className="transaction-header">
          <h1>{t('transaction.transactions')}</h1>
          <p>{t('transaction.trackTransactions')}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* Filters */}
        <div className="transaction-filters">
          <div className="filter-group">
            <label>{t('transaction.transactionType')}</label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="">{t('transaction.allTypes')}</option>
              <option value="Sale">{t('transaction.sale')}</option>
              <option value="Rental">{t('transaction.rental')}</option>
              <option value="Lease">{t('transaction.lease')}</option>
            </select>
          </div>

          <div className="filter-group">
            <label>{t('transaction.status')}</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">{t('transaction.allStatuses')}</option>
              <option value="Pending">{t('transaction.pending')}</option>
              <option value="Under Review">{t('transaction.underReview')}</option>
              <option value="Completed">{t('transaction.completed')}</option>
              <option value="Cancelled">{t('transaction.cancelled')}</option>
            </select>
          </div>

          <button
            className="reset-btn"
            onClick={() => {
              setFilterType('');
              setFilterStatus('');
            }}
          >
            {t('transaction.resetButton')}
          </button>
        </div>

        {/* Transactions Grid */}
        {transactions.length === 0 ? (
          <div className="no-transactions">
            <p>{t('transaction.noResults')}</p>
          </div>
        ) : (
          <div className="transactions-grid">
            {transactions.map((transaction) => (
              <div key={transaction._id} className="transaction-card">
                <div className="transaction-card-header">
                  <div className="transaction-title">
                    <h3>{transaction.title}</h3>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: getStatusBadgeColor(transaction.status),
                        color: getStatusTextColor(transaction.status),
                      }}
                    >
                      {transaction.status}
                    </span>
                  </div>
                  <span className="transaction-type">{transaction.type}</span>
                </div>

                <div className="transaction-body">
                  {/* Property Info */}
                  {transaction.propertyId && (
                    <div className="property-info">
                      <strong>{t('transaction.property')}:</strong>
                      <p>
                        {transaction.propertyId.title}
                        <span className="location">
                          {transaction.propertyId.location?.city}
                        </span>
                      </p>
                    </div>
                  )}

                  {/* Price */}
                  <div className="transaction-price">
                    <span className="label">{t('transaction.value')}:</span>
                    <span className="price">{formatPrice(transaction.price)}</span>
                  </div>

                  {/* Date */}
                  <div className="transaction-date">
                    <span className="label">{t('transaction.transactionDate')}:</span>
                    <span>{formatDate(transaction.transactionDate)}</span>
                  </div>

                  {/* Participants */}
                  <div className="transaction-participants">
                    {transaction.sellerId && (
                      <div className="participant">
                        <span className="label">{t('transaction.seller')}:</span>
                        <p>
                          {transaction.sellerId.name}
                          <span className="contact">{transaction.sellerId.phone}</span>
                        </p>
                      </div>
                    )}
                    {transaction.buyerId && (
                      <div className="participant">
                        <span className="label">{t('transaction.buyer')}:</span>
                        <p>{transaction.buyerId.name}</p>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {transaction.description && (
                    <div className="transaction-description">
                      <p>{transaction.description}</p>
                    </div>
                  )}

                  {/* Notes */}
                  {transaction.notes && (
                    <div className="transaction-notes">
                      <strong>{t('transaction.notes')}:</strong>
                      <p>{transaction.notes}</p>
                    </div>
                  )}
                </div>

                <div className="transaction-card-footer">
                  <button className="view-details-btn">Xem chi tiết →</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Statistics */}
        <div className="transaction-summary">
          <div className="summary-card">
            <h4>{t('transaction.totalTransactions')}</h4>
            <p className="summary-number">{transactions.length}</p>
          </div>
          <div className="summary-card">
            <h4>{t('transaction.totalValue')}</h4>
            <p className="summary-number">
              {formatPrice(
                transactions.reduce((sum, t) => sum + t.price, 0)
              )}
            </p>
          </div>
          <div className="summary-card">
            <h4>{t('transaction.completedTransactions')}</h4>
            <p className="summary-number">
              {transactions.filter((t) => t.status === 'Completed').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionList;
