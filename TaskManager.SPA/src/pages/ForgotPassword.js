import React, { useState } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { authService } from '../services/apiService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await authService.sendPasswordResetEmail(email);
      setSuccess('Se ha enviado un enlace de recuperación a tu correo electrónico.');
    } catch (error) {
      setError('Error al enviar el correo de recuperación. Verifica tu email.');
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
              <FontAwesomeIcon icon={faKey} className="me-2" />
              Recuperar Contraseña
            </h3>
          </Card.Header>
          <Card.Body style={{ backgroundColor: '#f8f9fa' }}>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#00757F' }}>
                  <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
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
                  {loading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ForgotPassword;