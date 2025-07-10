import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { qrService } from '../services/apiService';

const QRAccessPage = () => {
    const { hash } = useParams();
    const [status, setStatus] = useState('loading');
    const [feature, setFeature] = useState(null);

    useEffect(() => {
        const validateHash = async () => {
            try {
                console.log('Validando hash:', hash);
                const response = await qrService.validateQR(hash);
                console.log('Respuesta del backend:', response);
                if (response?.isValid) {
                    setFeature(response.feature || 'Acceso exclusivo');
                    setStatus('valid');
                } else {
                    setStatus('invalid');
                }
            } catch (error) {
                console.error('Error al validar el hash:', error);
                setStatus('invalid');
            }
        };

        validateHash();
    }, [hash]);

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Card>
                        <Card.Header className="bg-dark text-white">
                            <h4 className="mb-0">Acceso por QR</h4>
                        </Card.Header>
                        <Card.Body style={{ minHeight: '200px' }}>
                            {status === 'loading' && (
                                <div className="text-center">
                                    <Spinner animation="border" />
                                    <p className="mt-3">Verificando código QR...</p>
                                </div>
                            )}

                            {status === 'valid' && (
                                <Alert variant="success">
                                    ¡Acceso concedido! Bienvenido a: <strong>{feature}</strong>
                                </Alert>
                            )}

                            {status === 'invalid' && (
                                <Alert variant="danger">
                                    Este código QR no es válido o ha expirado.
                                </Alert>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default QRAccessPage;
