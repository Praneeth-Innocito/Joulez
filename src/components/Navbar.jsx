import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo-link">
          <div className="logo-icon-container">
            <Zap className="logo-icon" size={20} color="#6c5dd3" fill="#6c5dd3" />
          </div>
          <span className="logo-text">JOULEZ</span>
        </Link>
      </div>
      
      <div className="navbar-links">
        <a href="#cars" className="nav-link">Our Cars</a>
        <a href="#locations" className="nav-link">Locations</a>
        <a href="#business" className="nav-link">For Business</a>
      </div>
      
      <div className="navbar-actions">
        <button className="btn-outline">Log in</button>
        <button className="btn-primary">Join Us</button>
      </div>
    </nav>
  );
};

export default Navbar;
