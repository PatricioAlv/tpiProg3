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

const QRGenerate = () => {
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

        return () => clearInterval(timer);
    }, []);

    const handleGenerateSecureQR = async () => {
        setLoading(true);
        setError('');
        setSuccess('');
    
        try {
            const response = await qrService.generateQR('net_question_exclusive');
            setQrCode(response.qrCode);
            setSuccess('¡Código QR exclusivo generado! Válido por 10 minutos.');
            
            // Establecer tiempo de próximo refresh
            const now = new Date();
            setNextRefresh(new Date(now.getTime() + 10 * 60 * 1000));
        } catch (error) {
            console.error('Error generating QR:', error);
            setError('Error al generar el código QR. Verifica que estés autenticado.');
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
                    <Card className="shadow">
                        <Card.Header className="bg-primary text-white">
                            <h3 className="mb-0">
                                <FontAwesomeIcon icon={faQrcode} className="me-2" />
                                Generar Código QR Exclusivo
                            </h3>
                        </Card.Header>
                        <Card.Body>
                            {/* Información de la funcionalidad exclusiva */}
                            <Row className="mb-4">
                                <Col md={12}>
                                    <Alert variant="info">
                                        <FontAwesomeIcon icon={faStar} className="me-2" />
                                        <strong>Funcionalidad Exclusiva:</strong> Acceso a preguntas sobre .NET que cambian cada hora.
                                        <br />
                                        <small>
                                            <FontAwesomeIcon icon={faQuestionCircle} className="me-1" />
                                            Pregunta actual: <strong>Hora {getCurrentHour()}</strong> | 
                                            Próxima pregunta en: <strong>{getTimeUntilNextQuestion()}</strong>
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
                                                <img 
                                                    src={qrCode} 
                                                    alt="Código QR Exclusivo" 
                                                    className="img-fluid border rounded"
                                                    style={{ maxWidth: '300px' }}
                                                />
                                                <div className="mt-2">
                                                    <Button 
                                                        onClick={downloadQR}
                                                        variant="outline-success"
                                                        size="sm"
                                                    >
                                                        <FontAwesomeIcon icon={faDownload} className="me-1" />
                                                        Descargar QR
                                                    </Button>
                                                    <Button 
                                                        onClick={handleGenerateSecureQR}
                                                        variant="outline-primary"
                                                        size="sm"
                                                        className="ms-2"
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
                                        <ul className="list-unstyled">
                                            <li className="mb-2">
                                                <FontAwesomeIcon icon={faCheck} className="text-success me-2" />
                                                <strong>Expiración:</strong> 10 minutos
                                            </li>
                                            <li className="mb-2">
                                                <FontAwesomeIcon icon={faCheck} className="text-success me-2" />
                                                <strong>Cifrado:</strong> HMAC-SHA256
                                            </li>
                                            <li className="mb-2">
                                                <FontAwesomeIcon icon={faCheck} className="text-success me-2" />
                                                <strong>Único:</strong> Hash por usuario y tiempo
                                            </li>
                                        </ul>

                                        <h5 className="mt-4">
                                            <FontAwesomeIcon icon={faQuestionCircle} className="me-2" />
                                            Preguntas .NET
                                        </h5>
                                        <ul className="list-unstyled">
                                            <li className="mb-2">
                                                <Badge bg="primary" className="me-2">24</Badge>
                                                Preguntas diferentes por hora
                                            </li>
                                            <li className="mb-2">
                                                <Badge bg="success" className="me-2">Temas</Badge>
                                                .NET, C#, ASP.NET, Entity Framework
                                            </li>
                                            <li className="mb-2">
                                                <Badge bg="info" className="me-2">Formato</Badge>
                                                Opción múltiple (A, B, C, D)
                                            </li>
                                        </ul>

                                        {nextRefresh && (
                                            <Alert variant="warning" className="mt-3">
                                                <FontAwesomeIcon icon={faClock} className="me-2" />
                                                <strong>QR expira:</strong> {nextRefresh.toLocaleTimeString()}
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
