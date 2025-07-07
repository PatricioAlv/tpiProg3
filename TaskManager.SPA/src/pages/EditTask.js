import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { taskService } from '../services/taskService';
import { projectService } from '../services/projectService';

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        status: 'Todo',
        priority: 'Medium',
        projectId: ''
    });
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [taskData, projectsData] = await Promise.all([
                    taskService.getTask(id),
                    projectService.getProjects()
                ]);
                
                setTask({
                    title: taskData.title,
                    description: taskData.description,
                    dueDate: taskData.dueDate ? taskData.dueDate.split('T')[0] : '',
                    status: taskData.status,
                    priority: taskData.priority,
                    projectId: taskData.projectId
                });
                setProjects(projectsData);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            await taskService.updateTask(id, task);
            navigate(`/tasks/${id}`);
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Error al actualizar la tarea');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h5>Editar Tarea</h5>
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
                                                <option value="Todo">Por hacer</option>
                                                <option value="InProgress">En progreso</option>
                                                <option value="Done">Completado</option>
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
                                                <option value="Low">Baja</option>
                                                <option value="Medium">Media</option>
                                                <option value="High">Alta</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate(`/tasks/${id}`)}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={saving}
                                    >
                                        {saving ? 'Guardando...' : 'Guardar'}
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

export default EditTask;
