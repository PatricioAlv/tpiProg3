import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert, Row, Col, InputGroup } from 'react-bootstrap';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { authService } from '../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faLock, faEye, faEyeSlash, faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [isValidToken, setIsValidToken] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
      try {
        // Intentar decodificar como token de frontend (base64)
        const decodedData = JSON.parse(atob(tokenParam));
        setEmail(decodedData.email);
        
        // Verificar si el token no ha expirado (1 hora)
        const tokenAge = Date.now() - decodedData.timestamp;
        const oneHour = 60 * 60 * 1000;
        
        if (tokenAge > oneHour) {
          setError('El enlace de recuperación ha expirado. Solicita uno nuevo.');
        } else {
          setIsValidToken(true);
        }
      } catch (error) {
        // Si no es un token de frontend, asumir que es un token de backend
        // En este caso necesitamos el email del usuario
        setIsValidToken(true);
        console.log('Token de backend detectado');
      }
    } else {
      setError('No se proporcionó un token de recuperación válido.');
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // Validaciones del lado cliente
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setLoading(false);
      return;
    }

    // Si no tenemos email (token de backend), solicitarlo
    if (!email && !formData.email) {
      setError('Debe proporcionar el email asociado a la cuenta.');
      setLoading(false);
      return;
    }

    try {
      const resetData = {
        email: email || formData.email,
        token: token,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };

      await authService.resetPassword(resetData);
      setPasswordChanged(true);
      setMessage('¡Contraseña actualizada exitosamente!');
      
      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        navigate('/auth/login', { 
          state: { 
            message: 'Contraseña actualizada. Ya puedes iniciar sesión con tu nueva contraseña.' 
          }
        });
      }, 3000);
      
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      setError(error.response?.data?.message || 'Error al actualizar la contraseña. El token puede haber expirado.');
    } finally {
      setLoading(false);
    }
  };

  if (!isValidToken && !error) {
    return (
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header className="text-center">
              <FontAwesomeIcon icon={faKey} className="me-2" />
              Validando Token
            </Card.Header>
            <Card.Body className="text-center">
              <p>Validando enlace de recuperación...</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }

  if (passwordChanged) {
    return (
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header className="text-center text-success">
              <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
              ¡Contraseña Actualizada!
            </Card.Header>
            <Card.Body className="text-center">
              <Alert variant="success">{message}</Alert>
              <p>Redirigiendo al login...</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }

  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <Card>
          <Card.Header className="text-center">
            <FontAwesomeIcon icon={faKey} className="me-2" />
            Restablecer Contraseña
          </Card.Header>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            
            {isValidToken && (
              <Form onSubmit={handleSubmit}>
                {!email && (
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FontAwesomeIcon icon={faKey} className="me-2" />
                      Email de la cuenta
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleInputChange}
                      placeholder="Ingresa tu email"
                      required
                    />
                    <Form.Text className="text-muted">
                      Necesario para tokens de backend
                    </Form.Text>
                  </Form.Group>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FontAwesomeIcon icon={faLock} className="me-2" />
                    Nueva Contraseña
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Mínimo 6 caracteres"
                      required
                      minLength={6}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FontAwesomeIcon icon={faLock} className="me-2" />
                    Confirmar Nueva Contraseña
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirma tu nueva contraseña"
                      required
                      minLength={6}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                    </Button>
                  </InputGroup>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Actualizando...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                        Actualizar Contraseña
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            )}

            <div className="text-center mt-3">
              <Link to="/auth/login" className="text-decoration-none">
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Volver al Login
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ResetPassword;