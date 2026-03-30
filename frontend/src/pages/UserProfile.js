import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './UserProfile.css';

function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: '',
  });

  // Check if this is the current logged-in user
  const currentUser = authService.getCurrentUser();
  const isOwnProfile = currentUser && currentUser.id === userId;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await authService.getUserProfile(userId);
        setUser(response.data);
        setFormData({
          name: response.data.name || '',
          phone: response.data.phone || '',
          bio: response.data.bio || '',
        });
        setLoading(false);
      } catch (err) {
        setError('Không thể tải thông tin người dùng');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setSuccessMessage('');
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      await authService.updateProfile(formData);
      
      // Update local user state
      setUser({
        ...user,
        ...formData,
      });
      
      // Update localStorage
      authService.setUser({
        ...currentUser,
        ...formData,
      });
      
      setSuccessMessage('✅ Cập nhật thông tin thành công!');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Không thể cập nhật thông tin. Vui lòng thử lại.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="user-profile-loading">Đang tải...</div>;
  }

  if (error && !user) {
    return <div className="user-profile-error">{error}</div>;
  }

  if (!user) {
    return <div className="user-profile-error">Không tìm thấy người dùng</div>;
  }

  return (
    <div className="user-profile-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Quay lại
      </button>

      <div className="user-profile-container">
        <div className="user-profile-card">
          {/* Avatar */}
          <div className="user-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <div className="avatar-placeholder">
                {user.name?.charAt(0)?.toUpperCase()}
              </div>
            )}
          </div>

          {/* User Info Header */}
          <div className="user-info-header">
            <div>
              <h1>{isEditing ? formData.name : user.name}</h1>
              <p className="user-role">
                {user.role === 'Agent' ? '🏢 Tác Nhân Bất Động Sản' : '👤 Người dùng'}
              </p>
            </div>
            {isOwnProfile && (
              <button 
                className={`edit-btn ${isEditing ? 'editing' : ''}`}
                onClick={handleEditToggle}
              >
                {isEditing ? '✕ Hủy' : '✏️ Chỉnh sửa'}
              </button>
            )}
          </div>

          {/* Success/Error Messages */}
          {successMessage && <div className="success-message">{successMessage}</div>}
          {error && <div className="error-message">{error}</div>}

          {/* View Mode */}
          {!isEditing ? (
            <>
              {/* Contact Information */}
              <div className="user-contact-info">
                <h2>Thông tin liên hệ</h2>
                
                <div className="contact-item">
                  <span className="contact-label">📧 Email:</span>
                  <span className="contact-value">{user.email}</span>
                </div>

                {user.phone && (
                  <div className="contact-item">
                    <span className="contact-label">📞 Điện thoại:</span>
                    <span className="contact-value">{user.phone}</span>
                  </div>
                )}

                {user.bio && (
                  <div className="contact-item full-width">
                    <span className="contact-label">📝 Tiểu sử:</span>
                    <p className="contact-value bio">{user.bio}</p>
                  </div>
                )}

                {user.createdAt && (
                  <div className="contact-item">
                    <span className="contact-label">📅 Tham gia ngày:</span>
                    <span className="contact-value">
                      {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {!isOwnProfile && (
                <div className="user-actions">
                  <a href={`mailto:${user.email}`} className="btn btn-primary">
                    📧 Gửi Email
                  </a>
                  {user.phone && (
                    <a href={`tel:${user.phone}`} className="btn btn-secondary">
                      📞 Gọi điện
                    </a>
                  )}
                </div>
              )}

              {/* Additional Info */}
              {!isOwnProfile && (
                <div className="user-additional-info">
                  <p className="info-text">
                    📌 Liên hệ với {user.name} để tìm hiểu thêm về các bất động sản hoặc dịch vụ của họ.
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Edit Mode */
            <form className="profile-edit-form" onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
              <div className="form-group">
                <label htmlFor="name">Tên:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên của bạn"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Số điện thoại:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Nhập số điện thoại"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">Tiểu sử:</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Nhập tiểu sử của bạn"
                  rows="4"
                  className="form-textarea"
                ></textarea>
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSaving}
                >
                  {isSaving ? 'Đang lưu...' : '💾 Lưu thay đổi'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={handleEditToggle}
                  disabled={isSaving}
                >
                  Hủy
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
