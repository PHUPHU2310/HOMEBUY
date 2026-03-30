import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropertyList from './pages/PropertyList';
import PropertyDetail from './pages/PropertyDetail';
import PropertyEdit from './pages/PropertyEdit';
import PropertyUpload from './pages/PropertyUpload';
import TransactionList from './pages/TransactionList';
import Explore from './pages/Explore';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import LanguageSwitcher from './components/LanguageSwitcher';
import authService from './services/authService';
import './App.css';

function AppContent() {
  const [user, setUser] = useState(null);
  const { t } = useTranslation();
  const location = useLocation();

  // Load user on mount and when location changes (e.g., after login)
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, [location]);

  // Also listen for storage changes (in case login happens in another tab)
  useEffect(() => {
    const handleStorageChange = () => {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    window.location.href = '/';
  };

  const handleBackToLanding = () => {
    window.location.href = 'http://localhost:3000';
  };

  return (
    <div className="app">
      {/* Navigation Header */}
      <header className="app-header">
          <div className="header-container">
            <Link to="/" className="logo">
              <img src="/Logo_HOMEBUY.png" alt={t('header.appName')} className="logo-img" />
              <span className="logo-text">HOMEBUY</span>
            </Link>

            <nav className="nav-menu">
              <button className="nav-link back-btn" onClick={handleBackToLanding} title="Exit to landing page">
                ✕ {t('header.exit') || 'Exit'}
              </button>
              <Link to="/" className="nav-link">
                {t('header.properties')}
              </Link>
              <Link to="/explore" className="nav-link">
                {t('header.explore')}
              </Link>
              <Link to="/transactions" className="nav-link">
                {t('header.transactions')}
              </Link>
              <Link to="/about" className="nav-link">
                {t('header.about')}
              </Link>
              <Link to="/contact" className="nav-link">
                {t('header.contact')}
              </Link>
              {user && (
                <Link to="/upload" className="nav-link upload-link">
                  {t('upload.title')}
                </Link>
              )}
            </nav>

            <div className="header-actions">
              <LanguageSwitcher />
              <div className="auth-buttons">
                {user ? (
                  <div className="user-menu">
                    <Link to={`/user/${user.id}`} className="user-name-link">
                      {user.name}
                    </Link>
                    <button className="logout-btn" onClick={handleLogout}>
                      {t('header.logout')}
                    </button>
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-secondary">
                      {t('header.login')}
                    </Link>
                    <Link to="/register" className="btn btn-primary">
                      {t('header.register')}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="app-main">
          <Routes>
            {/* Home - Property List */}
            <Route path="/" element={<PropertyList />} />

            {/* Explore */}
            <Route path="/explore" element={<Explore />} />

            {/* Property Detail */}
            <Route path="/property/:id" element={<PropertyDetail />} />

            {/* Property Edit */}
            {user && <Route path="/property/:id/edit" element={<PropertyEdit />} />}

            {/* User Profile */}
            <Route path="/user/:userId" element={<UserProfile />} />

            {/* Property Upload */}
            {user && <Route path="/upload" element={<PropertyUpload />} />}

            {/* Transactions */}
            <Route path="/transactions" element={<TransactionList />} />

            {/* About & Contact */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <div className="footer-container">
            <div className="footer-section">
              <h4>{t('footer.aboutTitle')}</h4>
              <p>{t('footer.aboutDesc')}</p>
            </div>

            <div className="footer-section">
              <h4>{t('footer.linksTitle')}</h4>
              <ul>
                <li><Link to="/">{t('footer.home')}</Link></li>
                <li><Link to="/transactions">{t('footer.transactions')}</Link></li>
                <li><Link to="/about">{t('footer.about')}</Link></li>
                <li><Link to="/contact">{t('footer.contact')}</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>{t('footer.contactTitle')}</h4>
              <p>Email: contact@realestate.com</p>
              <p>Điện thoại: (84) 1234 567 890</p>
            </div>

            <div className="footer-section">
              <h4>{t('footer.followTitle')}</h4>
              <div className="social-links">
                <a href="#facebook">Facebook</a>
                <a href="#twitter">Twitter</a>
                <a href="#instagram">Instagram</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>{t('footer.copyright')}</p>
          </div>
        </footer>
      </div>
    );
  }

  function App() {
    return (
      <Router>
        <AppContent />
      </Router>
    );
  }

  export default App;
