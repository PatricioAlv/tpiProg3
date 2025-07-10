import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTasks, 
  faCalendar, 
  faUser, 
  faProjectDiagram,
  faFlag,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import { taskService } from '../services/taskService';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                setError(null);
                const tasksData = await taskService.getAllTasks();
                setTasks(tasksData);
            } catch (error) {
                console.error('Error loading tasks:', error);
                setError('Error al cargar las tareas');
            } finally {
                setLoading(false);
            }
        };

        loadTasks();
    }, []);

    // Funciones helper para mostrar status y prioridad
    const getStatusBadgeVariant = (status) => {
        switch (parseInt(status)) {
            case 0: return 'secondary'; // Todo
            case 1: return 'warning';   // InProgress
            case 2: return 'success';   // Done
            default: return 'secondary';
        }
    };

    const getStatusDisplayName = (status) => {
        switch (parseInt(status)) {
            case 0: return 'Por Hacer';
            case 1: return 'En Progreso';
            case 2: return 'Completado';
            default: return 'Desconocido';
        }
    };

    const getPriorityBadgeVariant = (priority) => {
        switch (parseInt(priority)) {
            case 0: return 'success'; // Low
            case 1: return 'warning'; // Medium
            case 2: return 'danger';  // High
            default: return 'secondary';
        }
    };

    const getPriorityDisplayName = (priority) => {
        switch (parseInt(priority)) {
            case 0: return 'Baja';
            case 1: return 'Media';
            case 2: return 'Alta';
            default: return 'Desconocido';
        }
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando tareas...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">
                    {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container fluid className="fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 style={{ color: "#00757F" }}>
                    <FontAwesomeIcon icon={faTasks} className="me-2" />
                    Todas las Tareas
                </h1>
            </div>

            {tasks.length === 0 ? (
                <Alert variant="info">
                    <FontAwesomeIcon icon={faTasks} className="me-2" />
                    No hay tareas disponibles.
                </Alert>
            ) : (
                <Row className="g-4">
                    {tasks.map(task => (
                        <Col md={6} lg={4} key={task.id}>
                            <Card className="h-100" style={{ borderColor: "#08D9CD" }}>
                                <Card.Header
                                    className="d-flex justify-content-between align-items-center"
                                    style={{
                                        backgroundColor: "#00757F",
                                        color: "#fff",
                                        borderBottom: "3px solid #08D9CD",
                                    }}
                                >
                                    <h6 className="mb-0">{task.title}</h6>
                                    <Badge
                                        style={{
                                            backgroundColor: task.status === 1 ? "#08D9CD" : undefined,
                                            color: task.status === 1 ? "#00757F" : undefined,
                                        }}
                                        bg={getStatusBadgeVariant(task.status)}
                                    >
                                        {getStatusDisplayName(task.status)}
                                    </Badge>
                                </Card.Header>
                                <Card.Body style={{ backgroundColor: "#f8f9fa" }}>
                                    <Card.Text className="text-muted mb-3">
                                        {task.description}
                                    </Card.Text>
                                    
                                    <div className="mb-3">
                                        <small className="text-muted">
                                            <FontAwesomeIcon icon={faProjectDiagram} className="me-1" />
                                            Proyecto: {task.projectName || 'Sin asignar'}
                                        </small>
                                    </div>

                                    {task.dueDate && (
                                        <div className="mb-3">
                                            <small className="text-muted">
                                                <FontAwesomeIcon icon={faClock} className="me-1" />
                                                Vence: {new Date(task.dueDate).toLocaleDateString('es-ES')}
                                            </small>
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <small className="text-muted">
                                            <FontAwesomeIcon icon={faCalendar} className="me-1" />
                                            Creado: {new Date(task.createdAt).toLocaleDateString('es-ES')}
                                        </small>
                                    </div>

                                    {task.assignedToUser && (
                                        <div className="mb-3">
                                            <small className="text-muted">
                                                <FontAwesomeIcon icon={faUser} className="me-1" />
                                                Asignado a: {task.assignedToUser.name}
                                            </small>
                                        </div>
                                    )}

                                    <div className="d-flex justify-content-between align-items-center">
                                        <Badge
                                            style={{
                                                backgroundColor:
                                                    task.priority === 1
                                                        ? "#08D9CD"
                                                        : task.priority === 2
                                                        ? "#ff4d4f"
                                                        : "#43a047",
                                                color:
                                                    task.priority === 1
                                                        ? "#00757F"
                                                        : "#fff",
                                            }}
                                            className="d-flex align-items-center"
                                        >
                                            <FontAwesomeIcon icon={faFlag} className="me-1" />
                                            {getPriorityDisplayName(task.priority)}
                                        </Badge>

                                        {task.createdByUser && (
                                            <small className="text-muted">
                                                <FontAwesomeIcon icon={faUser} className="me-1" />
                                                Por: {task.createdByUser.name}
                                            </small>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Tasks;
