import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faQrcode, 
  faDownload, 
  faShieldAlt, 
  faCheck, 
  faClock,
  faExclamationTriangle,
  faStar,
  faQuestionCircle,
  faRefresh
} from '@fortawesome/free-solid-svg-icons';
import { qrService } from '../services/qrService';
import { useAuth } from '../contexts/AuthContext';
import Cookies from 'js-cookie';

const QRGenerate = () => {
    const { user, isAuthenticated } = useAuth();
    const [qrCode, setQrCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [nextRefresh, setNextRefresh] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Debug: mostrar información de autenticación
        console.log('QR Generate - User:', user);
        console.log('QR Generate - Is Authenticated:', isAuthenticated);
        console.log('QR Generate - Token from cookies:', Cookies.get('token'));
        console.log('QR Generate - User from cookies:', Cookies.get('user'));

        return () => clearInterval(timer);
    }, [user, isAuthenticated]);

    const handleGenerateSecureQR = async () => {
        // Verificar autenticación antes de proceder
        if (!isAuthenticated || !user) {
            setError('Error de autenticación. Por favor, inicia sesión nuevamente.');
            return;
        }

        const token = Cookies.get('token');
        if (!token) {
            setError('No se encontró el token de autenticación. Por favor, inicia sesión nuevamente.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');
    
        try {
            console.log('Intentando generar QR...');
            console.log('Usuario autenticado:', user);
            console.log('Token disponible:', !!token);
            
            const response = await qrService.generateQR('net_question_exclusive');
            console.log('Respuesta del servidor:', response);
            setQrCode(response.qrCode);
            setSuccess('¡Código QR exclusivo generado! Válido por 10 minutos.');
            
            // Establecer tiempo de próximo refresh
            const now = new Date();
            setNextRefresh(new Date(now.getTime() + 10 * 60 * 1000));
        } catch (error) {
            console.error('Error completo:', error);
            console.error('Respuesta del error:', error.response);
            
            let errorMessage = 'Error al generar el código QR.';
            
            if (error.response) {
                // El servidor respondió con un código de estado que está fuera del rango 2xx
                if (error.response.status === 401) {
                    errorMessage = 'Error de autenticación. Por favor, inicia sesión nuevamente.';
                } else if (error.response.status === 403) {
                    errorMessage = 'No tienes permisos para generar códigos QR.';
                } else if (error.response.data?.message) {
                    errorMessage = error.response.data.message;
                } else {
                    errorMessage = `Error del servidor: ${error.response.status}`;
                }
            } else if (error.request) {
                // La petición fue hecha pero no se recibió respuesta
                errorMessage = 'No se pudo conectar con el servidor. Verifica que la API esté ejecutándose.';
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const downloadQR = () => {
        if (!qrCode) return;
        
        const link = document.createElement('a');
        link.download = `taskmanager-qr-exclusive-${Date.now()}.png`;
        link.href = qrCode;
        link.click();
    };

    const getCurrentHour = () => {
        return currentTime.getHours();
    };

    const getNextQuestionTime = () => {
        const nextHour = new Date(currentTime);
        nextHour.setHours(currentTime.getHours() + 1, 0, 0, 0);
        return nextHour;
    };

    const getTimeUntilNextQuestion = () => {
        const now = currentTime.getTime();
        const next = getNextQuestionTime().getTime();
        const diff = next - now;
        
        const minutes = Math.floor(diff / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        return `${minutes}m ${seconds}s`;
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col lg={10}>
                    <Card className="shadow qr-generator-card">
                        <Card.Header className="bg-primary text-white">
                            <h3 className="mb-0">
                                <FontAwesomeIcon icon={faQrcode} className="me-2" />
                                Generar Código QR Exclusivo
                            </h3>
                        </Card.Header>
                        <Card.Body>
                            {/* Debug de autenticación */}
                            <Row className="mb-3">
                                <Col md={12}>
                                    <Alert variant="info" className="mb-2">
                                        <small>
                                            <strong>Estado de autenticación:</strong>
                                            <br />
                                            Usuario: {user ? user.name : 'No autenticado'} ({user ? user.email : 'N/A'})
                                            <br />
                                            Token: {Cookies.get('token') ? '✓ Presente' : '✗ No encontrado'}
                                            <br />
                                            Autenticado: {isAuthenticated ? '✓ Sí' : '✗ No'}
                                        </small>
                                    </Alert>
                                </Col>
                            </Row>

                            {/* Información de la funcionalidad exclusiva */}
                            <Row className="mb-4">
                                <Col md={12}>
                                    <Alert variant="info">
                                        <FontAwesomeIcon icon={faStar} className="me-2" />
                                        <strong>Funcionalidad Exclusiva:</strong> Acceso a preguntas sobre .NET que cambian cada hora.
                                        <br />
                                        <small>
                                            <FontAwesomeIcon icon={faQuestionCircle} className="me-1" />
                                            Pregunta actual: <strong className="time-display">Hora {getCurrentHour()}</strong> | 
                                            Próxima pregunta en: <strong className="time-display">{getTimeUntilNextQuestion()}</strong>
                                        </small>
                                    </Alert>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <div className="text-center">
                                        <Button 
                                            onClick={handleGenerateSecureQR}
                                            disabled={loading}
                                            variant="primary"
                                            size="lg"
                                            className="mb-3"
                                        >
                                            {loading ? (
                                                <>
                                                    <Spinner animation="border" size="sm" className="me-2" />
                                                    Generando...
                                                </>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon icon={faQrcode} className="me-2" />
                                                    Generar QR Exclusivo
                                                </>
                                            )}
                                        </Button>

                                        {qrCode && (
                                            <div className="mt-3">
                                                <div className="qr-code-display">
                                                    <img 
                                                        src={qrCode} 
                                                        alt="Código QR Exclusivo" 
                                                        className="img-fluid"
                                                        style={{ maxWidth: '300px' }}
                                                    />
                                                </div>
                                                <div className="mt-3">
                                                    <Button 
                                                        onClick={downloadQR}
                                                        variant="outline-success"
                                                        size="sm"
                                                        className="me-2"
                                                    >
                                                        <FontAwesomeIcon icon={faDownload} className="me-1" />
                                                        Descargar QR
                                                    </Button>
                                                    <Button 
                                                        onClick={handleGenerateSecureQR}
                                                        variant="outline-primary"
                                                        size="sm"
                                                    >
                                                        <FontAwesomeIcon icon={faRefresh} className="me-1" />
                                                        Generar Nuevo
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="h-100">
                                        <h5>
                                            <FontAwesomeIcon icon={faShieldAlt} className="me-2" />
                                            Características de Seguridad
                                        </h5>
                                        <div className="mb-4">
                                            <div className="security-feature">
                                                <FontAwesomeIcon icon={faCheck} className="text-success" />
                                                <div>
                                                    <strong>Expiración:</strong> 10 minutos
                                                </div>
                                            </div>
                                            <div className="security-feature">
                                                <FontAwesomeIcon icon={faCheck} className="text-success" />
                                                <div>
                                                    <strong>Cifrado:</strong> HMAC-SHA256
                                                </div>
                                            </div>
                                            <div className="security-feature">
                                                <FontAwesomeIcon icon={faCheck} className="text-success" />
                                                <div>
                                                    <strong>Único:</strong> Hash por usuario y tiempo
                                                </div>
                                            </div>
                                        </div>

                                        <h5 className="mt-4">
                                            <FontAwesomeIcon icon={faQuestionCircle} className="me-2" />
                                            Preguntas .NET
                                        </h5>
                                        <div className="mb-3">
                                            <div className="d-flex align-items-center mb-2">
                                                <Badge bg="primary" className="me-2">24</Badge>
                                                <span>Preguntas diferentes por hora</span>
                                            </div>
                                            <div className="d-flex align-items-center mb-2">
                                                <Badge bg="success" className="me-2">Temas</Badge>
                                                <span>.NET, C#, ASP.NET, Entity Framework</span>
                                            </div>
                                            <div className="d-flex align-items-center mb-2">
                                                <Badge bg="info" className="me-2">Formato</Badge>
                                                <span>Opción múltiple (A, B, C, D)</span>
                                            </div>
                                        </div>

                                        {nextRefresh && (
                                            <Alert variant="warning" className="mt-3">
                                                <FontAwesomeIcon icon={faClock} className="me-2" />
                                                <strong>QR expira:</strong> <span className="time-display">{nextRefresh.toLocaleTimeString()}</span>
                                            </Alert>
                                        )}
                                    </div>
                                </Col>
                            </Row>

                            {/* Alertas de estado */}
                            {error && (
                                <Alert variant="danger" className="mt-3">
                                    <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
                                    {error}
                                </Alert>
                            )}

                            {success && (
                                <Alert variant="success" className="mt-3">
                                    <FontAwesomeIcon icon={faCheck} className="me-2" />
                                    {success}
                                </Alert>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default QRGenerate;
