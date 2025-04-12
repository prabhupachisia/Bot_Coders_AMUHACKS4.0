import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <p className="footer-text">&copy; {new Date().getFullYear()} <span className="brand-name">CareConnect</span>. All rights reserved.</p>
        <div className="footer-icons">
          <a href="/" className="social-icon" aria-label="Facebook"><FaFacebookF /></a>
          <a href="/" className="social-icon" aria-label="Twitter"><FaTwitter /></a>
          <a href="/" className="social-icon" aria-label="Instagram"><FaInstagram /></a>
          <a href="/" className="social-icon" aria-label="LinkedIn"><FaLinkedin /></a>
        </div>
        <p className="footer-contact">Contact: <a href="mailto:support@Careconnect.com">support@Careconnect.com</a> | Phone: +91-9876543210</p>
      </div>
    </footer>
  );
};

export default Footer;
