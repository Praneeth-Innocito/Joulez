import React from 'react';
import SearchWidget from '../components/SearchWidget';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <img src="/images/hero_bg.png" alt="Electric vehicle driving through forest" className="hero-bg" />
        
        <div className="hero-content">
          <h1 className="hero-title">EV Rentals</h1>
          <p className="hero-subtitle">Experience the future of driving with Joulez.</p>
          
          <div className="hero-search-wrapper">
            <SearchWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
