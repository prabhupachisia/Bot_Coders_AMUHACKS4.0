import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaSearch, FaHeartbeat } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: '#f9fdfd', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          style={{ color: '#0d6efd', fontWeight: 'bold', fontSize: '1.5rem', textDecoration: 'none' }}
        >
          <FaHeartbeat className="me-2" style={{ color: '#0d6efd' }} />
          CareConnect
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Home */}
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: '#333' }}>
                Home
              </Link>
            </li>

            {/* Consultations Dropdown */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                id="consultationsDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: '#333', textDecoration: 'none' }}
              >
                Consultations
              </button>
              <ul className="dropdown-menu" aria-labelledby="consultationsDropdown">
                <li>
                  <Link className="dropdown-item" to="/new-consultation">
                    New Consultation
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/history">
                    History
                  </Link>
                </li>
              </ul>
            </li>

            {/* Services */}
            <li className="nav-item">
              <Link className="nav-link" to="/services" style={{ color: '#333' }}>
                Services
              </Link>
            </li>

            {/* Contact */}
            <li className="nav-item">
              <Link className="nav-link" to="/contact" style={{ color: '#333' }}>
                Contact
              </Link>
            </li>

            {/* Careers Dropdown */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                id="careersDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: '#333', textDecoration: 'none' }}
              >
                Careers
              </button>
              <ul className="dropdown-menu" aria-labelledby="careersDropdown">
                <li>
                  <Link className="dropdown-item" to="/careers/doctor-reg">
                    Doctor
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/careers/hospitals-reg">
                    Hospitals
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          {/* Search */}
          <form className="d-flex me-3" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search doctors..."
              aria-label="Search"
            />
            <button className="btn btn-outline-primary" type="submit">
              <FaSearch />
            </button>
          </form>

          {/* Login and Register */}
          <div className="d-flex gap-2 me-3">
            <Link to="/login" className="btn btn-outline-success">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline-primary">
              Register
            </Link>
          </div>

          {/* Profile Dropdown */}
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
              type="button"
              id="profileDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaUserCircle className="me-2" size={20} />
              Profile
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
              <li>
                <Link className="dropdown-item" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/settings">
                  Settings
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
