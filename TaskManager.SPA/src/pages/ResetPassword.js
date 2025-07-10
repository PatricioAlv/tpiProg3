import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { authService } from '../services/apiService';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const token = searchParams.get('token');
    if (!token) {
      setError('Token inválido.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setLoading(false);
      return;
    }

    try {
      await authService.resetPassword(token, password);
      setSuccess('Contraseña actualizada exitosamente.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setError('Error al actualizar la contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Card.Header>Restablecer Contraseña</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" disabled={loading}>
            {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ResetPassword;