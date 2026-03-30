import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Header.css';

function Header({ onChangeLanguage }) {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLanguageChange = (lng) => {
    onChangeLanguage(lng);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <span className="logo-text">HOMEBUY</span>
          </Link>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            {t('common.home')}
          </Link>
          <Link to="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            {t('common.contact')}
          </Link>
          <a 
            href="http://localhost:3001" 
            className="nav-link nav-app-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('common.app')}
          </a>
        </nav>

        <div className="language-selector">
          <button
            className={`lang-btn ${i18n.language === 'vi' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('vi')}
          >
            VI
          </button>
          <button
            className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('en')}
          >
            EN
          </button>
          <button
            className={`lang-btn ${i18n.language === 'zh' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('zh')}
          >
            ZH
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
