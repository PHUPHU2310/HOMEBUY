import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import propertyService from '../services/propertyService';
import './Explore.css';

function Explore() {
  const { t } = useTranslation();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Advanced filter states
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const [minBedrooms, setMinBedrooms] = useState('');
  const [maxBedrooms, setMaxBedrooms] = useState('');
  const [minBathrooms, setMinBathrooms] = useState('');
  const [maxBathrooms, setMaxBathrooms] = useState('');

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

    // Lọc theo diện tích
    if (minArea || maxArea) {
      result = result.filter((prop) => {
        const area = prop.area || 0;
        if (minArea && area < parseInt(minArea)) return false;
        if (maxArea && area > parseInt(maxArea)) return false;
        return true;
      });
    }

    // Lọc theo số phòng ngủ
    if (minBedrooms || maxBedrooms) {
      result = result.filter((prop) => {
        const bedrooms = prop.bedrooms || 0;
        if (minBedrooms && bedrooms < parseInt(minBedrooms)) return false;
        if (maxBedrooms && bedrooms > parseInt(maxBedrooms)) return false;
        return true;
      });
    }

    // Lọc theo số phòng tắm
    if (minBathrooms || maxBathrooms) {
      result = result.filter((prop) => {
        const bathrooms = prop.bathrooms || 0;
        if (minBathrooms && bathrooms < parseInt(minBathrooms)) return false;
        if (maxBathrooms && bathrooms > parseInt(maxBathrooms)) return false;
        return true;
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
  }, [properties, searchKeyword, filterType, filterCity, priceRange, sortBy, minArea, maxArea, minBedrooms, maxBedrooms, minBathrooms, maxBathrooms]);

  const handleResetFilters = () => {
    setSearchKeyword('');
    setFilterType('');
    setFilterCity('');
    setPriceRange('');
    setSortBy('newest');
    setMinArea('');
    setMaxArea('');
    setMinBedrooms('');
    setMaxBedrooms('');
    setMinBathrooms('');
    setMaxBathrooms('');
    setShowAdvanced(false);
  };

  const handleOpenAdvanced = () => {
    setShowAdvanced(true);
    setTimeout(() => {
      document.getElementById('filter').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Get unique cities and types from properties
  const cities = [...new Set(properties.map((p) => p.location?.city).filter(Boolean))];
  const types = [...new Set(properties.map((p) => p.type).filter(Boolean))];

  if (loading) {
    return <div className="explore-loading">{t('explore.loading')}</div>;
  }

  return (
    <div className="explore-page">
      {/* Hero Section */}
      <div className="explore-hero">
        <div className="explore-hero-content">
          <h1>{t('explore.title')}</h1>
          <p>{t('explore.subtitle')}</p>
          <button onClick={handleOpenAdvanced} className="explore-cta-btn">
            {t('explore.startButton')}
          </button>
        </div>
      </div>

      {/* Advanced Filter Modal */}
      {showAdvanced && (
        <div className="advanced-filter-overlay" onClick={() => setShowAdvanced(false)}>
          <div className="advanced-filter-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{t('explore.advancedFilter')}</h2>
              <button className="close-btn" onClick={() => setShowAdvanced(false)}>×</button>
            </div>
            <div className="modal-content">
              <div className="filter-group">
                <h3>{t('explore.areaTitle')}</h3>
                <div className="filter-row">
                  <input
                    type="number"
                    placeholder={t('explore.minArea')}
                    value={minArea}
                    onChange={(e) => setMinArea(e.target.value)}
                    className="filter-input"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder={t('explore.maxArea')}
                    value={maxArea}
                    onChange={(e) => setMaxArea(e.target.value)}
                    className="filter-input"
                  />
                  <span>m²</span>
                </div>
              </div>

              <div className="filter-group">
                <h3>{t('explore.bedroomsTitle')}</h3>
                <div className="filter-row">
                  <input
                    type="number"
                    placeholder={t('explore.minBedrooms')}
                    value={minBedrooms}
                    onChange={(e) => setMinBedrooms(e.target.value)}
                    className="filter-input"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder={t('explore.maxBedrooms')}
                    value={maxBedrooms}
                    onChange={(e) => setMaxBedrooms(e.target.value)}
                    className="filter-input"
                  />
                </div>
              </div>

              <div className="filter-group">
                <h3>{t('explore.bathroomsTitle')}</h3>
                <div className="filter-row">
                  <input
                    type="number"
                    placeholder={t('explore.minBathrooms')}
                    value={minBathrooms}
                    onChange={(e) => setMinBathrooms(e.target.value)}
                    className="filter-input"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder={t('explore.maxBathrooms')}
                    value={maxBathrooms}
                    onChange={(e) => setMaxBathrooms(e.target.value)}
                    className="filter-input"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowAdvanced(false)} className="close-filter-btn">
                {t('common.cancel')}
              </button>
              <button onClick={() => setShowAdvanced(false)} className="apply-filter-btn">
                {t('explore.applyFilter')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter Section */}
      <div id="filter" className="explore-search">
        <div className="explore-container">
          <div className="search-box">
            <input
              type="text"
              placeholder={t('explore.searchPlaceholder')}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters-row">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="">{t('explore.filterType')}</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {t(`property.type.${type.toLowerCase()}`)}
                </option>
              ))}
            </select>

            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="filter-select"
            >
              <option value="">{t('explore.filterCity')}</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="filter-select"
            >
              <option value="">{t('explore.filterPrice')}</option>
              <option value="0-1000000000">{t('explore.price1')}</option>
              <option value="1000000000-2000000000">{t('explore.price2')}</option>
              <option value="2000000000-5000000000">{t('explore.price3')}</option>
              <option value="5000000000-0">{t('explore.price4')}</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="newest">{t('explore.sortNewest')}</option>
              <option value="price-low">{t('explore.sortPriceLow')}</option>
              <option value="price-high">{t('explore.sortPriceHigh')}</option>
            </select>

            <button onClick={handleResetFilters} className="reset-btn">
              {t('common.reset')}
            </button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="explore-container">
        {error && <div className="error-message">{error}</div>}

        {filteredProperties.length === 0 ? (
          <div className="no-results">
            <p>{t('common.noResults')}</p>
          </div>
        ) : (
          <div className="properties-grid">
            {filteredProperties.map((property) => (
              <div key={property._id} className="property-card">
                <div className="property-image">
                  {property.images && property.images[0] ? (
                    <img src={property.images[0]} alt={property.title} />
                  ) : (
                    <div className="placeholder-image">No Image</div>
                  )}
                  <span className="property-type">{t(`property.type.${property.type.toLowerCase()}`)}</span>
                </div>

                <div className="property-info">
                  <h3>{property.title}</h3>
                  <p className="property-location">
                    {property.location?.address}, {property.location?.city}
                  </p>
                  <p className="property-description">{property.description.substring(0, 100)}...</p>

                  <div className="property-features">
                    <span>{property.bedrooms} {t('explore.bedrooms')}</span>
                    <span>{property.bathrooms} {t('explore.bathrooms')}</span>
                    <span>{property.area} m²</span>
                  </div>

                  <div className="property-footer">
                    <span className="property-price">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(property.price)}
                    </span>
                    <Link to={`/property/${property._id}`} className="view-btn">
                      {t('common.viewDetails')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;
