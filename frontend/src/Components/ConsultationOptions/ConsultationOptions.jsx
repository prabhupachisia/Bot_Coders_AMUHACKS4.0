import React from "react";
import "animate.css";  // Make sure animate.css is installed or included in your project

const ConsultationOptions = () => {
  return (
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
  );
};

export default ConsultationOptions;
