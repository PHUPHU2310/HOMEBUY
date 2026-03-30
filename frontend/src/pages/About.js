import React from 'react';
import { useTranslation } from 'react-i18next';
import './About.css';

function About() {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <div className="about-container">
        {/* Hero Section */}
        <div className="about-hero">
          <h1>{t('about.title')}</h1>
          <p>{t('about.subtitle')}</p>
        </div>

        {/* About Section */}
        <section className="about-section">
          <div className="about-content">
            <h2>{t('about.aboutTitle')}</h2>
            <p>{t('about.aboutDesc')}</p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <div className="mission-content">
            <h2>{t('about.missionTitle')}</h2>
            <p>{t('about.missionDesc')}</p>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <h2>{t('about.valuesTitle')}</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>{t('about.value1Title')}</h3>
              <p>{t('about.value1Desc')}</p>
            </div>
            <div className="value-card">
              <h3>{t('about.value2Title')}</h3>
              <p>{t('about.value2Desc')}</p>
            </div>
            <div className="value-card">
              <h3>{t('about.value3Title')}</h3>
              <p>{t('about.value3Desc')}</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2>{t('about.featuresTitle')}</h2>
          <div className="features-list">
            <div className="feature-item">
              <h4>{t('about.feature1')}</h4>
              <p>{t('about.feature1Desc')}</p>
            </div>
            <div className="feature-item">
              <h4>{t('about.feature2')}</h4>
              <p>{t('about.feature2Desc')}</p>
            </div>
            <div className="feature-item">
              <h4>{t('about.feature3')}</h4>
              <p>{t('about.feature3Desc')}</p>
            </div>
            <div className="feature-item">
              <h4>{t('about.feature4')}</h4>
              <p>{t('about.feature4Desc')}</p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stat-item">
            <h3>10,000+</h3>
            <p>{t('about.statsProperties')}</p>
          </div>
          <div className="stat-item">
            <h3>50,000+</h3>
            <p>{t('about.statsUsers')}</p>
          </div>
          <div className="stat-item">
            <h3>1,000,000+</h3>
            <p>{t('about.statsTransactions')}</p>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="why-choose-us-section">
          <h2>{t('about.whyChooseUsTitle')}</h2>
          <div className="why-choose-us-grid">
            <div className="why-choose-us-card">
              <div className="icon">✓</div>
              <h4>{t('about.why1Title')}</h4>
              <p>{t('about.why1Desc')}</p>
            </div>
            <div className="why-choose-us-card">
              <div className="icon">✓</div>
              <h4>{t('about.why2Title')}</h4>
              <p>{t('about.why2Desc')}</p>
            </div>
            <div className="why-choose-us-card">
              <div className="icon">✓</div>
              <h4>{t('about.why3Title')}</h4>
              <p>{t('about.why3Desc')}</p>
            </div>
            <div className="why-choose-us-card">
              <div className="icon">✓</div>
              <h4>{t('about.why4Title')}</h4>
              <p>{t('about.why4Desc')}</p>
            </div>
            <div className="why-choose-us-card">
              <div className="icon">✓</div>
              <h4>{t('about.why5Title')}</h4>
              <p>{t('about.why5Desc')}</p>
            </div>
            <div className="why-choose-us-card">
              <div className="icon">✓</div>
              <h4>{t('about.why6Title')}</h4>
              <p>{t('about.why6Desc')}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
