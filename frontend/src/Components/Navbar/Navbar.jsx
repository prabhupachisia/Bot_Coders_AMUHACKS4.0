import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSearch, FaHeartbeat } from 'react-icons/fa';

const Navbar = () => {
  const [user, setUser] = useState(null); // Track logged-in user state
  const navigate = useNavigate();

  // UseEffect to check if the user is logged in by reading from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user state if user is in localStorage
    }
  }, []); // This runs once on mount

  // Handle logout by clearing user data from localStorage and redirecting to home
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    setUser(null); // Clear user state
    navigate('/'); // Redirect to home page
  };

  // Handle login by setting user data in localStorage and updating state
  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
    setUser(userData); // Update user state to reflect login
  };

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

            {/* Render Career Links only if not logged in */}
            {!user && (
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
            )}
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

          {/* Show Login and Register Links if user is logged out */}
          {!user ? (
            <div className="d-flex gap-2 me-3">
              <Link to="/login" className="btn btn-outline-success">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline-primary">
                Register
              </Link>
            </div>
          ) : (
            // Profile Dropdown for Logged-In User
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
                type="button"
                id="profileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUserCircle className="me-2" size={20} />
                {user.username || 'Profile'} {/* Display username or default text */}
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
                  <Link className="dropdown-item" to="#" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
