import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Button, Spinner, Container, Row, Col } from "react-bootstrap";
import {
  FaUserMd,
  FaGraduationCap,
  FaClock,
  FaStethoscope,
  FaPhone,
  FaMapMarkerAlt
} from "react-icons/fa";
import "./HosDocList.css";

const HosDocList = () => {
  const { id: hospitalId } = useParams(); // Get hospital ID from route
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // adjust key if named differently
  
        const res = await axios.get(`http://localhost:5000/v1/hospital/${hospitalId}/doctors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setDoctors(res.data);
      } catch (error) {
        console.error("Error fetching doctors, using demo data instead.");
  
        // Demo data if API fails
        const demoDoctors = [ /* ... your existing demo data ... */ ];
        setDoctors(demoDoctors);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDoctors();
  }, [hospitalId]);
  

  const handleConsult = (doctorId) => {
    console.log(`Consulting doctor with ID: ${doctorId}`);
    alert("Consult request sent to doctor!");
  };

  return (
    <div className="hospital-doc-bg py-5">
      <Container>
        <h2 className="text-center mb-5 text-primary fw-bold">Our Hospital Doctors</h2>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading doctors...</p>
          </div>
        ) : doctors.length === 0 ? (
          <p className="text-center text-muted">No doctors found for this hospital.</p>
        ) : (
          <Row className="g-4 justify-content-center">
            {doctors.map((doc, index) => {
              const { details } = doc;
              return (
                <Col md={6} lg={4} key={index}>
                  <Card className="doctor-card shadow-lg glass-card text-dark">
                    <Card.Body>
                      <Card.Title className="mb-3">
                        <FaUserMd className="me-2 text-primary" />
                        Dr. {details.name}
                      </Card.Title>

                      <Card.Text>
                        <FaStethoscope className="me-2 text-muted" />
                        <strong>Specialization:</strong> {doc.specialization}
                      </Card.Text>

                      <Card.Text>
                        <FaGraduationCap className="me-2 text-muted" />
                        <strong>Education:</strong> {doc.education}
                      </Card.Text>

                      <Card.Text>
                        <FaClock className="me-2 text-muted" />
                        <strong>Experience:</strong> {doc.experience} years
                      </Card.Text>

                      <Card.Text>
                        <FaPhone className="me-2 text-muted" />
                        <strong>Phone:</strong> {details.phone}
                      </Card.Text>

                      <Card.Text>
                        <FaMapMarkerAlt className="me-2 text-muted" />
                        <strong>Location:</strong> {details.city}, {details.state}
                      </Card.Text>

                      <Button
                        variant="outline-primary"
                        className="w-100 mt-3"
                        onClick={() => handleConsult(doc.id)}
                      >
                        Consult
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default HosDocList;
