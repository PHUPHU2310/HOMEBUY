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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
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
              <iframe
                title="thanh-xuan-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.9294877481323!2d105.82969072346906!3d21.024543780652597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab7c5f5de5f5%3A0x123a4b5c6d7e8f9g!2sThnh%20Xun%2C%20Ha%20Noi!5e0!3m2!1svi!2svn!4v1234567890123"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
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
            {error && (
              <div className="error-message">
                {error}
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

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Đang gửi...' : t('contact.submitButton')}
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
