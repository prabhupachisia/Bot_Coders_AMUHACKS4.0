import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { FaUserMd, FaEnvelope, FaLock, FaPhone, FaHospital, FaGraduationCap, FaStethoscope, FaMoneyBill, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';
import './DocRegister.css';

const DocRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
    hospital: '',
    specialization: '',
    experience: '',
    education: '',
    fees: '',
    details: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/doctors/register', formData);
      alert('Doctor registered successfully');
    } catch (err) {
      console.error(err);
      alert('Error registering doctor');
    }
  };

  return (
    <Container className="form-container shadow-lg rounded-4 p-5 mt-5 bg-white">
      <h2 className="text-center mb-4 text-primary fw-bold">Doctor Registration</h2>
      <Form onSubmit={handleSubmit}>
        {/* User Info */}
        <h4 className="section-heading">👤 Personal Information</h4>

        <InputGroup className="mb-3">
          <InputGroup.Text><FaUserMd /></InputGroup.Text>
          <Form.Control
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text><FaEnvelope /></InputGroup.Text>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text><FaLock /></InputGroup.Text>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text><FaPhone /></InputGroup.Text>
          <Form.Control
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </InputGroup>

        {/* Address */}
        <h4 className="section-heading">📍 Address</h4>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="pinCode"
                placeholder="Pin Code"
                value={formData.pinCode}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Doctor Info */}
        <h4 className="section-heading">🏥 Doctor Information</h4>

        <InputGroup className="mb-3">
          <InputGroup.Text><FaHospital /></InputGroup.Text>
          <Form.Control
            type="text"
            name="hospital"
            placeholder="Hospital Name"
            value={formData.hospital}
            onChange={handleChange}
          />
        </InputGroup>

        <Form.Group className="mb-3">
          <Form.Select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          >
            <option value="">Select Specialization</option>
            <option>Pediatricians</option>
            <option>Geriatricians</option>
            <option>Family Physicians</option>
            <option>Cardiologists</option>
            <option>Dermatologists</option>
            <option>Neurologists</option>
            <option>Orthopedic Surgeons</option>
            <option>Psychiatrists</option>
            <option>Ophthalmologists</option>
            <option>Dentists</option>
            <option>Gynecologists</option>
            <option>Endocrinologists</option>
            <option>Gastroenterologists</option>
            <option>Pulmonologists</option>
            <option>Urologists</option>
            <option>Hematologists</option>
            <option>Oncologists</option>
            <option>Rheumatologists</option>
          </Form.Select>
        </Form.Group>

        <Row>
          <Col md={6}>
            <InputGroup className="mb-3">
              <InputGroup.Text><FaStethoscope /></InputGroup.Text>
              <Form.Control
                type="number"
                name="experience"
                placeholder="Experience (Years)"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Col>
          <Col md={6}>
            <InputGroup className="mb-3">
              <InputGroup.Text><FaGraduationCap /></InputGroup.Text>
              <Form.Control
                type="text"
                name="education"
                placeholder="Education"
                value={formData.education}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Col>
        </Row>

        <InputGroup className="mb-3">
          <InputGroup.Text><FaMoneyBill /></InputGroup.Text>
          <Form.Control
            type="number"
            name="fees"
            placeholder="Consultation Fees"
            value={formData.fees}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-4">
          <InputGroup.Text><FaInfoCircle /></InputGroup.Text>
          <Form.Control
            as="textarea"
            rows={3}
            name="details"
            placeholder="Additional Details"
            value={formData.details}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <Button variant="primary" type="submit" className="w-100 py-2 fw-semibold">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default DocRegister;
