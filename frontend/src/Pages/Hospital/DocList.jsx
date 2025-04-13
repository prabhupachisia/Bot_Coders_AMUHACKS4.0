import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Spinner, Container, Row, Col } from "react-bootstrap";
import {
    FaUserMd,
    FaGraduationCap,
    FaClock,
    FaStethoscope,
    FaPhone,
    FaMapMarkerAlt,
} from "react-icons/fa";
import "../HosDocList/HosDocList.css";

const DocList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const user = JSON.parse(localStorage.getItem("user"));
                const hospitalId = user?.id;

                if (!hospitalId) {
                    throw new Error("Hospital ID not found in local storage");
                }

                const response = await axios.get(
                    `http://localhost:5000/v1/hospital/${hospitalId}/doctors`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Handle different response structures
                const responseData = response.data;
                let doctorsData = [];

                if (Array.isArray(responseData)) {
                    doctorsData = responseData;
                } else if (responseData?.doctors) {
                    doctorsData = responseData.doctors;
                } else if (responseData?.data) {
                    doctorsData = responseData.data;
                }

                setDoctors(doctorsData);
            } catch (error) {
                console.error("Error fetching doctors:", error.message);
                // Fallback demo data (ensure it's always an array)
                setDoctors([
                    {
                        id: 1,
                        specialization: "Cardiology",
                        education: "MBBS, MD (Cardiology)",
                        experience: 10,
                        details: {
                            name: "John Doe",
                            phone: "1234567890",
                            city: "Mumbai",
                            state: "Maharashtra",
                        },
                    },
                    {
                        id: 2,
                        specialization: "Neurology",
                        education: "MBBS, DM (Neurology)",
                        experience: 8,
                        details: {
                            name: "Jane Smith",
                            phone: "0987654321",
                            city: "Delhi",
                            state: "Delhi",
                        },
                    },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    // const handleConsult = (doctorId) => {
    //     console.log(`Consulting doctor with ID: ${doctorId}`);
    //     alert("Consult request sent to doctor!");
    // };

    if (loading) {
        return (
            <div className="hospital-doc-bg py-5">
                <Container className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3">Loading doctors...</p>
                </Container>
            </div>
        );
    }

    return (
        <div className="hospital-doc-bg py-5">
            <Container>
                <h2 className="text-center mb-5 text-primary fw-bold">
                    Our Hospital Doctors
                </h2>

                {doctors.length === 0 ? (
                    <p className="text-center text-muted">
                        No doctors found in this hospital
                    </p>
                ) : (
                    <Row className="g-4 justify-content-center">
                        {doctors.map((doctor) => (
                            <Col md={6} lg={4} key={doctor.id}>
                                <Card className="doctor-card shadow-lg glass-card text-dark">
                                    <Card.Body>
                                        <Card.Title className="mb-3">
                                            <FaUserMd className="me-2 text-primary" />
                                            Dr. {doctor.details.name}
                                        </Card.Title>

                                        <Card.Text>
                                            <FaStethoscope className="me-2 text-muted" />
                                            <strong>Specialization:</strong>{" "}
                                            {doctor.specialization}
                                        </Card.Text>

                                        <Card.Text>
                                            <FaGraduationCap className="me-2 text-muted" />
                                            <strong>Education:</strong>{" "}
                                            {doctor.education}
                                        </Card.Text>

                                        <Card.Text>
                                            <FaClock className="me-2 text-muted" />
                                            <strong>Experience:</strong>{" "}
                                            {doctor.experience} years
                                        </Card.Text>

                                        <Card.Text>
                                            <FaPhone className="me-2 text-muted" />
                                            <strong>Phone:</strong>{" "}
                                            {doctor.details.phone}
                                        </Card.Text>

                                        <Card.Text>
                                            <FaMapMarkerAlt className="me-2 text-muted" />
                                            <strong>Location:</strong>{" "}
                                            {doctor.details.city}, {doctor.details.state}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default DocList;
