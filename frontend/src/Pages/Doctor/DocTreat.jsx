import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DocTreat = () => {
  const navigate = useNavigate();
  const { consultId } = useParams();
  const location = useLocation();
  const patientDetails = location.state?.patientDetails;

  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);

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
      navigate("/doc-home");
    } catch (err) {
      console.error("Failed to create prescription:", err);
      alert("An error occurred while creating the prescription.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };

  const handleImageAnalysis = () => {
    if (!imageFile) {
      alert("Please upload an image first.");
    } else {
      alert("Analyzing image using ML... (placeholder only)");
    }
  };

  return (
    <div
      className="py-5 px-3"
      style={{
        background: "#f0f6ff",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <h2 className="text-primary mb-4 text-center fw-semibold">🩺 Doctor Treatment Panel</h2>

        {/* Patient Info Card */}
        <div className="card shadow-sm rounded-4 p-4 mb-5">
          <h4 className="text-secondary mb-3 fw-semibold">👤 Patient Overview</h4>
          <div className="row g-3">
            <div className="col-md-6">
              <p><strong>Name:</strong> {patientDetails?.name || "N/A"}</p>
              <p><strong>Age:</strong> {patientDetails?.age || "N/A"}</p>
              <p><strong>Gender:</strong> {patientDetails?.gender || "N/A"}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Problem Summary:</strong> {patientDetails?.problemSummary || "Not Provided"}</p>
              <p><strong>Previous History:</strong> {patientDetails?.history || "No history provided"}</p>
            </div>
          </div>
        </div>

        {/* Image Upload Card */}
        <div className="card shadow-sm rounded-4 p-4 mb-5">
          <h4 className="text-secondary mb-3 fw-semibold">🧠 Diagnosis Image Upload</h4>
          <div className="row g-3 align-items-center">
            <div className="col-md-8 col-sm-12">
              <input
                type="file"
                className="form-control form-control-sm rounded-pill"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            <div className="col-md-4 col-sm-12">
              <button
                type="button"
                className="btn btn-outline-primary w-100"
                onClick={handleImageAnalysis}
              >
                🔍 Analyze Image (ML)
              </button>
            </div>
          </div>
        </div>

        {/* Prescription Form Card */}
        <div className="card shadow-sm rounded-4 p-4">
          <h4 className="text-secondary mb-3 fw-semibold">📄 Prescription Details</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Treatment Plan / Medicines
              </label>
              <textarea
                id="description"
                className="form-control rounded-3"
                rows="4"
                style={{ maxWidth: "100%", minWidth: "100%" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Include diagnosis, tests, medications, suggestions..."
                required
              ></textarea>
            </div>

            <div className="mb-3" style={{ maxWidth: "300px" }}>
              <label className="form-label">📅 Follow-up Date (Optional)</label>
              <input type="date" className="form-control rounded-pill" />
            </div>

            <div className="d-flex justify-content-end gap-3">
              <button
                type="submit"
                className="btn btn-primary px-4 rounded-pill"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary px-4 rounded-pill"
                onClick={() => navigate("/doc-home")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DocTreat;
