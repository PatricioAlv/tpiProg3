import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { taskService } from '../services/taskService';
import { projectService } from '../services/projectService';

const CreateTask = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        status: 0, // Todo = 0
        priority: 1, // Medium = 1
        projectId: projectId ? parseInt(projectId) : '',
        assignedToUserId: ''
    });
    const [projects, setProjects] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const projectsData = await projectService.getProjects();
                setProjects(projectsData);
            } catch (error) {
                console.error('Error loading projects:', error);
            }
        };

        loadProjects();
    }, []);

    useEffect(() => {
        const loadTeamMembers = async () => {
            if (task.projectId) {
                try {
                    console.log('Cargando miembros del equipo para el proyecto:', task.projectId);
                    const projectData = await projectService.getProject(task.projectId);
                    console.log('Datos del proyecto:', projectData);
                    setTeamMembers(projectData.teamMembers || []);
                } catch (error) {
                    console.error('Error al cargar los miembros del equipo:', error);
                    setTeamMembers([]);
                }
            } else {
                setTeamMembers([]);
            }
        };

        loadTeamMembers();
    }, [task.projectId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await taskService.createTask(task);
            if (projectId) {
                navigate(`/projects/${projectId}`);
            } else {
                navigate('/tasks');
            }
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Error al crear la tarea');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let processedValue = value;
        
        // Convert numeric fields
        if (name === 'projectId' || name === 'status' || name === 'priority' || name === 'assignedToUserId') {
            processedValue = parseInt(value) || '';
        }
        
        setTask({
            ...task,
            [name]: processedValue
        });
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!projects.length) {
        return <div>No se encontraron proyectos.</div>;
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h5>Nueva Tarea</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Título</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        value={task.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Descripción</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        rows="3"
                                        value={task.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="projectId" className="form-label">Proyecto</label>
                                            <select
                                                className="form-control"
                                                id="projectId"
                                                name="projectId"
                                                value={task.projectId}
                                                onChange={handleChange}
                                                required
                                                disabled={!!projectId}
                                            >
                                                <option value="">Seleccionar proyecto</option>
                                                {projects.map(project => (
                                                    <option key={project.id} value={project.id}>
                                                        {project.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="dueDate" className="form-label">Fecha límite</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="dueDate"
                                                name="dueDate"
                                                value={task.dueDate}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label htmlFor="assignedToUserId" className="form-label">Asignar a</label>
                                            <select
                                                className="form-control"
                                                id="assignedToUserId"
                                                name="assignedToUserId"
                                                value={task.assignedToUserId}
                                                onChange={handleChange}
                                                disabled={!task.projectId}
                                            >
                                                <option value="">Sin asignar</option>
                                                {teamMembers.map(member => {
                                                    console.log('Rendering member:', member);
                                                    return (
                                                        <option key={member.id} value={member.id}>
                                                            {member.name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            {!task.projectId && (
                                                <small className="form-text text-muted">
                                                    Primero selecciona un proyecto para ver los miembros del equipo
                                                </small>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="status" className="form-label">Estado</label>
                                            <select
                                                className="form-control"
                                                id="status"
                                                name="status"
                                                value={task.status}
                                                onChange={handleChange}
                                            >
                                                <option value={0}>Por hacer</option>
                                                <option value={1}>En progreso</option>
                                                <option value={2}>Pruebas</option>
                                                <option value={3}>Completado</option>
                                                <option value={4}>Cancelado</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="priority" className="form-label">Prioridad</label>
                                            <select
                                                className="form-control"
                                                id="priority"
                                                name="priority"
                                                value={task.priority}
                                                onChange={handleChange}
                                            >
                                                <option value={0}>Baja</option>
                                                <option value={1}>Media</option>
                                                <option value={2}>Alta</option>
                                                <option value={3}>Crítica</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate(-1)}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading ? 'Creando...' : 'Crear Tarea'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTask;