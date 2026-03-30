import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Contact.css';

function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Hero Section */}
        <div className="contact-hero">
          <h1>{t('contact.title')}</h1>
          <p>{t('contact.subtitle')}</p>
        </div>

        <div className="contact-content">
          {/* Contact Info */}
          <section className="contact-info">
            <h2>{t('contact.getInTouch')}</h2>
            
            <div className="info-items">
              <div className="info-item">
                <h3>{t('contact.addressTitle')}</h3>
                <p>{t('contact.address')}</p>
              </div>

              <div className="info-item">
                <h3>{t('contact.phoneTitle')}</h3>
                <p>{t('contact.phone')}</p>
              </div>

              <div className="info-item">
                <h3>{t('contact.emailTitle')}</h3>
                <p>{t('contact.email')}</p>
              </div>

              <div className="info-item">
                <h3>{t('contact.hoursTitle')}</h3>
                <p>{t('contact.hoursContent')}</p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="contact-map">
              <div className="map-placeholder">
                <p>{t('contact.mapPlaceholder')}</p>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="contact-form-section">
            <h2>{t('contact.sendMessage')}</h2>
            
            {submitted && (
              <div className="success-message">
                {t('contact.successMessage')}
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">{t('contact.formName')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Họ và tên"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">{t('contact.formEmail')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">{t('contact.formPhone')}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Số điện thoại"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">{t('contact.formSubject')}</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Tiêu đề"
                    required
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="message">{t('contact.formMessage')}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Nội dung tin nhắn"
                  rows="6"
                  required
                />
              </div>

              <button type="submit" className="submit-button">
                {t('contact.submitButton')}
              </button>
            </form>
          </section>
        </div>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>{t('contact.faqTitle')}</h2>
          
          <div className="faq-items">
            <div className="faq-item">
              <h4>{t('contact.faq1Question')}</h4>
              <p>{t('contact.faq1Answer')}</p>
            </div>

            <div className="faq-item">
              <h4>{t('contact.faq2Question')}</h4>
              <p>{t('contact.faq2Answer')}</p>
            </div>

            <div className="faq-item">
              <h4>{t('contact.faq3Question')}</h4>
              <p>{t('contact.faq3Answer')}</p>
            </div>

            <div className="faq-item">
              <h4>{t('contact.faq4Question')}</h4>
              <p>{t('contact.faq4Answer')}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;
