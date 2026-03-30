import React from 'react';
import './Home.css';

function Home() {
  const handleGoToApp = () => {
    // Chuyển sang port 3000 (frontend app)
    window.location.href = 'http://localhost:3000';
  };

  return (
    <main className="home">
      <section className="hero">
        {/* Background decorations */}
        <div className="bg-decoration top-left"></div>
        <div className="bg-decoration bottom-right"></div>

        <div className="hero-content">
          {/* Logo */}
          <div className="logo-container">
            <svg className="logo-icon" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              {/* Green house */}
              <g>
                {/* Roof */}
                <polygon points="100,40 160,100 40,100" fill="#1ba330"/>
                
                {/* House body */}
                <rect x="50" y="100" width="100" height="80" fill="#1ba330" rx="4"/>
                
                {/* Door */}
                <rect x="85" y="125" width="30" height="50" fill="#0f4d22" rx="2"/>
                <circle cx="112" cy="150" r="2" fill="#d97634"/>
                
                {/* Window 1 */}
                <rect x="60" y="110" width="15" height="15" fill="#0f4d22" rx="2"/>
                {/* Window 2 */}
                <rect x="125" y="110" width="15" height="15" fill="#0f4d22" rx="2"/>
              </g>
              
              {/* Blue decorative curves */}
              <path d="M 170 20 Q 190 40, 200 80" stroke="#6BA3D9" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.8"/>
              <path d="M 175 10 Q 195 25, 205 60" stroke="#A8C5E0" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6"/>
              
              <path d="M 10 140 Q 20 110, 30 70" stroke="#6BA3D9" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.8"/>
              <path d="M 5 160 Q 15 130, 25 80" stroke="#A8C5E0" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6"/>
            </svg>
          </div>

          {/* HOMEBUY Text */}
          <h1 className="homebuy-title">HOMEBUY</h1>

          {/* Welcome Box - Clickable */}
          <button className="welcome-box" onClick={handleGoToApp}>
            <p>WELCOME !</p>
            <p>GOTO HOMEBUY</p>
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;
