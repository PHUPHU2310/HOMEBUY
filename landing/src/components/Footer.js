import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>{t('footer.company')}</h4>
          <ul>
            <li><a href="#about">{t('footer.about')}</a></li>
            <li><a href="#services">{t('footer.services')}</a></li>
            <li><a href="#contact">{t('footer.contact')}</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>{t('footer.support')}</h4>
          <ul>
            <li><a href="#help">{t('footer.help')}</a></li>
            <li><a href="#faq">{t('footer.faq')}</a></li>
            <li><a href="#feedback">{t('footer.feedback')}</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>{t('footer.connect')}</h4>
          <ul>
            <li><a href="#facebook">Facebook</a></li>
            <li><a href="#twitter">Twitter</a></li>
            <li><a href="#instagram">Instagram</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} HOMEBUY. {t('footer.rights')}</p>
      </div>
    </footer>
  );
}

export default Footer;
