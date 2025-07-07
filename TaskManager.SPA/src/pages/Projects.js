import React from 'react';
import { Row, Col, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { projectService } from '../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faProjectDiagram, 
  faPlus, 
  faEye, 
  faEdit, 
  faTrash, 
  faCalendar, 
  faTasks, 
  faUsers, 
  faClock 
} from '@fortawesome/free-solid-svg-icons';

const Projects = () => {
  const { data: projects, isLoading, error } = useQuery('projects', projectService.getAllProjects);

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 0: return 'secondary'; // Planning
      case 1: return 'primary';   // InProgress
      case 2: return 'success';   // Completed
      case 3: return 'warning';   // OnHold
      case 4: return 'danger';    // Cancelled
      default: return 'secondary';
    }
  };

  const getStatusDisplayName = (status) => {
    switch (status) {
      case 0: return 'Planificación';
      case 1: return 'En Progreso';
      case 2: return 'Completado';
      case 3: return 'En Pausa';
      case 4: return 'Cancelado';
      default: return 'Desconocido';
    }
  };

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando proyectos...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        Error al cargar los proyectos: {error.message}
      </Alert>
    );
  }

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>
          <FontAwesomeIcon icon={faProjectDiagram} className="me-2" />
          Mis Proyectos
        </h1>
        <Button as={Link} to="/projects/create" variant="primary">
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Nuevo Proyecto
        </Button>
      </div>

      {projects && projects.length > 0 ? (
        <Row className="g-4">
          {projects.map((project) => (
            <Col md={6} lg={4} key={project.id}>
              <Card className="h-100">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">{project.name}</h5>
                  <Badge bg={getStatusBadgeVariant(project.status)}>
                    {getStatusDisplayName(project.status)}
                  </Badge>
                </Card.Header>
                <Card.Body>
                  <Card.Text>{project.description}</Card.Text>
                  <div className="row text-muted small">
                    <div className="col-6">
                      <FontAwesomeIcon icon={faCalendar} className="me-1" />
                      {new Date(project.createdAt).toLocaleDateString('es-ES')}
                    </div>
                    <div className="col-6">
                      <FontAwesomeIcon icon={faTasks} className="me-1" />
                      {project.tasks?.length || 0} tareas
                    </div>
                  </div>
                  {project.dueDate && (
                    <div className="mt-2">
                      <small className="text-muted">
                        <FontAwesomeIcon icon={faClock} className="me-1" />
                        Vence: {new Date(project.dueDate).toLocaleDateString('es-ES')}
                      </small>
                    </div>
                  )}
                  <div className="mt-2">
                    <small className="text-muted">
                      <FontAwesomeIcon icon={faUsers} className="me-1" />
                      {project.teamMembers?.length || 0} miembros
                    </small>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <div className="btn-group w-100" role="group">
                    <Button 
                      as={Link} 
                      to={`/projects/${project.id}`} 
                      variant="outline-primary" 
                      size="sm"
                    >
                      <FontAwesomeIcon icon={faEye} className="me-1" />
                      Ver
                    </Button>
                    <Button 
                      as={Link} 
                      to={`/projects/${project.id}/edit`} 
                      variant="outline-secondary" 
                      size="sm"
                    >
                      <FontAwesomeIcon icon={faEdit} className="me-1" />
                      Editar
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => {
                        if (window.confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
                          // TODO: Implement delete functionality
                          console.log('Delete project:', project.id);
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} className="me-1" />
                      Eliminar
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="empty-state">
          <FontAwesomeIcon icon={faProjectDiagram} />
          <h3>No tienes proyectos aún</h3>
          <p>¡Crea tu primer proyecto para comenzar!</p>
          <Button as={Link} to="/projects/create" variant="primary">
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Crear Primer Proyecto
          </Button>
        </div>
      )}
    </div>
  );
};

export default Projects;
