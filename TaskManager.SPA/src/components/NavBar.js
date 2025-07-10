import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTasks,
  faHome,
  faProjectDiagram,
  faQrcode,
  faSignInAlt,
  faUserPlus,
  faUser,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
// Importa el logo (ajusta la ruta si es necesario)
import mapacheIco from './mapacheIco.png'; // o .svg según corresponda

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar
      variant="dark"
      expand="lg"
      className="shadow-sm"
      style={{ backgroundColor: '#00757F' }}
    >
      <img
        src={mapacheIco}
        alt="Logo"
        style={{
          width: '60px',       // O usa 'auto' para mantener proporción
          objectFit: 'contain',
          verticalAlign: 'middle'
        }}
        className="d-inline-block align-top"
      />
      <Container>
        <Navbar.Brand as={Link} to="/">
          {/* Logo a la izquierda */}

          mApache Manager
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              <FontAwesomeIcon icon={faHome} className="me-1" />
              Inicio
            </Nav.Link>

            {user && (
              <>
                <Nav.Link as={Link} to="/projects">
                  <FontAwesomeIcon icon={faProjectDiagram} className="me-1" />
                  Proyectos
                </Nav.Link>
                <Nav.Link as={Link} to="/tasks">
                  <FontAwesomeIcon icon={faTasks} className="me-1" />
                  Tareas
                </Nav.Link>
                <Nav.Link as={Link} to="/qr">
                  <FontAwesomeIcon icon={faQrcode} className="me-1" />
                  Código QR
                </Nav.Link>
              </>
            )}
          </Nav>

          <Nav>
            {user ? (
              <NavDropdown
                title={
                  <>
                    <FontAwesomeIcon icon={faUser} className="me-1" />
                    {user.name}
                  </>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <FontAwesomeIcon icon={faSignInAlt} className="me-1" />
                  Iniciar Sesión
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <FontAwesomeIcon icon={faUserPlus} className="me-1" />
                  Registrarse
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
