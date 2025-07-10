import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Badge, Spinner, Alert, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faUser, 
  faCalendar, 
  faTasks, 
  faEdit, 
  faPlus,
  faProjectDiagram,
  faEnvelope,
  faSave,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { projectService } from '../services/projectService';
import { taskService } from '../services/taskService';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Estados para el modal de edición de tareas
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [taskForm, setTaskForm] = useState({
        title: '',
        description: '',
        status: 0,
        priority: 1,
        assignedToUserId: '',
        dueDate: ''
    });
    const [savingTask, setSavingTask] = useState(false);

    useEffect(() => {
        const loadProject = async () => {
            try {
                setError(null);
                console.log('Loading project with ID:', id);
                const projectData = await projectService.getProject(id);
                console.log('Project data received:', projectData);
                
                const tasksData = await taskService.getProjectTasks(id);
                console.log('Tasks data received:', tasksData);
                
                setProject(projectData);
                setTasks(tasksData);
            } catch (error) {
                console.error('Error loading project:', error);
                setError(error.message || 'Error al cargar el proyecto');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadProject();
        }
    }, [id]);

    // Funciones para manejar la edición de tareas
    const handleEditTask = (task) => {
        setEditingTask(task);
        setTaskForm({
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            assignedToUserId: task.assignedToUserId || '',
            dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
        });
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditingTask(null);
        setTaskForm({
            title: '',
            description: '',
            status: 0,
            priority: 1,
            assignedToUserId: '',
            dueDate: ''
        });
    };

    const handleTaskFormChange = (e) => {
        const { name, value } = e.target;
        let processedValue = value;
        
        // Convert numeric fields
        if (name === 'status' || name === 'priority' || name === 'assignedToUserId') {
            processedValue = parseInt(value) || (name === 'assignedToUserId' ? '' : 0);
        }
        
        setTaskForm(prev => ({
            ...prev,
            [name]: processedValue
        }));
    };

    const handleSaveTask = async () => {
        if (!editingTask) return;
        
        setSavingTask(true);
        try {
            const updateData = {
                ...taskForm,
                id: editingTask.id,
                projectId: parseInt(id),
                dueDate: taskForm.dueDate ? new Date(taskForm.dueDate).toISOString() : null
            };

            await taskService.updateTask(editingTask.id, updateData);
            
            // Recargar las tareas
            const tasksData = await taskService.getProjectTasks(id);
            setTasks(tasksData);
            
            handleCloseEditModal();
            
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Error al actualizar la tarea');
        } finally {
            setSavingTask(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </div>
        );
    }

    if (!project) {
        return (
            <Alert variant="danger">
                {error || 'Proyecto no encontrado'}
            </Alert>
        );
    }

    // Modal para editar tareas
    const renderEditTaskModal = () => (
        <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    <FontAwesomeIcon icon={faEdit} className="me-2" />
                    Editar Tarea
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Título *</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={taskForm.title}
                                    onChange={handleTaskFormChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="description"
                                    value={taskForm.description}
                                    onChange={handleTaskFormChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Estado</Form.Label>
                                <Form.Select
                                    name="status"
                                    value={taskForm.status}
                                    onChange={handleTaskFormChange}
                                >
                                    <option value={0}>Por Hacer</option>
                                    <option value={1}>En Progreso</option>
                                    <option value={2}>Completado</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Prioridad</Form.Label>
                                <Form.Select
                                    name="priority"
                                    value={taskForm.priority}
                                    onChange={handleTaskFormChange}
                                >
                                    <option value={0}>Baja</option>
                                    <option value={1}>Media</option>
                                    <option value={2}>Alta</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Fecha límite</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dueDate"
                                    value={taskForm.dueDate}
                                    onChange={handleTaskFormChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Asignar a</Form.Label>
                                <Form.Select
                                    name="assignedToUserId"
                                    value={taskForm.assignedToUserId}
                                    onChange={handleTaskFormChange}
                                >
                                    <option value="">Sin asignar</option>
                                    {project?.teamMembers?.map(member => (
                                        <option key={member.id} value={member.id}>
                                            {member.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditModal}>
                    <FontAwesomeIcon icon={faTimes} className="me-1" />
                    Cancelar
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleSaveTask}
                    disabled={savingTask || !taskForm.title.trim()}
                >
                    <FontAwesomeIcon icon={faSave} className="me-1" />
                    {savingTask ? 'Guardando...' : 'Guardar'}
                </Button>
            </Modal.Footer>
        </Modal>
    );

    return (
        <div className="container-fluid">
            <Row>
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>
                            <FontAwesomeIcon icon={faProjectDiagram} className="me-2" />
                            {project.name}
                        </h1>
                        <div>
                            <Button 
                                variant="outline-secondary"
                                className="me-2"
                                onClick={() => navigate(`/projects/${id}/edit`)}
                            >
                                <FontAwesomeIcon icon={faEdit} className="me-1" />
                                Editar
                            </Button>
                            <Button 
                                variant="primary"
                                onClick={() => navigate(`/projects/${id}/tasks/create`)} // Asegúrate de que `id` sea el projectId
                            >
                                <FontAwesomeIcon icon={faPlus} className="me-1" />
                                Nueva Tarea
                            </Button>
                        </div>
                    </div>

                    <Row className="mb-4">
                        <Col md={8}>
                            <Card>
                                <Card.Header>
                                    <h5 className="mb-0">Detalles del Proyecto</h5>
                                </Card.Header>
                                <Card.Body>
                                    <p className="card-text">{project.description}</p>
                                    <div className="row text-muted small">
                                        <div className="col-6">
                                            <FontAwesomeIcon icon={faCalendar} className="me-1" />
                                            Creado: {new Date(project.createdAt).toLocaleDateString('es-ES')}
                                        </div>
                                        <div className="col-6">
                                            <FontAwesomeIcon icon={faTasks} className="me-1" />
                                            {tasks.length} tareas
                                        </div>
                                    </div>
                                    {project.dueDate && (
                                        <div className="mt-2">
                                            <small className="text-muted">
                                                <FontAwesomeIcon icon={faCalendar} className="me-1" />
                                                Fecha límite: {new Date(project.dueDate).toLocaleDateString('es-ES')}
                                            </small>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <Card.Header>
                                    <h5 className="mb-0">
                                        <FontAwesomeIcon icon={faUsers} className="me-2" />
                                        Miembros del Equipo
                                    </h5>
                                </Card.Header>
                                <Card.Body>
                                    {project.teamMembers && project.teamMembers.length > 0 ? (
                                        <div className="list-group list-group-flush">
                                            {project.teamMembers.map((member) => (
                                                <div key={member.id} className="list-group-item border-0 px-0">
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0 me-3">
                                                            <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" 
                                                                 style={{ width: '40px', height: '40px' }}>
                                                                <FontAwesomeIcon icon={faUser} className="text-white" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <h6 className="mb-1">{member.name}</h6>
                                                            <p className="mb-0 text-muted small">
                                                                <FontAwesomeIcon icon={faEnvelope} className="me-1" />
                                                                {member.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-muted mb-0">No hay miembros asignados a este proyecto.</p>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Card>
                        <Card.Header>
                            <h5 className="mb-0">
                                <FontAwesomeIcon icon={faTasks} className="me-2" />
                                Tareas del Proyecto
                            </h5>
                        </Card.Header>
                        <Card.Body>
                            {tasks.length === 0 ? (
                                <p className="text-muted">No hay tareas en este proyecto.</p>
                            ) : (
                                <Row>
                                    {tasks.map(task => (
                                        <Col md={4} key={task.id} className="mb-3">
                                            <Card>
                                                <Card.Body>
                                                    <Card.Title className="h6">{task.title}</Card.Title>
                                                    <Card.Text>{task.description}</Card.Text>
                                                    <div className="mb-2">
                                                        <Badge bg={getStatusColor(task.status)} className="me-2">
                                                            {getStatusDisplayName(task.status)}
                                                        </Badge>
                                                        <Badge bg={getPriorityColor(task.priority)}>
                                                            {getPriorityDisplayName(task.priority)}
                                                        </Badge>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <FontAwesomeIcon icon={faUser} className="me-2 text-muted" />
                                                        <small className="text-muted">
                                                            {task.assignedToUser ? task.assignedToUser.name : 'Sin asignar'}
                                                        </small>
                                                    </div>
                                                    <div className="mt-3">
                                                        <Button 
                                                            variant="outline-primary" 
                                                            size="sm"
                                                            onClick={() => handleEditTask(task)}
                                                        >
                                                            <FontAwesomeIcon icon={faEdit} className="me-1" />
                                                            Editar
                                                        </Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {renderEditTaskModal()}
        </div>
    );
};

const getStatusColor = (status) => {
    switch (status) {
        case 0:
        case 'Todo': return 'secondary';
        case 1:
        case 'InProgress': return 'warning';
        case 2:
        case 'Done': return 'success';
        default: return 'secondary';
    }
};

const getStatusDisplayName = (status) => {
    switch (status) {
        case 0:
        case 'Todo': return 'Por Hacer';
        case 1:
        case 'InProgress': return 'En Progreso';
        case 2:
        case 'Done': return 'Completado';
        default: return 'Desconocido';
    }
};

const getPriorityColor = (priority) => {
    switch (priority) {
        case 0:
        case 'Low': return 'success';
        case 1:
        case 'Medium': return 'warning';
        case 2:
        case 'High': return 'danger';
        default: return 'secondary';
    }
};

const getPriorityDisplayName = (priority) => {
    switch (priority) {
        case 0:
        case 'Low': return 'Baja';
        case 1:
        case 'Medium': return 'Media';
        case 2:
        case 'High': return 'Alta';
        default: return 'Desconocido';
    }
};

export default ProjectDetail;
