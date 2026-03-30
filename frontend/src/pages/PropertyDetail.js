import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import propertyService from '../services/propertyService';
import authService from '../services/authService';
import './PropertyDetail.css';

function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const currentUser = authService.getCurrentUser();
  const isOwner = property && currentUser && property.owner._id === currentUser.id;

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await propertyService.getPropertyById(id);
        setProperty(response.data);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải thông tin bất động sản');
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (property?.images?.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === (property?.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return <div className="property-loading">Đang tải...</div>;
  }

  if (error) {
    return <div className="property-error">{error}</div>;
  }

  if (!property) {
    return <div className="property-error">Không tìm thấy bất động sản</div>;
  }

  const displayImage =
    property.images && property.images.length > 0
      ? property.images[currentImageIndex]
      : 'https://via.placeholder.com/600x400?text=No+Image';

  return (
    <div className="property-detail">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Quay lại
      </button>

      <div className="property-detail-container">
        {/* Hình ảnh */}
        <div className="property-gallery">
          <div className="gallery-main">
            <img src={displayImage} alt={property.title} />
            {property.images && property.images.length > 1 && (
              <>
                <button className="gallery-btn prev" onClick={handlePrevImage}>
                  ❮
                </button>
                <button className="gallery-btn next" onClick={handleNextImage}>
                  ❯
                </button>
                <div className="gallery-counter">
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </>
            )}
          </div>
          {property.images && property.images.length > 0 && (
            <div className="gallery-thumbnails">
              {property.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className={currentImageIndex === idx ? 'active' : ''}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thông tin chi tiết */}
        <div className="property-info">
          <div className="property-header">
            <div>
              <h1>{property.title}</h1>
              <p className="property-location">
                {property.location?.address}, {property.location?.city}
              </p>
            </div>
            <div className="header-actions">
              {isOwner && (
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/property/${id}/edit`)}
                  title="Chỉnh sửa bất động sản"
                >
                  ✏️ Chỉnh sửa
                </button>
              )}
              <button
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={toggleFavorite}
              >
                {isFavorite ? '❤️' : '🤍'}
              </button>
            </div>
          </div>

          <div className="property-price">
            <span className="price">
              {property.price?.toLocaleString('vi-VN')} VND
            </span>
            <span className={`status ${property.status?.toLowerCase()}`}>
              {property.status}
            </span>
          </div>

          <div className="property-features">
            <div className="feature">
              <span className="label">Loại BĐS:</span>
              <span className="value">{property.type}</span>
            </div>
            {property.bedrooms && (
              <div className="feature">
                <span className="label">Phòng ngủ:</span>
                <span className="value">{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="feature">
                <span className="label">Phòng tắm:</span>
                <span className="value">{property.bathrooms}</span>
              </div>
            )}
            {property.area && (
              <div className="feature">
                <span className="label">Diện tích:</span>
                <span className="value">{property.area} m²</span>
              </div>
            )}
          </div>

          <div className="property-description">
            <h3>Mô tả chi tiết</h3>
            <p>{property.description}</p>
          </div>

          {property.amenities && property.amenities.length > 0 && (
            <div className="property-amenities">
              <h3>Tiện nghi</h3>
              <ul>
                {property.amenities.map((amenity, idx) => (
                  <li key={idx}>{amenity}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="property-owner">
            <h3>Thông tin liên hệ</h3>
            {property.owner ? (
              <div className="owner-info">
                <p><strong>Người bán:</strong> 
                  <span 
                    className="owner-name-clickable"
                    onClick={() => navigate(`/user/${property.owner._id}`)}
                  >
                    {property.owner.name}
                  </span>
                </p>
                <p><strong>Email:</strong> {property.owner.email}</p>
                <button 
                  className="contact-btn"
                  onClick={() => navigate(`/user/${property.owner._id}`)}
                >
                  Liên hệ ngay
                </button>
              </div>
            ) : (
              <p>Thông tin liên hệ sẽ sớm được cập nhật</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
