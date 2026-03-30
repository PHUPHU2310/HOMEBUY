import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'vi', name: '🇻🇳 Tiếng Việt', nativeName: 'Tiếng Việt' },
    { code: 'en', name: '🇬🇧 English', nativeName: 'English' },
    { code: 'zh', name: '🇨🇳 中文', nativeName: '中文' },
  ];

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="language-switcher">
      <div className="language-menu">
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`language-btn ${i18n.language === lang.code ? 'active' : ''}`}
            onClick={() => handleLanguageChange(lang.code)}
            title={lang.nativeName}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LanguageSwitcher;
