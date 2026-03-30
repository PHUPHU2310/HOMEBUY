import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Contact.css';

function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <main className="contact">
      <section className="contact-hero">
        <div className="container">
          <h1>{t('contact.title')}</h1>
          <p>{t('contact.subtitle')}</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>{t('contact.infoTitle')}</h2>
              
              <div className="info-card">
                <h3>📍 {t('contact.addressLabel')}</h3>
                <p>123 Real Estate Street<br />Ho Chi Minh City, Vietnam</p>
              </div>

              <div className="info-card">
                <h3>📞 {t('contact.phoneLabel')}</h3>
                <p>+84 (0) 123 456 789</p>
              </div>

              <div className="info-card">
                <h3>✉️ {t('contact.emailLabel')}</h3>
                <p>info@homebuy.vn</p>
              </div>

              <div className="info-card">
                <h3>🕐 {t('contact.hoursLabel')}</h3>
                <p>{t('contact.hours')}</p>
              </div>
            </div>

            <div className="contact-form-wrapper">
              {submitted && (
                <div className="success-message">
                  <p>✓ {t('contact.successMessage')}</p>
                </div>
              )}
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2>{t('contact.formTitle')}</h2>
                
                <div className="form-group">
                  <label htmlFor="name">{t('contact.nameLabel')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.namePlaceholder')}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">{t('contact.emailLabel')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.emailPlaceholder')}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">{t('contact.phoneLabel')}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('contact.phonePlaceholder')}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">{t('contact.messageLabel')}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder={t('contact.messagePlaceholder')}
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary btn-submit">
                  {t('contact.submitButton')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
