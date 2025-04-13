// ConsultationForm.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";
import "./ConsultationForm.css";

const ConsultationForm = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    // Dummy doctor data for display (replace with fetch if needed)
    const dummyDoctors = {
      1: "Dr. John Smith",
      2: "Dr. Emily Watson",
      3: "Dr. Raj Patel",
      4: "Dr. Aisha Khan"
    };
    setDoctorName(dummyDoctors[doctorId] || "Your Selected Doctor");
  }, [doctorId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Submitted details:", {
      doctorId,
      image,
      description,
    });

    // Simulate "sending" to the doctor (in real app, POST this data)
    setTimeout(() => {
      alert(`Your consultation details have been sent to ${doctorName}.`);
      navigate("/"); // Redirect to homepage or dashboard
    }, 1000);
  };

  const handleReset = () => {
    setImage(null);
    setDescription("");
    setSubmitted(false);
  };

  return (
    <div className="consult-form-bg py-5">
      <Container>
        <Card className="shadow-lg p-4 rounded-4 glassy-form">
          <h3 className="text-primary fw-bold mb-3 text-center">📝 Describe Your Symptoms</h3>
          <p className="text-muted text-center mb-4">Your consultation with <strong>{doctorName}</strong></p>

          {submitted && (
            <Alert variant="success" className="text-center">
              Submitted successfully!
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Upload an Image (if needed)</Form.Label>
              <Form.Control 
                type="file" 
                accept="image/*" 
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Describe your symptoms</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={5} 
                placeholder="Describe your issues in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between flex-wrap gap-2">
              <Button variant="primary" type="submit">
                Send to Doctor
              </Button>
              <Button variant="secondary" onClick={handleReset}>
                Reset
              </Button>
              <Button variant="outline-danger" onClick={() => navigate("/")}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default ConsultationForm;
