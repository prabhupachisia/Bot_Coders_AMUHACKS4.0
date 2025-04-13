import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHospitalAlt, FaUserMd, FaRegAddressCard } from "react-icons/fa";

const HosHome = () => {
    const navigate = useNavigate();

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
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary d-flex align-items-center gap-2">
                    <FaHospitalAlt size={32} />
                    Welcome to the Hospital Dashboard
                </h2>
            </div>

            <div className="row g-4">
                <div className="col-md-6">
                    {/* Doctors Section */}
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

                <div className="col-md-6">
                    {/* Patients Section */}
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
