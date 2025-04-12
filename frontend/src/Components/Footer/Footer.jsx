import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './footer.css'
const Footer = () => {
  return (
    <footer className="footer-section bg-dark text-light py-4">
      <div className="container text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} CareConnect. All rights reserved.</p>
        <div className="d-flex justify-content-center gap-4 mb-2">
          <a href="/" className="text-light fs-5"><FaFacebookF /></a>
          <a href="/" className="text-light fs-5"><FaTwitter /></a>
          <a href="/" className="text-light fs-5"><FaInstagram /></a>
          <a href="/" className="text-light fs-5"><FaLinkedin /></a>
        </div>
        <p className="text-muted small">Contact: support@Careconnect.com | Phone: +91-9876543210</p>
      </div>
    </footer>
  );
};

export default Footer;
