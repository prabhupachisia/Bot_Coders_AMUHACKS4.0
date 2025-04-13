import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserMd, FaStethoscope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Button, Spinner } from "react-bootstrap";
import "./UserDocCon.css"; // Make sure your CSS is correctly imported

function UserDocCon() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const independentId = "67fb6b4daec134dda70de5ae"; // ID for independent doctors

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/v1/doctors");
        console.log("Fetched doctors:", res.data); // Debugging

        // Filter doctors where hospital.id matches independentId
        const independentDoctors = res.data.filter(
          (doc) => doc.hospital?.id === independentId
        );

        setDoctors(independentDoctors);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="user-doc-bg py-5">
      <div className="container">
        <h2 className="text-center mb-5 text-primary">Meet Our Independent Doctors</h2>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading doctors...</p>
          </div>
        ) : doctors.length === 0 ? (
          <p className="text-center text-muted">No independent doctors available right now.</p>
        ) : (
          <div className="row justify-content-center">
            {doctors.map((doc, index) => {
              const details = doc.details;
              return (
                <div className="col-md-6 col-lg-4 mb-4" key={index}>
                  <div className="card doctor-card shadow-lg h-100">
                    <div className="card-body">
                      <h5 className="card-title text-dark">
                        <FaUserMd className="me-2 text-primary" />
                        Dr. {details.name}
                      </h5>
                      <p className="card-text">
                        <FaStethoscope className="me-2 text-muted" />
                        {doc.specialization}
                      </p>
                      <p className="card-text">
                        <FaPhoneAlt className="me-2 text-muted" />
                        {details.phone}
                      </p>
                      <p className="card-text">
                        <FaMapMarkerAlt className="me-2 text-muted" />
                        {details.city}, {details.state}, {details.country}
                      </p>
                      <Button variant="outline-primary" className="w-100 mt-3">
                        Consult Now
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-5">
          <h4 className="text-secondary">Why Consult With Us?</h4>
          <p className="text-muted">
            Trusted, experienced, and verified doctors are here to help you 24/7. Get personalized advice from the comfort of your home.
          </p>
          <img
            src="https://img.freepik.com/free-vector/online-doctor-concept-illustration_114360-4989.jpg?w=740"
            alt="Online Consultation"
            className="img-fluid mt-3 rounded shadow"
            style={{ maxWidth: "500px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default UserDocCon;
