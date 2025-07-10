import React, { useState } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { authService } from '../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faArrowLeft, faPaperPlane, faKey } from '@fortawesome/free-solid-svg-icons';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [resetLink, setResetLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await authService.forgotPassword(email);
      setEmailSent(true);
      
      // Generar un token único basado en timestamp y datos del email
      const tokenData = btoa(JSON.stringify({
        email: email,
        timestamp: Date.now(),
        random: Math.random().toString(36).substr(2, 9)
      }));
      
      const generatedResetLink = `${window.location.origin}/auth/reset-password?token=${tokenData}`;
      setResetLink(generatedResetLink);
      
      // Mostrar el enlace en la consola para desarrollo
      console.log('='.repeat(70));
      console.log('🔐 ENLACE DE RECUPERACIÓN DE CONTRASEÑA');
      console.log('='.repeat(70));
      console.log('📧 Email:', email);
      console.log('🔗 Enlace de recuperación:');
      console.log(generatedResetLink);
      console.log('='.repeat(70));
      console.log('⚠️  Este enlace es válido por 1 hora');
      console.log('🔄 Copia y pega el enlace en tu navegador para cambiar tu contraseña');
      console.log('='.repeat(70));
      
      setMessage('Se ha generado un enlace de recuperación. Revisa más abajo para acceder al enlace.');
      
    } catch (error) {
      setError(error.response?.data?.message || 'Error al enviar el email de recuperación');
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
            {message && <Alert variant="success">{message}</Alert>}

            {!emailSent ? (
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
                    <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                    {loading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
                  </Button>
                </div>
              </Form>
            ) : (
              <div className="text-center">
                <Alert variant="info">
                  <FontAwesomeIcon icon={faKey} className="me-2" />
                  <strong>Enlace de recuperación generado</strong>
                  <br />
                  Usa el siguiente enlace para cambiar tu contraseña:
                </Alert>
                
                <div className="mb-3 p-3" style={{ backgroundColor: '#e3f2fd', borderRadius: '8px', border: '1px solid #08D9CD' }}>
                  <small className="text-muted">Enlace de recuperación:</small>
                  <div style={{ wordBreak: 'break-all', fontSize: '0.9em', color: '#00757F' }}>
                    <a href={resetLink} target="_blank" rel="noopener noreferrer" style={{ color: '#00757F' }}>
                      {resetLink}
                    </a>
                  </div>
                </div>
                
                <Button
                  href={resetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#00757F',
                    borderColor: '#08D9CD',
                    color: '#fff'
                  }}
                  className="mb-3"
                >
                  <FontAwesomeIcon icon={faKey} className="me-2" />
                  Abrir Enlace de Recuperación
                </Button>
                
                <div className="text-muted">
                  <small>
                    <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                    También puedes revisar la consola del navegador (F12) para ver el enlace completo.
                  </small>
                </div>
              </div>
            )}

            <div className="text-center mt-3">
              <Link 
                to="/auth/login" 
                style={{ color: '#00757F', textDecoration: 'none' }}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Volver al inicio de sesión
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ForgotPassword;