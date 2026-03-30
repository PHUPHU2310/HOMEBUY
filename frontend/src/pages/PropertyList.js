import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import propertyService from '../services/propertyService';
import './PropertyList.css';

function PropertyList() {
  const { t } = useTranslation();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states - initialize from localStorage
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Load filters from localStorage on mount
  useEffect(() => {
    const savedFilters = localStorage.getItem('propertyFilters');
    if (savedFilters) {
      try {
        const filters = JSON.parse(savedFilters);
        setSearchKeyword(filters.searchKeyword || '');
        setFilterType(filters.filterType || '');
        setFilterCity(filters.filterCity || '');
        setPriceRange(filters.priceRange || '');
        setSortBy(filters.sortBy || 'newest');
      } catch (e) {
        console.error('Failed to load saved filters:', e);
      }
    }
  }, []);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    const filters = {
      searchKeyword,
      filterType,
      filterCity,
      priceRange,
      sortBy,
    };
    localStorage.setItem('propertyFilters', JSON.stringify(filters));
  }, [searchKeyword, filterType, filterCity, priceRange, sortBy]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await propertyService.getAllProperties();
        setProperties(response.data);
        setLoading(false);
      } catch (err) {
        setError(t('errors.loadProperties'));
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...properties];

    // Tìm kiếm theo từ khóa
    if (searchKeyword) {
      result = result.filter(
        (prop) =>
          prop.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          prop.description.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    // Lọc theo loại BĐS
    if (filterType) {
      result = result.filter((prop) => prop.type === filterType);
    }

    // Lọc theo thành phố
    if (filterCity) {
      result = result.filter(
        (prop) =>
          prop.location?.city.toLowerCase() === filterCity.toLowerCase()
      );
    }

    // Lọc theo giá
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      result = result.filter((prop) => {
        if (maxPrice === 0) {
          return prop.price >= minPrice;
        }
        return prop.price >= minPrice && prop.price <= maxPrice;
      });
    }

    // Sắp xếp
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProperties(result);
  }, [properties, searchKeyword, filterType, filterCity, priceRange, sortBy]);

  const handleResetFilters = () => {
    setSearchKeyword('');
    setFilterType('');
    setFilterCity('');
    setPriceRange('');
    setSortBy('newest');
    localStorage.removeItem('propertyFilters');
  };

  // Get unique cities and types from properties
  const cities = [...new Set(properties.map((p) => p.location?.city).filter(Boolean))];
  const types = [...new Set(properties.map((p) => p.type).filter(Boolean))];

  if (loading) {
    return <div className="property-loading">{t('property.loading')}</div>;
  }

  return (
    <div className="property-list-page">
      <div className="properties-container">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <h2>{t('property.filterTitle')}</h2>

          {/* Search */}
          <div className="filter-group">
            <label htmlFor="search">{t('property.searchLabel')}</label>
            <input
              type="text"
              id="search"
              placeholder={t('property.searchPlaceholder')}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Property Type */}
          <div className="filter-group">
            <label htmlFor="type">{t('property.typeLabel')}</label>
            <select
              id="type"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">{t('property.typeAllOption')}</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div className="filter-group">
            <label htmlFor="city">{t('property.cityLabel')}</label>
            <select
              id="city"
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
            >
              <option value="">{t('property.cityAllOption')}</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="filter-group">
            <label htmlFor="price">{t('property.priceLabel')}</label>
            <select
              id="price"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="">{t('property.priceAllOption')}</option>
              <option value="0-500000000">{t('property.price1')}</option>
              <option value="500000000-1000000000">{t('property.price2')}</option>
              <option value="1000000000-2000000000">{t('property.price3')}</option>
              <option value="2000000000-5000000000">{t('property.price4')}</option>
              <option value="5000000000-0">{t('property.price5')}</option>
            </select>
          </div>

          {/* Reset Button */}
          <button className="reset-filters-btn" onClick={handleResetFilters}>
            {t('property.resetButton')}
          </button>
        </aside>

        {/* Main Content */}
        <div className="properties-main">
          {/* Toolbar */}
          <div className="toolbar">
            <div className="results-info">
              {t('property.resultsInfo')} <strong>{filteredProperties.length}</strong>
            </div>
            <div className="sort-control">
              <label htmlFor="sort">{t('property.sortLabel')}</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">{t('property.sortNewest')}</option>
                <option value="price-low">{t('property.sortPriceLow')}</option>
                <option value="price-high">{t('property.sortPriceHigh')}</option>
              </select>
            </div>
          </div>

          {/* Properties Grid */}
          {error && <div className="error-message">{error}</div>}

          {filteredProperties.length === 0 ? (
            <div className="no-results">
              <p>{t('property.noResults')}</p>
            </div>
          ) : (
            <div className="properties-grid">
              {filteredProperties.map((property) => (
                <Link
                  key={property._id}
                  to={`/property/${property._id}`}
                  className="property-card"
                >
                  <div className="property-card-image">
                    <img
                      src={
                        property.images?.[0] ||
                        'https://via.placeholder.com/300x200?text=No+Image'
                      }
                      alt={property.title}
                    />
                    <span className={`property-status ${property.status?.toLowerCase()}`}>
                      {property.status}
                    </span>
                  </div>

                  <div className="property-card-content">
                    <h3>{property.title}</h3>
                    <p className="location">
                      {property.location?.address}
                    </p>

                    <div className="property-features-mini">
                      {property.bedrooms && (
                        <span className="feature">{property.bedrooms} {t('property.bedrooms')}</span>
                      )}
                      {property.bathrooms && (
                        <span className="feature">{property.bathrooms} {t('property.bathrooms')}</span>
                      )}
                      {property.area && (
                        <span className="feature">{property.area} m²</span>
                      )}
                    </div>

                    <div className="property-card-footer">
                      <span className="price">
                        {property.price?.toLocaleString('vi-VN')} VND
                      </span>
                      <span className="view-btn">{t('property.viewDetails')} →</span>
                    </div>

                    {/* Owner Info */}
                    {property.owner && (
                      <div className="property-owner-info">
                        <p className="owner-label">👤 Người bán:</p>
                        <p className="owner-name">{property.owner?.name}</p>
                        {property.owner?.phone && (
                          <p className="owner-phone">📞 {property.owner.phone}</p>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyList;
