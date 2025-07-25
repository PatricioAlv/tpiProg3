import React, { useState } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUser, faEnvelope, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      navigate('/');
    } catch (error) {
      setError('Error al registrarse. El email puede estar ya registrado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row className="justify-content-center fade-in">
      <Col md={6}>
        <Card style={{ borderColor: '#08D9CD' }}>
          <Card.Header
            className="text-center"
            style={{
              backgroundColor: '#00757F',
              color: '#fff',
              borderBottom: `4px solid #08D9CD`
            }}
          >
            <h3>
              <FontAwesomeIcon icon={faUserPlus} className="me-2" />
              Registrarse
            </h3>
          </Card.Header>
          <Card.Body style={{ backgroundColor: '#f8f9fa' }}>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#00757F' }}>
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Nombre Completo
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  required
                  style={{ borderColor: '#08D9CD' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#00757F' }}>
                  <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                  style={{ borderColor: '#08D9CD' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#00757F' }}>
                  <FontAwesomeIcon icon={faLock} className="me-2" />
                  Contraseña
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  required
                  style={{ borderColor: '#08D9CD' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#00757F' }}>
                  <FontAwesomeIcon icon={faLock} className="me-2" />
                  Confirmar Contraseña
                </Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirma tu contraseña"
                  required
                  style={{ borderColor: '#08D9CD' }}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button
                  type="submit"
                  style={{
                    backgroundColor: '#00757F',
                    borderColor: '#08D9CD',
                    color: '#fff'
                  }}
                  disabled={loading}
                >
                  {loading ? 'Registrando...' : (
                    <>
                      <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                      Registrarse
                    </>
                  )}
                </Button>
              </div>
            </Form>

            <hr style={{ borderTop: '2px solid #08D9CD' }} />

            <div className="text-center">
              <p style={{ color: '#00757F', border: 'none' }}>¿Ya tienes una cuenta?</p>
              <Button
                as={Link}
                to="/login"
                style={{
                  backgroundColor: '#08D9CD',
                  borderColor: '#00757F',
                  color: '#00757F'
                }}
                variant="outline-primary"
              >
                <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                Iniciar Sesión
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
