import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './homepage.css';
import {
  FaUserMd, FaStethoscope, FaHospitalAlt, FaClock,
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedin
} from 'react-icons/fa';

const Home = () => {
  return (
    <div className="home-wrapper bg-light text-dark">

      {/* Hero Section */}
      <section className="hero-section text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold animate__animated animate__fadeInDown">Welcome to CareConnect</h1>
          <p className="lead text-muted animate__animated animate__fadeInUp">
            Bridging healthcare with technology. Your trusted hub for expert consultations and bookings.
          </p>
          <a href="/new-consultation" className="btn btn-primary btn-lg mt-3 animate__animated animate__fadeInUp">
            Book a Consultation
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Our Services</h2>
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card h-100 text-center shadow-sm">
                <div className="card-body">
                  <FaUserMd className="icon text-primary mb-3" size={35} />
                  <h5>Personal Doctor</h5>
                  <p className="text-muted">Connect one-on-one with your preferred doctor anytime.</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 text-center shadow-sm">
                <div className="card-body">
                  <FaHospitalAlt className="icon text-success mb-3" size={35} />
                  <h5>Reach Hospital Directly</h5>
                  <p className="text-muted">Book directly with the best hospitals near you.</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 text-center shadow-sm">
                <div className="card-body">
                  <FaStethoscope className="icon text-danger mb-3" size={35} />
                  <h5>Easy Booking</h5>
                  <p className="text-muted">Book in seconds. Get reminders and manage appointments.</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 text-center shadow-sm">
                <div className="card-body">
                  <FaClock className="icon text-warning mb-3" size={35} />
                  <h5>24x7 Expert Care</h5>
                  <p className="text-muted">Qualified doctors ready to help you anytime, anywhere.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Options */}
      <section className="consultation-section py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-4 fw-bold">Choose Your Consultation Type</h2>
          <div className="row text-center">
            <div className="col-md-6 mb-3 animate__animated animate__fadeInLeft">
              <div className="card shadow-sm p-4 h-100">
                <h4>Consult Hospital Near You</h4>
                <p className="text-muted">Choose from our network of trusted hospitals around your area.</p>
                <a href="/hospital-consultation" className="btn btn-outline-primary">Find Hospitals</a>
              </div>
            </div>
            <div className="col-md-6 mb-3 animate__animated animate__fadeInRight">
              <div className="card shadow-sm p-4 h-100">
                <h4>Personal Doctor Consultation</h4>
                <p className="text-muted">Get personal care and follow-up from your preferred doctor.</p>
                <a href="/personal-consultation" className="btn btn-outline-success">Consult Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Reviews */}
      <section className="reviews-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">What Our Patients Say</h2>
          <div className="row g-4">
            {["Shreya", "Rahul", "Ayesha"].map((name, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="card review-card h-100 shadow-sm animate__animated animate__zoomIn">
                  <div className="card-body">
                    <p className="text-muted fst-italic">"CareConnect made healthcare so simple. Booking and consulting is effortless!"</p>
                    <h6 className="mt-3 fw-semibold">{name}</h6>
                    <small className="text-muted">Verified Patient</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="appointment-section py-5 text-center bg-white">
        <div className="container">
          <h3 className="fw-bold mb-3">Take Charge of Your Health Today</h3>
          <p className="text-muted">Find the right doctor or hospital and book in a few seconds.</p>
          <a href="/new-consultation" className="btn btn-primary btn-lg">Get Started</a>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default Home;
