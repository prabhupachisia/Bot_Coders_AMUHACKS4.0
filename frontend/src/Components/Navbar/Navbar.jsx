import React from 'react';
import { FaUserCircle, FaSearch, FaHeartbeat } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#f9fdfd', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="/" style={{ color: '#0d6efd', fontWeight: 'bold', fontSize: '1.5rem' }}>
          <FaHeartbeat className="me-2" style={{ color: '#0d6efd' }} />
          CareConnect
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/" style={{ color: '#333' }}>Home</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/consultations" role="button" data-bs-toggle="dropdown" style={{ color: '#333' }}>
                Consultations
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/new-consultation">New Consultation</a></li>
                <li><a className="dropdown-item" href="/history">History</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/services" style={{ color: '#333' }}>Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact" style={{ color: '#333' }}>Contact</a>
            </li>
          </ul>

          <form className="d-flex me-3" role="search">
            <input className="form-control me-2" type="search" placeholder="Search doctors..." aria-label="Search" />
            <button className="btn btn-outline-primary" type="submit">
              <FaSearch />
            </button>
          </form>

          <div className="dropdown">
            <button className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <FaUserCircle className="me-2" size={20} />
              Profile
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
              <li><a className="dropdown-item" href="/dashboard">Dashboard</a></li>
              <li><a className="dropdown-item" href="/settings">Settings</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="/logout">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
