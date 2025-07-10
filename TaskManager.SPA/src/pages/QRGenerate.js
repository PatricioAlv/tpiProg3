import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faQrcode, 
  faDownload, 
  faShieldAlt, 
  faCheck, 
  faClock,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { qrService } from '../services/apiService';

const QRGenerate = () => {
    const [qrCode, setQrCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [validationHash, setValidationHash] = useState('');
    const [validationResult, setValidationResult] = useState(null);
    const [validating, setValidating] = useState(false);

    const handleGenerateSecureQR = async () => {
        setLoading(true);
        setError('');
        setSuccess('');
    
        try {
            // Llama al backend para obtener el hash único
            const response = await qrService.generateQR('exclusive_access');
    
            // Construye la URL a la que redirigirá el QR dentro de tu aplicación
            const accessUrl = `${window.location.origin}/QRAccessPage/${response.hash}`;
    
            // Usa una API para generar la imagen del QR que contiene la URL
            const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(accessUrl)}&size=300x300`;
    
            // Asigna la imagen al estado
            setQrCode(qrImageUrl);
            setSuccess('¡Código QR seguro generado exitosamente! Válido por 10 minutos.');
        } catch (error) {
            console.error('Error generating QR:', error);
            setError('Error al generar el código QR. Verifica que estés autenticado.');
        } finally {
            setLoading(false);
        }
    };
    

    const handleValidateQR = async () => {
        if (!validationHash.trim()) {
            setError('Por favor ingresa un hash para validar');
            return;
        }

        setValidating(true);
        setError('');

        try {
            const response = await qrService.validateQR(validationHash);
            setValidationResult(response);
        } catch (error) {
            console.error('Error validating QR:', error);
            setValidationResult({
                message: 'Código QR inválido o expirado',
                isValid: false
            });
        } finally {
            setValidating(false);
        }
    };

    const downloadQR = () => {
        if (!qrCode) return;
        
        const link = document.createElement('a');
        link.href = qrCode;
        link.download = `qr-code-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Card>
                        <Card.Header className="bg-primary text-white">
                            <h4 className="mb-0">
                                <FontAwesomeIcon icon={faQrcode} className="me-2" />
                                Generador de Códigos QR Seguros
                            </h4>
                        </Card.Header>
                        <Card.Body>
                            {/* Sección de Generación */}
                            <div className="mb-4">
                                <h5>
                                    <FontAwesomeIcon icon={faShieldAlt} className="me-2 text-success" />
                                    Generar Código QR de Acceso Exclusivo
                                </h5>
                                <p className="text-muted">
                                    Genera un código QR seguro que proporciona acceso a funcionalidades exclusivas.
                                    El código expira automáticamente en 10 minutos.
                                </p>
                                
                                <Button 
                                    variant="primary" 
                                    onClick={handleGenerateSecureQR}
                                    disabled={loading}
                                    className="mb-3"
                                >
                                    {loading ? (
                                        <>
                                            <Spinner size="sm" className="me-2" />
                                            Generando...
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon icon={faQrcode} className="me-2" />
                                            Generar QR Seguro
                                        </>
                                    )}
                                </Button>

                                {success && (
                                    <Alert variant="success">
                                        <FontAwesomeIcon icon={faCheck} className="me-2" />
                                        {success}
                                    </Alert>
                                )}

                                {error && (
                                    <Alert variant="danger">
                                        <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
                                        {error}
                                    </Alert>
                                )}

                                {qrCode && (
                                    <div className="text-center">
                                        <div className="bg-light p-3 rounded mb-3">
                                            <img 
                                                src={qrCode} 
                                                alt="Código QR Seguro"
                                                className="img-fluid"
                                                style={{ maxWidth: '300px' }}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-center gap-2">
                                            <Button
                                                variant="outline-primary"
                                                onClick={downloadQR}
                                            >
                                                <FontAwesomeIcon icon={faDownload} className="me-2" />
                                                Descargar QR
                                            </Button>
                                        </div>
                                        <Alert variant="warning" className="mt-3">
                                            <FontAwesomeIcon icon={faClock} className="me-2" />
                                            <strong>Importante:</strong> Este código QR expira en 10 minutos desde su generación.
                                        </Alert>
                                    </div>
                                )}
                            </div>

                            <hr />

                            {/* Sección de Validación */}
                            <div>
                                <h5>
                                    <FontAwesomeIcon icon={faCheck} className="me-2 text-info" />
                                    Validar Código QR
                                </h5>
                                <p className="text-muted">
                                    Ingresa el hash de un código QR para verificar su validez y acceder a la funcionalidad exclusiva.
                                </p>

                                <Row>
                                    <Col md={8}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Hash del Código QR</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingresa el hash del código QR..."
                                                value={validationHash}
                                                onChange={(e) => setValidationHash(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4} className="d-flex align-items-end">
                                        <Button 
                                            variant="info" 
                                            onClick={handleValidateQR}
                                            disabled={validating || !validationHash.trim()}
                                            className="mb-3 w-100"
                                        >
                                            {validating ? (
                                                <>
                                                    <Spinner size="sm" className="me-2" />
                                                    Validando...
                                                </>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon icon={faCheck} className="me-2" />
                                                    Validar
                                                </>
                                            )}
                                        </Button>
                                    </Col>
                                </Row>

                                {validationResult && (
                                    <Alert variant={validationResult.message?.includes('válido') ? 'success' : 'danger'}>
                                        <FontAwesomeIcon 
                                            icon={validationResult.message?.includes('válido') ? faCheck : faExclamationTriangle} 
                                            className="me-2" 
                                        />
                                        <strong>{validationResult.message}</strong>
                                        {validationResult.feature && (
                                            <div className="mt-2">
                                                <small>Funcionalidad: {validationResult.feature}</small>
                                            </div>
                                        )}
                                        {validationResult.timestamp && (
                                            <div>
                                                <small>Verificado en: {new Date(validationResult.timestamp).toLocaleString('es-ES')}</small>
                                            </div>
                                        )}
                                    </Alert>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default QRGenerate;
