import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faQuestionCircle, 
    faStar, 
    faClock, 
    faCheckCircle, 
    faTimesCircle,
    faExclamationTriangle,
    faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import { qrService } from '../services/qrService';

const ExclusiveQuestion = () => {
    const { hash } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading');
    const [questionData, setQuestionData] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const loadQuestion = async () => {
            try {
                const response = await qrService.getExclusiveQuestion(hash);
                setQuestionData(response);
                setStatus('valid');
            } catch (error) {
                console.error('Error loading question:', error);
                setStatus('invalid');
            }
        };

        if (hash) {
            loadQuestion();
        } else {
            setStatus('invalid');
        }
    }, [hash]);

    const handleSubmitAnswer = async () => {
        if (!selectedAnswer) {
            alert('Por favor selecciona una respuesta');
            return;
        }

        setSubmitting(true);
        try {
            const response = await qrService.submitAnswer(hash, selectedAnswer);
            setResult(response);
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting answer:', error);
            setResult({
                isCorrect: false,
                message: 'Error al enviar la respuesta. El código QR puede haber expirado.'
            });
            setSubmitted(true);
        } finally {
            setSubmitting(false);
        }
    };

    const handleAnswerChange = (value) => {
        if (!submitted) {
            setSelectedAnswer(value);
        }
    };

    if (status === 'loading') {
        return (
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card>
                            <Card.Body className="text-center py-5">
                                <Spinner animation="border" variant="primary" />
                                <p className="mt-3">Verificando código QR y cargando pregunta...</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (status === 'invalid') {
        return (
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card className="shadow">
                            <Card.Header className="bg-danger text-white">
                                <h4 className="mb-0">
                                    <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
                                    Acceso Denegado
                                </h4>
                            </Card.Header>
                            <Card.Body className="text-center">
                                <div className="mb-4">
                                    <FontAwesomeIcon icon={faExclamationTriangle} size="5x" className="text-warning" />
                                </div>
                                <h5>Código QR Inválido o Expirado</h5>
                                <p className="lead">
                                    Para acceder a esta funcionalidad exclusiva, necesitas un código QR válido.
                                </p>
                                <Alert variant="info">
                                    <FontAwesomeIcon icon={faClock} className="me-2" />
                                    <strong>Recordatorio:</strong> Los códigos QR expiran después de 10 minutos por seguridad.
                                </Alert>
                                <Button 
                                    variant="primary" 
                                    onClick={() => navigate('/')}
                                >
                                    Volver al Inicio
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Card className="shadow exclusive-question-card">
                        <Card.Header className="bg-primary text-white">
                            <h3 className="mb-0">
                                <FontAwesomeIcon icon={faStar} className="me-2" />
                                Funcionalidad Exclusiva - Pregunta sobre .NET
                            </h3>
                        </Card.Header>
                        <Card.Body>
                            {questionData && (
                                <>
                                    <Alert variant="info">
                                        <FontAwesomeIcon icon={faStar} className="me-2" />
                                        <strong>¡Acceso Exclusivo!</strong> Esta pregunta solo está disponible mediante código QR.
                                        <br />
                                        <small>
                                            Pregunta de la hora: <strong className="time-display">{questionData.question?.hour || 0}:00</strong> - 
                                            Expira: <strong className="time-display">{new Date(questionData.question?.expiresAt).toLocaleString()}</strong>
                                        </small>
                                    </Alert>

                                    <div className="mb-4">
                                        <h4>
                                            <FontAwesomeIcon icon={faQuestionCircle} className="me-2" />
                                            {questionData.question?.question}
                                        </h4>
                                    </div>

                                    {!submitted ? (
                                        <Form>
                                            <div className="question-options mb-4">
                                                {questionData.question?.options?.map((option, index) => (
                                                    <div key={index} className="custom-radio">
                                                        <Form.Check
                                                            type="radio"
                                                            id={`option-${index}`}
                                                            name="answer"
                                                            value={option.charAt(0)}
                                                            label={option}
                                                            onChange={(e) => handleAnswerChange(e.target.value)}
                                                            checked={selectedAnswer === option.charAt(0)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                            <Button 
                                                variant="primary" 
                                                size="lg"
                                                className="submit-answer-btn"
                                                onClick={handleSubmitAnswer}
                                                disabled={submitting || !selectedAnswer}
                                            >
                                                {submitting ? (
                                                    <>
                                                        <Spinner animation="border" size="sm" className="me-2" />
                                                        Enviando...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                                                        Enviar Respuesta
                                                    </>
                                                )}
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Alert 
                                            variant={result?.isCorrect ? 'success' : 'danger'} 
                                            className={`answer-result ${result?.isCorrect ? 'correct' : 'incorrect'}`}
                                        >
                                            <FontAwesomeIcon 
                                                icon={result?.isCorrect ? faCheckCircle : faTimesCircle} 
                                                className="me-2" 
                                            />
                                            <strong>{result?.message}</strong>
                                            <div className="mt-2">
                                                <small>
                                                    Respuesta enviada: <strong>{selectedAnswer}</strong> - 
                                                    Tiempo: <strong className="time-display">{new Date().toLocaleTimeString()}</strong>
                                                </small>
                                            </div>
                                        </Alert>
                                    )}
                                </>
                            )}
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            <small>
                                <FontAwesomeIcon icon={faClock} className="me-2" />
                                Accedido: {new Date().toLocaleString()}
                                <br />
                                <FontAwesomeIcon icon={faQuestionCircle} className="me-2" />
                                {questionData?.instructions || 'Esta pregunta cambia cada hora. ¡Vuelve pronto para más preguntas sobre .NET!'}
                            </small>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ExclusiveQuestion;
