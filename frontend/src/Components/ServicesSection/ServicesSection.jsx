import React from "react";
import { FaUserMd, FaHospitalAlt, FaStethoscope, FaClock } from "react-icons/fa";

const ServicesSection = () => {
  const services = [
    {
      icon: <FaUserMd className="icon text-primary mb-3" size={35} />,
      title: "Personal Doctor",
      description: "Connect one-on-one with your preferred doctor anytime.",
    },
    {
      icon: <FaHospitalAlt className="icon text-success mb-3" size={35} />,
      title: "Reach Hospital Directly",
      description: "Book directly with the best hospitals near you.",
    },
    {
      icon: <FaStethoscope className="icon text-danger mb-3" size={35} />,
      title: "Easy Booking",
      description: "Book in seconds. Get reminders and manage appointments.",
    },
    {
      icon: <FaClock className="icon text-warning mb-3" size={35} />,
      title: "24x7 Expert Care",
      description: "Qualified doctors ready to help you anytime, anywhere.",
    },
  ];

  return (
    <section className="features-section py-5">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold">Our Services</h2>
        <div className="row g-4">
          {services.map((service, idx) => (
            <div className="col-md-3" key={idx}>
              <div className="card h-100 text-center shadow-sm">
                <div className="card-body">
                  {service.icon}
                  <h5>{service.title}</h5>
                  <p className="text-muted">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
