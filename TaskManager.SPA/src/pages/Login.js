import React, { useState } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faEnvelope, faLock, faKey, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
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

    try {
      await login(formData);
      navigate('/');
    } catch (error) {
      setError('Credenciales inválidas. Por favor verifica tu email y contraseña.');
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
              borderBottom: '4px solid #08D9CD'
            }}
          >
            <h3>
              <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
              Iniciar Sesión
            </h3>
          </Card.Header>
          <Card.Body style={{ backgroundColor: '#f8f9fa' }}>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
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
                  placeholder="Tu contraseña"
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
                  {loading ? 'Iniciando sesión...' : (
                    <>
                      <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                      Iniciar Sesión
                    </>
                  )}
                </Button>
              </div>
            </Form>

            <div className="text-center mt-3">
              <small style={{ color: '#00757F' }}>
                <FontAwesomeIcon icon={faKey} className="me-1" />
                <Link to="/auth/forgot-password" style={{ color: '#00757F', textDecoration: 'none' }}>
                  ¿Olvidaste tu contraseña?
                </Link>
              </small>
            </div>

            <hr style={{ borderTop: '2px solid #08D9CD' }} />

            <div className="text-center">
              <p style={{ color: '#00757F' }}>¿No tienes una cuenta?</p>
              <Button
                as={Link}
                to="/register"
                style={{
                  backgroundColor: '#08D9CD',
                  borderColor: '#00757F',
                  color: '#00757F'
                }}
                variant="outline-primary"
              >
                <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                Registrarse
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
