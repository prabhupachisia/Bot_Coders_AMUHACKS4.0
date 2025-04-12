import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './homepage.css';
import Footer from '../../Components/Footer/Footer';
import ConsultationOptions from '../../Components/ConsultationOptions/ConsultationOptions';
import Reviews from '../../Components/Reviews/Review';
import ServicesSection from '../../Components/ServicesSection/ServicesSection';

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

        <ServicesSection/>
        <ConsultationOptions/>
        <Reviews/>

      {/* Appointment CTA */}
      <section className="appointment-section py-5 text-center bg-white">
        <div className="container">
          <h3 className="fw-bold mb-3">Take Charge of Your Health Today</h3>
          <p className="text-muted">Find the right doctor or hospital and book in a few seconds.</p>
          <a href="/new-consultation" className="btn btn-primary btn-lg">Get Started</a>
        </div>
      </section>

     <Footer/>
    </div>
  );
};

export default Home;
