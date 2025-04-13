import React, { useState, useEffect } from "react";

const UserMedicRec = () => {
  const [consultations, setConsultations] = useState([]);
  const [error, setError] = useState("");

  // Fetch consultations on component mount
  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("No authentication token found");
          return;
        }

        const response = await fetch("http://localhost:5000/v1/consult", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch consultations");

        const data = await response.json();
        setConsultations(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchConsultations();
  }, []);

  // Handle consultation cancellation
  const handleCancelConsult = async (consultId) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/v1/consult/${consultId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "complete" }),
        }
      );

      if (!response.ok) throw new Error("Cancellation failed");

      // Update local state
      setConsultations((prev) =>
        prev.filter((consult) => consult.id !== consultId)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <div className="error">{error}</div>;
  if (!consultations.length) return <div>No medical records found</div>;

  return (
    <div className="consultation-list">
      {consultations.map((consult) => (
        <div key={consult.id} className="consultation-card">
          <div className="consultation-header">
            <h3>Consultation #{consult.id.slice(-6)}</h3>
            <span className={`status ${consult.status}`}>{consult.status}</span>
          </div>

          <div className="consultation-details">
            <div className="section">
              <h4>Description</h4>
              <p>{consult.description}</p>
            </div>

            <div className="section">
              <h4>Photos</h4>
              <div className="photo-grid">
                {consult.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Consultation ${index + 1}`}
                    className="photo-thumbnail"
                  />
                ))}
              </div>
            </div>

            <div className="doctor-patient-info">
              <div className="doctor-info">
                <h4>Doctor Details</h4>
                <p>Name: {consult.doctor.details.name}</p>
                <p>Specialization: {consult.doctor.specialization}</p>
              </div>

              <div className="patient-info">
                <h4>Patient Details</h4>
                <p>Name: {consult.patient.name}</p>
                <p>
                  Location: {consult.patient.city}, {consult.patient.state}
                </p>
              </div>
            </div>

            <div className="meta-info">
              <p>Created: {new Date(consult.createdAt).toLocaleDateString()}</p>
              <button
                onClick={() => handleCancelConsult(consult.id)}
                className="cancel-button"
                disabled={consult.status === "complete"}
              >
                {consult.status === "complete" ? "Completed" : "Cancel Consult"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserMedicRec;
