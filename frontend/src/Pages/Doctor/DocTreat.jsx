import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DocTreat = () => {
  const navigate = useNavigate();
  const { consultId } = useParams(); // Get consultation ID from the URL
  const location = useLocation();
  const patientDetails = location.state?.patientDetails; // Get patient details passed from DocHome

  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        alert("Session expired. Please log in again.");
        localStorage.clear();
        navigate("/login");
        return;
      }

      // Send prescription data to the backend
      await axios.post(
        `http://localhost:5000/v1/prescription/consultations/${consultId}`,
        { description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Prescription created successfully!");
      navigate("/doc-home"); // Redirect back to the doctor's home page
    } catch (err) {
      console.error("Failed to create prescription:", err);
      alert("An error occurred while creating the prescription.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-primary mb-4">Create Prescription</h2>

      <div className="card shadow-sm p-4">
        <h4 className="text-secondary mb-3">Patient Details</h4>
        <p>
          <strong>Name:</strong> {patientDetails?.name}
        </p>
        <p>
          <strong>Age:</strong> {patientDetails?.age}
        </p>
        <p>
          <strong>Problem Summary:</strong>{" "}
          {patientDetails?.problemSummary || "Not Provided"}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Prescription Description
            </label>
            <textarea
              id="description"
              className="form-control"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Prescription"}
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => navigate("/doctor-home")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocTreat;
