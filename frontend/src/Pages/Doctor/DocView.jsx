import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const DocTreat = () => {
  const { consultId } = useParams(); // Extract consultId from URL
  const [consultation, setConsultation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch consultation details
  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken"); // Retrieve token from localStorage
        const response = await axios.get(
          `http://localhost:5000/v1/consult/${consultId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Add Authorization header
            },
          }
        );
        setConsultation(response.data);
      } catch (error) {
        console.error("Error fetching consultation details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultation();
  }, [consultId]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!consultation) {
    return (
      <div className="text-center py-5">
        <h3>Consultation not found</h3>
      </div>
    );
  }

  const { status, photos, description, doctor, patient, createdAt, updatedAt } =
    consultation;

  return (
    <div className="container py-5">
      <h1 className="mb-4">Treat Consultation</h1>

      {/* Patient Details */}
      <section className="mb-4">
        <h3>Patient Details</h3>
        <p>
          <strong>Name:</strong> {patient.name}
        </p>
        <p>
          <strong>Email:</strong> {patient.email}
        </p>
        <p>
          <strong>Phone:</strong> {patient.phone}
        </p>
        <p>
          <strong>Address:</strong>{" "}
          {`${patient.street}, ${patient.city}, ${patient.state}, ${patient.country} - ${patient.pinCode}`}
        </p>
      </section>

      {/* Consultation Details */}
      <section className="mb-4">
        <h3>Consultation Details</h3>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Description:</strong> {description}
        </p>
        {photos.length > 0 && (
          <>
            <h5>Photos:</h5>
            {photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Consult Photo ${index + 1}`}
                className="img-fluid mb-2"
              />
            ))}
          </>
        )}
        <p>
          <strong>Created At:</strong> {new Date(createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Updated At:</strong> {new Date(updatedAt).toLocaleString()}
        </p>
      </section>

      {/* Doctor Details */}
      <section className="mb-4">
        <h3>Doctor Details</h3>
        <p>
          <strong>Specialization:</strong> {doctor.specialization}
        </p>
        <p>
          <strong>Experience:</strong> {doctor.experience} years
        </p>
        <p>
          <strong>Education:</strong> {doctor.education}
        </p>
        <p>
          <strong>Fees:</strong> ₹{doctor.fees}
        </p>
      </section>

      {/* Actions */}
      <button
        className="btn btn-success me-2"
        onClick={() => alert("Treatment Completed!")}
      >
        Mark as Treated
      </button>
      <button
        className="btn btn-danger"
        onClick={() => alert("Consultation Cancelled!")}
      >
        Cancel Consultation
      </button>
    </div>
  );
};

export default DocTreat;
