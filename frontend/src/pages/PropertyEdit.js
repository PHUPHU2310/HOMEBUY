import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import propertyService from '../services/propertyService';
import transactionService from '../services/transactionService';
import authService from '../services/authService';
import './PropertyEdit.css';

function PropertyEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const currentUser = authService.getCurrentUser();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    status: '',
    price: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    city: '',
    district: '',
    address: '',
    amenities: '',
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await propertyService.getPropertyById(id);
        const prop = response.data;

        // Check if current user is the owner
        if (prop.owner._id !== currentUser.id) {
          setError('Bạn không có quyền chỉnh sửa bất động sản này');
          setLoading(false);
          return;
        }

        setProperty(prop);
        setFormData({
          title: prop.title || '',
          description: prop.description || '',
          type: prop.type || '',
          status: prop.status || '',
          price: prop.price || '',
          area: prop.area || '',
          bedrooms: prop.bedrooms || '',
          bathrooms: prop.bathrooms || '',
          city: prop.location?.city || '',
          district: prop.location?.district || '',
          address: prop.location?.address || '',
          amenities: prop.amenities?.join(', ') || '',
        });
        setLoading(false);
      } catch (err) {
        setError('Không thể tải thông tin bất động sản');
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, currentUser.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    try {
      setIsSaving(true);
      setError(null);

      const updateData = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        status: formData.status,
        price: parseInt(formData.price) || 0,
        area: parseInt(formData.area) || 0,
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        location: {
          city: formData.city,
          district: formData.district,
          address: formData.address,
        },
        amenities: formData.amenities
          .split(',')
          .map((a) => a.trim())
          .filter((a) => a),
      };

      // Check if status changed from "available" to "sold" or "rented"
      const oldStatus = property.status?.toLowerCase();
      const newStatus = formData.status?.toLowerCase();
      
      const statusChanged = oldStatus === 'available' && 
                           (newStatus === 'sold' || newStatus === 'rented');

      // Update property first
      await propertyService.updateProperty(id, updateData);

      // If status changed to sold/rented, create transaction record
      if (statusChanged) {
        const transactionData = {
          title: `${newStatus === 'sold' ? 'Giao dịch bán' : 'Giao dịch cho thuê'} ${formData.title}`,
          propertyId: id,
          sellerId: currentUser.id,
          price: parseInt(formData.price) || 0,
          transactionDate: new Date(),
          status: newStatus === 'sold' ? 'Completed' : 'Completed',
          type: newStatus === 'sold' ? 'Sale' : 'Rental',
          description: `${newStatus === 'sold' ? 'Bán' : 'Cho thuê'} ${formData.type} độc quyền`,
          notes: `${formData.address}, ${formData.city}`,
        };

        await transactionService.createTransaction(transactionData);
      }

      setSuccessMessage('✅ Cập nhật bất động sản thành công!');
      
      setTimeout(() => {
        navigate(`/property/${id}`);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể cập nhật bất động sản');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      '⚠️ Xác nhận xóa bất động sản này?\n\nHành động này không thể hoàn tác!'
    );

    if (!confirmed) return;

    try {
      setIsSaving(true);
      setError(null);

      // Delete the property
      await propertyService.deleteProperty(id);

      setSuccessMessage('✅ Bất động sản đã được xóa thành công!');
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể xóa bất động sản');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="edit-loading">Đang tải...</div>;
  }

  if (error && !property) {
    return <div className="edit-error">{error}</div>;
  }

  if (!property) {
    return <div className="edit-error">Không tìm thấy bất động sản</div>;
  }

  return (
    <div className="property-edit-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Quay lại
      </button>

      <div className="edit-container">
        <div className="edit-card">
          <h1>Chỉnh Sửa Bất Động Sản</h1>
          
          {successMessage && <div className="success-message">{successMessage}</div>}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSave}>
            {/* Basic Info */}
            <div className="form-section">
              <h3>Thông Tin Cơ Bản</h3>

              <div className="form-group">
                <label htmlFor="title">Tiêu Đề</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Nhập tiêu đề"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Mô Tả Chi Tiết</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Nhập mô tả chi tiết"
                  rows="4"
                  className="form-textarea"
                  required
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="type">Loại Bất Động Sản</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">-- Chọn loại --</option>
                    <option value="house">Nhà phố</option>
                    <option value="apartment">Căn hộ</option>
                    <option value="land">Đất nền</option>
                    <option value="commercial">Nhà mặt phố</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="status">Trạng Thái</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">-- Chọn trạng thái --</option>
                    <option value="available">Có sẵn</option>
                    <option value="sold">Đã bán</option>
                    <option value="rented">Đã cho thuê</option>
                    <option value="under-review">Đang xem xét</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="form-section">
              <h3>Thông Tin Vị Trí</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">Thành Phố</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="VD: Hồ Chí Minh"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="district">Quận/Huyện</label>
                  <input
                    type="text"
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    placeholder="VD: Quận 1"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Địa Chỉ</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="VD: 123 Nguyễn Huệ"
                  className="form-input"
                />
              </div>
            </div>

            {/* Price & Area */}
            <div className="form-section">
              <h3>Giá & Diện Tích</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Giá (VND)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="VD: 5000000000"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="area">Diện Tích (m²)</label>
                  <input
                    type="number"
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="VD: 100"
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Facilities */}
            <div className="form-section">
              <h3>Tiện Nghi & Phòng</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bedrooms">Số Phòng Ngủ</label>
                  <input
                    type="number"
                    id="bedrooms"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    placeholder="VD: 2"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bathrooms">Số Phòng Tắm</label>
                  <input
                    type="number"
                    id="bathrooms"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    placeholder="VD: 1"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="amenities">Tiện Nghi</label>
                <textarea
                  id="amenities"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleInputChange}
                  placeholder="VD: Máy lạnh, Tủ lạnh, Bếp (cách nhau bằng dấu phẩy)"
                  rows="2"
                  className="form-textarea"
                ></textarea>
              </div>
            </div>

            {/* Buttons */}
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={isSaving}>
                {isSaving ? 'Đang lưu...' : '💾 Lưu thay đổi'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
                disabled={isSaving}
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={isSaving}
                title="Xóa bất động sản này vĩnh viễn"
              >
                🗑️ Xóa bất động sản
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PropertyEdit;
