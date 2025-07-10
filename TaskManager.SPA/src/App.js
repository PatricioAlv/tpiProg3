import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import CreateProject from './pages/CreateProject';
import EditProject from './pages/EditProject';
import Tasks from './pages/Tasks';
import TaskDetail from './pages/TaskDetail';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';
import QRGenerate from './pages/QRGenerate';
import QRAccessPage from './pages/QRAccessPage';
import ExclusiveQuestion from './pages/ExclusiveQuestion';
import ProtectedRoute from './components/ProtectedRoute';
<<<<<<< HEAD
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
// import { useAuth } from './contexts/AuthContext'; // No se usa en este componente

function App() {
  // const { user } = useAuth(); // No se usa en este componente
=======

function App() {
>>>>>>> 2d7e945fe21c437af8fa8eff5d2b0f6deaa75f1a
  return (
    <div className="App">
      <NavBar />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
<<<<<<< HEAD
          {/* Rutas para recuperación de contraseña */}
          <Route path="/auth/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/auth/ResetPassword" element={<ResetPassword />} />
=======
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
>>>>>>> 2d7e945fe21c437af8fa8eff5d2b0f6deaa75f1a

          {/* Protected Routes */}
          <Route path="/projects" element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          } />
          <Route path="/projects/:id" element={
            <ProtectedRoute>
              <ProjectDetail />
            </ProtectedRoute>
          } />
          <Route path="/projects/create" element={
            <ProtectedRoute>
              <CreateProject />
            </ProtectedRoute>
          } />
          <Route path="/projects/:id/edit" element={
            <ProtectedRoute>
              <EditProject />
            </ProtectedRoute>
          } />

          <Route path="/tasks" element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          } />
          <Route path="/tasks/:id" element={
            <ProtectedRoute>
              <TaskDetail />
            </ProtectedRoute>
          } />
          <Route path="/tasks/create" element={
            <ProtectedRoute>
              <CreateTask />
            </ProtectedRoute>
          } />
          <Route path="/projects/:projectId/tasks/create" element={
            <ProtectedRoute>
              <CreateTask />
            </ProtectedRoute>
          } />
          <Route path="/tasks/:id/edit" element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          } />

          {/* QR Routes */}
          <Route path="/qr" element={
            <ProtectedRoute>
              <QRGenerate />
            </ProtectedRoute>
          } />
          <Route path="/qr-access/:hash" element={<QRAccessPage />} />
          <Route path="/exclusive/:hash" element={<ExclusiveQuestion />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
