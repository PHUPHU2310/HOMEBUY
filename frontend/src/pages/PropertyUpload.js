import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import authService from '../services/authService';
import propertyService from '../services/propertyService';
import './PropertyUpload.css';

function PropertyUpload() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState(null);
  
  // Check if user is authenticated
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      error && setError(t('upload.mustLogin') || 'Bạn phải đăng nhập để đăng sản phẩm');
      navigate('/login');
    }
  }, [navigate, t]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'apartment',
    city: '',
    district: '',
    address: '',
    price: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    amenities: '',
    sellerPhone: '',
    images: [],
  });

  const propertyTypes = [
    { value: 'apartment', label: t('upload.apartmentType') },
    { value: 'house', label: t('upload.houseType') },
    { value: 'land', label: t('upload.landType') },
    { value: 'commercial', label: t('upload.commercialType') },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // Store file objects for now - in production, would upload to cloud storage
    setFormData({
      ...formData,
      images: files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.price || !formData.area) {
        setError(t('upload.requiredFields'));
        setLoading(false);
        return;
      }

      // Prepare FormData for submission with images
      const submitFormData = new FormData();
      submitFormData.append('title', formData.title);
      submitFormData.append('description', formData.description);
      submitFormData.append('type', formData.type);
      submitFormData.append('location', JSON.stringify({
        city: formData.city,
        district: formData.district,
        address: formData.address,
      }));
      submitFormData.append('price', parseInt(formData.price));
      submitFormData.append('area', parseFloat(formData.area));
      submitFormData.append('bedrooms', formData.bedrooms ? parseInt(formData.bedrooms) : 0);
      submitFormData.append('bathrooms', formData.bathrooms ? parseInt(formData.bathrooms) : 0);
      submitFormData.append('amenities', JSON.stringify(
        formData.amenities
          ? formData.amenities.split(',').map((a) => a.trim())
          : []
      ));
      submitFormData.append('sellerPhone', formData.sellerPhone);
      submitFormData.append('status', 'available');

      // Add image files
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((image, index) => {
          submitFormData.append('images', image);
        });
      }

      // Submit to API
      const response = await propertyService.createProperty(submitFormData);

      if (response.data) {
        setSuccess(true);
        setSuccessData(response.data);
        // Reset form
        setFormData({
          title: '',
          description: '',
          type: 'apartment',
          city: '',
          district: '',
          address: '',
          price: '',
          area: '',
          bedrooms: '',
          bathrooms: '',
          amenities: '',
          sellerPhone: '',
          images: [],
        });

        // Redirect to property detail after 3 seconds
        setTimeout(() => {
          navigate(`/property/${response.data._id}`);
        }, 3000);
      }
    } catch (err) {
      setError(t('upload.uploadError'));
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <div className="upload-header">
          <h1>{t('upload.title')}</h1>
          <p>{t('upload.subtitle')}</p>
        </div>

        {success && (
          <div className="success-message">
            <div className="success-content">
              <h3>✅ {t('upload.success')}</h3>
              {successData && (
                <div className="property-success-info">
                  <p><strong>📍 Tên sản phẩm:</strong> {successData.title}</p>
                  <p><strong>💰 Giá:</strong> {successData.price?.toLocaleString('vi-VN')} VND</p>
                  <p><strong>📐 Diện tích:</strong> {successData.area} m²</p>
                  {successData.owner && (
                    <>
                      <p><strong>👤 Người bán:</strong> {successData.owner?.name || 'N/A'}</p>
                      {successData.owner?.phone && (
                        <p><strong>📞 Điện thoại:</strong> {successData.owner.phone}</p>
                      )}
                    </>
                  )}
                  <p style={{ marginTop: '10px', color: '#666', fontSize: '0.9em' }}>
                    Sản phẩm sẽ tự chuyển hướng trong 3 giây...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="upload-form">
          {/* Basic Information */}
          <fieldset className="form-section">
            <legend>{t('upload.basicInfo')}</legend>

            <div className="form-group">
              <label>{t('upload.formTitle')} *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder={t('upload.titlePlaceholder')}
                required
              />
            </div>

            <div className="form-group">
              <label>{t('upload.description')}</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder={t('upload.descriptionPlaceholder')}
                rows={5}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{t('upload.type')} *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  {propertyTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>{t('upload.status')}:</label>
                <p className="status-note">{t('upload.statusDefault')}</p>
              </div>
            </div>
          </fieldset>

          {/* Location Information */}
          <fieldset className="form-section">
            <legend>{t('upload.locationInfo')}</legend>

            <div className="form-group">
              <label>{t('upload.city')} *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder={t('upload.cityPlaceholder')}
                required
              />
            </div>

            <div className="form-group">
              <label>{t('upload.district')}</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                placeholder={t('upload.districtPlaceholder')}
              />
            </div>

            <div className="form-group">
              <label>{t('upload.address')} *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder={t('upload.addressPlaceholder')}
                required
              />
            </div>
          </fieldset>

          {/* Price & Area */}
          <fieldset className="form-section">
            <legend>{t('upload.priceArea')}</legend>

            <div className="form-row">
              <div className="form-group">
                <label>{t('upload.price')} (VND) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder={t('upload.pricePlaceholder')}
                  required
                />
              </div>

              <div className="form-group">
                <label>{t('upload.area')} (m²) *</label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder={t('upload.areaPlaceholder')}
                  step="0.01"
                  required
                />
              </div>
            </div>
          </fieldset>

          {/* Rooms & Facilities */}
          <fieldset className="form-section">
            <legend>{t('upload.facilities')}</legend>

            <div className="form-row">
              <div className="form-group">
                <label>{t('upload.bedrooms')}</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>{t('upload.bathrooms')}</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label>{t('upload.amenities')}</label>
              <textarea
                name="amenities"
                value={formData.amenities}
                onChange={handleInputChange}
                placeholder={t('upload.amenitiesPlaceholder')}
                rows={3}
              />
              <small>{t('upload.amenitiesHelp')}</small>
            </div>
          </fieldset>

          {/* Contact Information */}
          <fieldset className="form-section">
            <legend>Thông tin liên hệ</legend>

            <div className="form-group">
              <label>Điện thoại người bán *</label>
              <input
                type="tel"
                name="sellerPhone"
                value={formData.sellerPhone}
                onChange={handleInputChange}
                placeholder="Nhập số điện thoại của bạn"
                required
              />
              <small>Số điện thoại sẽ được hiển thị cho người quan tâm</small>
            </div>
          </fieldset>

          {/* Images Upload */}
          <fieldset className="form-section">
            <legend>{t('upload.uploadImages')}</legend>

            <div className="form-group">
              <label htmlFor="images">{t('upload.selectImages')}</label>
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
              <small>Chọn 1 hoặc nhiều hình ảnh để đăng tải</small>
              {formData.images.length > 0 && (
                <p className="images-count">
                  {formData.images.length} hình ảnh được chọn
                </p>
              )}
            </div>
          </fieldset>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? t('upload.uploading') : t('upload.submitButton')}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              {t('upload.cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PropertyUpload;
