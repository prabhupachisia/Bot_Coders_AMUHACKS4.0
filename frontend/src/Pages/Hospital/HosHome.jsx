import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHospitalAlt, FaUserMd, FaRegAddressCard, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const HosHome = () => {
    const navigate = useNavigate();

    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // Handlers for navigation
    const handleViewDoctors = () => {
        navigate("/hospital/doctors"); // Navigate to the doctors page
    };

    const handleViewPatients = () => {
        navigate("/hospital/patients"); // Navigate to the patients page
    };

    return (
        <div
            className="container py-5"
            style={{
                background: "linear-gradient(to bottom right, #f3e5f5, #ffffff)",
            }}
        >
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary d-flex align-items-center gap-2">
                    <FaHospitalAlt size={32} />
                    Welcome to {user.name}'s Dashboard
                </h2>
            </div>

            {/* Hospital Information Section */}
            <div className="mb-5">
                <h3 className="text-secondary">About {user.name}</h3>
                <p className="text-muted">
                    {user.name} is a hospital located in {user.street}, {user.city}, {user.state}, {user.country}. We are committed to providing exceptional healthcare services to our patients. Our team of doctors and staff ensures top-notch medical care and patient satisfaction.
                </p>
                <div className="row g-3">
                    <div className="col-md-6">
                        <div className="card border-top border-4 border-info shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title text-info d-flex align-items-center gap-2">
                                    <FaMapMarkerAlt /> Location
                                </h5>
                                <p className="card-text">{`${user.street}, ${user.city}, ${user.state}, ${user.country} - ${user.pinCode}`}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card border-top border-4 border-warning shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title text-warning d-flex align-items-center gap-2">
                                    <FaPhoneAlt /> Contact
                                </h5>
                                <p className="card-text">Phone: {user.phone}</p>
                                <p className="card-text">Email: {user.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Cards */}
            <div className="row g-4 mb-5">
                {/* Doctors Section */}
                <div className="col-md-6">
                    <div className="card h-100 border-top border-4 border-primary shadow-sm">
                        <div className="card-body d-flex flex-column align-items-center justify-content-center">
                            <h3 className="card-title text-primary d-flex align-items-center gap-2">
                                <FaUserMd /> View Doctors
                            </h3>
                            <p className="card-text text-muted text-center">
                                Explore all doctors associated with the hospital.
                            </p>
                            <button
                                className="btn btn-outline-primary mt-auto"
                                onClick={handleViewDoctors}
                            >
                                Go to Doctors Page
                            </button>
                        </div>
                    </div>
                </div>

                {/* Patients Section */}
                <div className="col-md-6">
                    <div className="card h-100 border-top border-4 border-success shadow-sm">
                        <div className="card-body d-flex flex-column align-items-center justify-content-center">
                            <h3 className="card-title text-success d-flex align-items-center gap-2">
                                <FaRegAddressCard /> View Patients
                            </h3>
                            <p className="card-text text-muted text-center">
                                Check all patients and their consults with hospital doctors.
                            </p>
                            <button
                                className="btn btn-outline-success mt-auto"
                                onClick={handleViewPatients}
                            >
                                Go to Patients Page
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HosHome;
