import React, { useState } from 'react';
import { Card, Form, Button, Alert, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { projectService, authService } from '../services/apiService';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faProjectDiagram, faAlignLeft, faCalendar, faFlag, faUsers, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

const CreateProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dueDate: '',
    status: 0,
    teamMemberIds: [],
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: users, isLoading: usersLoading } = useQuery('users', authService.getAllUsers);

  const createMutation = useMutation(projectService.createProject, {
    onSuccess: () => {
      queryClient.invalidateQueries('projects');
      toast.success('Proyecto creado exitosamente');
      navigate('/projects');
    },
    onError: (error) => {
      setError('Error al crear el proyecto: ' + (error.response?.data?.message || error.message));
    },
  });

  const handleChange = (e) => {
    if (e.target.name === 'teamMemberIds') {
      const value = parseInt(e.target.value);
      const isChecked = e.target.checked;
      
      setFormData(prev => ({
        ...prev,
        teamMemberIds: isChecked
          ? [...prev.teamMemberIds, value]
          : prev.teamMemberIds.filter(id => id !== value)
      }));
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('El nombre del proyecto es requerido');
      return;
    }

    const projectData = {
      ...formData,
      status: parseInt(formData.status),
      dueDate: formData.dueDate || null,
    };

    createMutation.mutate(projectData);
  };

  if (usersLoading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando usuarios...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Row className="justify-content-center fade-in">
      <Col md={8}>
        <Card>
          <Card.Header>
            <h3>
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              Crear Nuevo Proyecto
            </h3>
          </Card.Header>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <FontAwesomeIcon icon={faProjectDiagram} className="me-2" />
                  Nombre del Proyecto *
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre del proyecto"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <FontAwesomeIcon icon={faAlignLeft} className="me-2" />
                  Descripción
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Descripción del proyecto"
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FontAwesomeIcon icon={faCalendar} className="me-2" />
                      Fecha de Vencimiento
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FontAwesomeIcon icon={faFlag} className="me-2" />
                      Estado
                    </Form.Label>
                    <Form.Select name="status" value={formData.status} onChange={handleChange}>
                      <option value={0}>Planificación</option>
                      <option value={1}>En Progreso</option>
                      <option value={2}>Completado</option>
                      <option value={3}>En Pausa</option>
                      <option value={4}>Cancelado</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>
                  <FontAwesomeIcon icon={faUsers} className="me-2" />
                  Miembros del Equipo
                </Form.Label>
                <Row>
                  {users && users.map((user) => (
                    <Col md={6} lg={4} key={user.id}>
                      <Form.Check
                        type="checkbox"
                        id={`user-${user.id}`}
                        label={`${user.name} (${user.email})`}
                        name="teamMemberIds"
                        value={user.id}
                        onChange={handleChange}
                      />
                    </Col>
                  ))}
                </Row>
              </Form.Group>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Button 
                  variant="secondary" 
                  onClick={() => navigate('/projects')}
                  className="me-md-2"
                >
                  <FontAwesomeIcon icon={faTimes} className="me-2" />
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  disabled={createMutation.isLoading}
                >
                  {createMutation.isLoading ? (
                    <>
                      <Spinner size="sm" className="me-2" />
                      Creando...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faSave} className="me-2" />
                      Crear Proyecto
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateProject;
