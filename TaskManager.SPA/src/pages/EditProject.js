import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Form, 
  Button, 
  Spinner, 
  Alert,
  ListGroup,
  Badge
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faProjectDiagram, 
  faUsers, 
  faPlus, 
  faTrash, 
  faSave, 
  faArrowLeft,
  faUser,
  faTasks,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import { projectService } from '../services/projectService';
import { authService, taskService } from '../services/apiService';

const EditProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Estados principales
    const [project, setProject] = useState({
        name: '',
        description: '',
        dueDate: '',
        status: 0,
        teamMembers: []
    });
    const [tasks, setTasks] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    
    // Estados de carga y errores
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Cargar datos iniciales
    useEffect(() => {
        const loadData = async () => {
            try {
                setError(null);
                
                // Cargar proyecto
                console.log('Loading project with ID:', id);
                const projectData = await projectService.getProject(id);
                console.log('Project data received:', projectData);
                setProject({
                    name: projectData.name,
                    description: projectData.description,
                    dueDate: projectData.dueDate ? projectData.dueDate.split('T')[0] : '',
                    status: projectData.status || 0,
                    teamMembers: projectData.teamMembers || []
                });

                // Cargar tareas del proyecto
                console.log('Loading tasks for project:', id);
                const tasksData = await taskService.getTasksByProject(id);
                console.log('Tasks data received:', tasksData);
                setTasks(tasksData);

                // Cargar usuarios disponibles
                console.log('Loading available users');
                const usersData = await authService.getAllUsers();
                console.log('Users data received:', usersData);
                setAvailableUsers(usersData);
                console.log('Final state - Available users:', availableUsers);
                console.log('Final state - Tasks:', tasksData);
                console.log('Final state - Project:', projectData);
                
            } catch (error) {
                console.error('Error loading data:', error);
                setError('Error al cargar los datos del proyecto');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadData();
        }
    }, [id]);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Agregar miembro al equipo
    const handleAddTeamMember = () => {
        if (!selectedUserId) return;
        
        const selectedUser = availableUsers.find(user => user.id === parseInt(selectedUserId));
        if (!selectedUser) return;

        // Verificar si el usuario ya está en el equipo
        const alreadyInTeam = project.teamMembers.some(member => member.id === selectedUser.id);
        if (alreadyInTeam) {
            alert('Este usuario ya está en el equipo');
            return;
        }

        setProject(prev => ({
            ...prev,
            teamMembers: [...prev.teamMembers, selectedUser]
        }));
        setSelectedUserId('');
    };

    // Remover miembro del equipo
    const handleRemoveTeamMember = (userId) => {
        setProject(prev => ({
            ...prev,
            teamMembers: prev.teamMembers.filter(member => member.id !== userId)
        }));
    };

    // Enviar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            const updateData = {
                name: project.name,
                description: project.description,
                dueDate: project.dueDate ? new Date(project.dueDate).toISOString() : null,
                status: parseInt(project.status),
                teamMemberIds: project.teamMembers.map(member => member.id)
            };

            await projectService.updateProject(id, updateData);
            setSuccess(true);
            
            // Redirigir después de un momento
            setTimeout(() => {
                navigate(`/projects/${id}`);
            }, 1500);
            
        } catch (error) {
            console.error('Error updating project:', error);
            setError('Error al actualizar el proyecto');
        } finally {
            setSaving(false);
        }
    };

    // Obtener nombre del status
    const getStatusDisplayName = (status) => {
        switch (parseInt(status)) {
            case 0: return 'Planificación';
            case 1: return 'En Progreso';
            case 2: return 'Completado';
            case 3: return 'En Pausa';
            case 4: return 'Cancelado';
            default: return 'Desconocido';
        }
    };

    // Obtener color del status
    const getStatusBadgeVariant = (status) => {
        switch (parseInt(status)) {
            case 0: return 'secondary';
            case 1: return 'primary';
            case 2: return 'success';
            case 3: return 'warning';
            case 4: return 'danger';
            default: return 'secondary';
        }
    };

    // Obtener usuarios disponibles para agregar (excluyendo los que ya están en el equipo)
    const getAvailableUsersForAdd = () => {
        console.log('Available users:', availableUsers);
        console.log('Current team members:', project.teamMembers);
        const filtered = availableUsers.filter(user => 
            !project.teamMembers.some(member => member.id === user.id)
        );
        console.log('Filtered available users:', filtered);
        return filtered;
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container fluid className="mt-4">
            <Row>
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>
                            <FontAwesomeIcon icon={faEdit} className="me-2" />
                            Editar Proyecto
                        </h1>
                        <Button 
                            variant="outline-secondary" 
                            onClick={() => navigate(`/projects/${id}`)}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="me-1" />
                            Volver
                        </Button>
                    </div>

                    {error && (
                        <Alert variant="danger" dismissible onClose={() => setError(null)}>
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert variant="success">
                            ¡Proyecto actualizado exitosamente! Redirigiendo...
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={8}>
                                <Card className="mb-4">
                                    <Card.Header>
                                        <h5 className="mb-0">
                                            <FontAwesomeIcon icon={faProjectDiagram} className="me-2" />
                                            Información del Proyecto
                                        </h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nombre del Proyecto</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={project.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Ingresa el nombre del proyecto"
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Descripción</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="description"
                                                value={project.description}
                                                onChange={handleChange}
                                                required
                                                placeholder="Describe el proyecto"
                                            />
                                        </Form.Group>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Fecha Límite</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="dueDate"
                                                        value={project.dueDate}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Estado</Form.Label>
                                                    <Form.Select
                                                        name="status"
                                                        value={project.status}
                                                        onChange={handleChange}
                                                    >
                                                        <option value={0}>Planificación</option>
                                                        <option value={1}>En Progreso</option>
                                                        <option value={2}>Completado</option>
                                                        <option value={3}>En Pausa</option>
                                                        <option value={4}>Cancelado</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>

                                <Card>
                                    <Card.Header>
                                        <h5 className="mb-0">
                                            <FontAwesomeIcon icon={faTasks} className="me-2" />
                                            Tareas del Proyecto ({tasks.length})
                                        </h5>
                                    </Card.Header>
                                    <Card.Body>
                                        {tasks.length === 0 ? (
                                            <p className="text-muted">No hay tareas en este proyecto.</p>
                                        ) : (
                                            <ListGroup variant="flush">
                                                {tasks.map((task) => (
                                                    <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-start">
                                                        <div className="flex-grow-1">
                                                            <h6 className="mb-1">{task.title}</h6>
                                                            <p className="mb-1 text-muted">{task.description}</p>
                                                            <div>
                                                                <Badge 
                                                                    bg={getStatusBadgeVariant(task.status)} 
                                                                    className="me-2"
                                                                >
                                                                    {getStatusDisplayName(task.status)}
                                                                </Badge>
                                                                {task.assignedToUser && (
                                                                    <Badge bg="info">
                                                                        <FontAwesomeIcon icon={faUser} className="me-1" />
                                                                        {task.assignedToUser.name}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="text-muted">
                                                            <small>Ver detalles del proyecto para editar tareas</small>
                                                        </div>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col md={4}>
                                <Card className="mb-4">
                                    <Card.Header>
                                        <h5 className="mb-0">
                                            <FontAwesomeIcon icon={faUsers} className="me-2" />
                                            Miembros del Equipo
                                        </h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Agregar Miembro</Form.Label>
                                            <div className="d-flex gap-2">
                                                <Form.Select
                                                    value={selectedUserId}
                                                    onChange={(e) => setSelectedUserId(e.target.value)}
                                                    className="flex-grow-1"
                                                >
                                                    <option value="">Seleccionar usuario...</option>
                                                    {getAvailableUsersForAdd().map((user) => (
                                                        <option key={user.id} value={user.id}>
                                                            {user.name} - {user.email}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                                <Button
                                                    variant="outline-primary"
                                                    onClick={handleAddTeamMember}
                                                    disabled={!selectedUserId}
                                                >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </Button>
                                            </div>
                                        </Form.Group>

                                        <div className="team-members-list">
                                            <h6>Miembros Actuales ({project.teamMembers.length})</h6>
                                            {project.teamMembers.length === 0 ? (
                                                <p className="text-muted">No hay miembros asignados.</p>
                                            ) : (
                                                <ListGroup variant="flush">
                                                    {project.teamMembers.map((member) => (
                                                        <ListGroup.Item 
                                                            key={member.id} 
                                                            className="d-flex justify-content-between align-items-center px-0"
                                                        >
                                                            <div>
                                                                <strong>{member.name}</strong>
                                                                <br />
                                                                <small className="text-muted">{member.email}</small>
                                                            </div>
                                                            <Button
                                                                variant="outline-danger"
                                                                size="sm"
                                                                onClick={() => handleRemoveTeamMember(member.id)}
                                                            >
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </Button>
                                                        </ListGroup.Item>
                                                    ))}
                                                </ListGroup>
                                            )}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <Button
                                variant="secondary"
                                onClick={() => navigate(`/projects/${id}`)}
                                disabled={saving}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={saving}
                            >
                                <FontAwesomeIcon icon={faSave} className="me-1" />
                                {saving ? 'Guardando...' : 'Guardar Cambios'}
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default EditProject;
