import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faProjectDiagram,
  faTasks,
  faQrcode,
  faPlus,
  faSignInAlt,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import mapacheIco from '../components/mapacheIco.png'; // o .svg según corresponda

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="fade-in">
      <div className="hero-section">
        <h1 className="display-4 fw-bold mb-4">
          <FontAwesomeIcon icon={faTasks} className="me-3" />
          mApache Task Manager
        </h1>
        <img
          src={mapacheIco}
          alt="Logo"
          style={{
            width: '200px',       // O usa 'auto' para mantener proporción
            objectFit: 'contain',
            verticalAlign: 'middle'
          }}
          className="d-inline-block align-top"
        />
        <p className="lead mb-4">
          Sistema de gestión de tareas y proyectos de programación
        </p>

        {!user ? (
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <Button as={Link} to="/register" variant="light" size="lg" className="me-md-2">
              <FontAwesomeIcon icon={faUserPlus} className="me-2" />
              Registrarse
            </Button>
            <Button as={Link} to="/login" variant="outline-light" size="lg">
              <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
              Iniciar Sesión
            </Button>
          </div>
        ) : (
          <div>
            <h3 className="mb-3">¡Bienvenido de vuelta, {user.name}!</h3>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <Button as={Link} to="/projects" variant="light" size="lg" className="me-md-2">
                <FontAwesomeIcon icon={faProjectDiagram} className="me-2" />
                Mis Proyectos
              </Button>
              <Button as={Link} to="/tasks" variant="outline-light" size="lg">
                <FontAwesomeIcon icon={faTasks} className="me-2" />
                Mis Tareas
              </Button>
            </div>
          </div>
        )}
      </div>

      <Row className="g-4">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faProjectDiagram} className="text-primary me-2" />
                Gestión de Proyectos
              </Card.Title>
              <Card.Text>
                Crea y administra proyectos de programación con equipos de trabajo colaborativo.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faTasks} className="text-success me-2" />
                Control de Tareas
              </Card.Title>
              <Card.Text>
                Organiza tareas con estados, prioridades y asignaciones a miembros del equipo.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faQrcode} className="text-info me-2" />
                Acceso QR
              </Card.Title>
              <Card.Text>
                Genera códigos QR seguros para acceder a funcionalidades exclusivas de la aplicación.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {user && (
        <Row className="mt-5">
          <Col>
            <Card>
              <Card.Header>
                <h5>Acceso Rápido</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <div className="list-group">
                      <Link to="/projects/create" className="list-group-item list-group-item-action">
                        <FontAwesomeIcon icon={faPlus} className="text-success me-2" />
                        Crear Nuevo Proyecto
                      </Link>
                      <Link to="/tasks/create" className="list-group-item list-group-item-action">
                        <FontAwesomeIcon icon={faPlus} className="text-primary me-2" />
                        Crear Nueva Tarea
                      </Link>
                      <Link to="/qr" className="list-group-item list-group-item-action">
                        <FontAwesomeIcon icon={faQrcode} className="text-info me-2" />
                        Generar Código QR
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Home;
