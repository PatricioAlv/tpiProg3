import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { taskService } from '../services/taskService';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="alert alert-danger">
                {error || 'Proyecto no encontrado'}
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>{project.name}</h1>
                        <div>
                            <button 
                                className="btn btn-outline-secondary me-2"
                                onClick={() => navigate(`/projects/${id}/edit`)}
                            >
                                Editar
                            </button>
                            <button 
                                className="btn btn-primary"
                                onClick={() => navigate(`/projects/${id}/tasks/create`)}
                            >
                                Nueva Tarea
                            </button>
                        </div>
                    </div>

                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Detalles del Proyecto</h5>
                            <p className="card-text">{project.description}</p>
                            <p className="card-text">
                                <small className="text-muted">
                                    Creado: {new Date(project.createdAt).toLocaleDateString()}
                                </small>
                            </p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h5>Tareas del Proyecto</h5>
                        </div>
                        <div className="card-body">
                            {tasks.length === 0 ? (
                                <p className="text-muted">No hay tareas en este proyecto.</p>
                            ) : (
                                <div className="row">
                                    {tasks.map(task => (
                                        <div key={task.id} className="col-md-4 mb-3">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h6 className="card-title">{task.title}</h6>
                                                    <p className="card-text">{task.description}</p>
                                                    <span className={`badge bg-${getStatusColor(task.status)}`}>
                                                        {task.status}
                                                    </span>
                                                    <span className={`badge bg-${getPriorityColor(task.priority)} ms-2`}>
                                                        {task.priority}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getStatusColor = (status) => {
    switch (status) {
        case 'Todo': return 'secondary';
        case 'InProgress': return 'warning';
        case 'Done': return 'success';
        default: return 'secondary';
    }
};

const getPriorityColor = (priority) => {
    switch (priority) {
        case 'Low': return 'success';
        case 'Medium': return 'warning';
        case 'High': return 'danger';
        default: return 'secondary';
    }
};

export default ProjectDetail;
