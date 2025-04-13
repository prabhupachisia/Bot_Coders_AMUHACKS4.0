import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Spinner,
  Badge,
} from "react-bootstrap";
import {
  FaTimesCircle,
  FaCheckCircle,
  FaFilePrescription,
} from "react-icons/fa";

const placeholderImage = "https://picsum.photos/150?grayscale";


const UserMedicRec = () => {
  const [consultations, setConsultations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:5000/v1/consult", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch consultations");

        const consults = await response.json();

        // Fetch prescriptions for completed consultations
        const enriched = await Promise.all(
          consults.map(async (consult) => {
            if (consult.status === "complete") {
              try {
                const presRes = await fetch(
                  `http://localhost:5000/v1/prescription/consultations/${consult.id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  }
                );

                if (presRes.ok) {
                  const data = await presRes.json();
                  return { ...consult, prescription: data.prescription };
                }
              } catch (_) { }
            }
            return consult;
          })
        );

        setConsultations(enriched);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

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
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "cancelled" }),
        }
      );

      if (!response.ok) throw new Error("Cancellation failed");

      setConsultations((prev) =>
        prev.map((c) =>
          c.id === consultId ? { ...c, status: "cancelled" } : c
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5" style={{ backgroundColor: "#f4f8fb", minHeight: "100vh" }}>
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading medical records...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ backgroundColor: "#f4f8fb", minHeight: "100vh" }}>
      <h2 className="text-center mb-5 text-primary fw-bold">Your Medical Records</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {consultations.length === 0 ? (
        <p className="text-center text-muted">No medical records found</p>
      ) : (
        <Row className="g-4">
          {consultations.map((consult) => (
            <Col md={6} lg={4} key={consult.id}>
              <Card className="shadow-sm border-0 h-100 d-flex flex-column justify-content-between">
                <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                  <span className="fw-semibold text-primary">
                    Consultation #{consult.id.slice(-6)}
                  </span>
                  <Badge
                    bg={
                      consult.status === "complete"
                        ? "success"
                        : consult.status === "cancelled"
                          ? "secondary"
                          : "warning"
                    }
                  >
                    {consult.status}
                  </Badge>
                </Card.Header>

                <Card.Body className="d-flex flex-column">
                  <Card.Text className="mb-3">
                    <strong>Description:</strong> <br />
                    {consult.description}
                  </Card.Text>

                  <div className="mb-3">
                    <strong>Photos:</strong>
                    <Row className="mt-2 g-2 justify-content-center">
                      {(consult.photos?.length
                        ? consult.photos
                        : [placeholderImage]
                      ).map((photo, index) => (
                        <Col xs={4} key={index} className="d-flex justify-content-center">
                          <img
                            src={photo}
                            alt={`Photo ${index + 1}`}
                            className="img-fluid rounded border"
                            style={{ height: "80px", objectFit: "cover" }}
                            onError={(e) => (e.target.src = placeholderImage)}
                          />
                        </Col>
                      ))}
                    </Row>
                  </div>

                  <div className="mb-2">
                    <strong>Doctor:</strong>
                    <p className="mb-1">Name: {consult.doctor.details.name}</p>
                    <p className="mb-1">Specialization: {consult.doctor.specialization}</p>

                    {consult.status === "complete" && consult.prescription && (
                      <Alert variant="light" className="mt-2 p-2 border-start border-success border-4">
                        <FaFilePrescription className="me-2 text-success" />
                        <strong>Prescription:</strong>
                        <div className="mt-2">
                          {consult.prescription.startsWith("http") ? (
                            <a
                              href={consult.prescription}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View / Download Prescription
                            </a>
                          ) : (
                            <p className="mb-0 text-dark">{consult.prescription}</p>
                          )}
                        </div>
                      </Alert>
                    )}
                  </div>

                  <div className="mb-2">
                    <strong>Patient:</strong>
                    <p className="mb-1">Name: {consult.patient.name}</p>
                    <p className="mb-1">Location: {consult.patient.city}, {consult.patient.state}</p>
                  </div>

                  <small className="text-muted">
                    Created on: {new Date(consult.createdAt).toLocaleDateString()}
                  </small>

                  <div className="mt-auto d-grid">
                    {consult.status === "complete" && (
                      <Button variant="outline-success" disabled>
                        <FaCheckCircle className="me-2" /> Completed
                      </Button>
                    )}

                    {consult.status === "pending" && (
                      <Button
                        variant="outline-danger"
                        onClick={() => handleCancelConsult(consult.id)}
                      >
                        <FaTimesCircle className="me-2" /> Cancel Consult
                      </Button>
                    )}
                  </div>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default UserMedicRec;
