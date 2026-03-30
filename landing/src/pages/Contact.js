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
                <p>Nguyễn Tuân, phường Thanh Xuân<br />T.P Hà Nội, Vietnam</p>
              </div>

              <div className="info-card">
                <h3>📞 {t('contact.phoneLabel')}</h3>
                <p>+84916345323</p>
              </div>

              <div className="info-card">
                <h3>✉️ {t('contact.emailLabel')}</h3>
                <p>Homebuy@gmail.com</p>
              </div>

              <div className="info-card">
                <h3>🕐 {t('contact.hoursLabel')}</h3>
                <p>Thứ Hai - Thứ Sáu: 8:00 - 18:00<br />Thứ Bảy: 9:00 - 17:00<br />Chủ Nhật: Nghỉ</p>
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

      <section className="contact-map">
        <div className="container">
          <h2>{t('contact.mapTitle') || 'Vị Trí Của Chúng Tôi'}</h2>
          <div className="map-container">
            <iframe
              title="thanh-xuan-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.9294877481323!2d105.82969072346906!3d21.024543780652597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab7c5f5de5f5%3A0x123a4b5c6d7e8f9g!2sTh%C3%A0nh%20Xu%C3%A2n%2C%20Ha%20Noi!5e0!3m2!1svi!2svn!4v1234567890123"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
