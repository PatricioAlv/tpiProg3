import React, { useState, useEffect } from 'react';
import { taskService } from '../services/taskService';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const tasksData = await taskService.getAllTasks();
                setTasks(tasksData);
            } catch (error) {
                console.error('Error loading tasks:', error);
            } finally {
                setLoading(false);
            }
        };

        loadTasks();
    }, []);

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
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Todas las Tareas</h1>
            </div>

            {tasks.length === 0 ? (
                <div className="alert alert-info">
                    No hay tareas disponibles.
                </div>
            ) : (
                <div className="row">
                    {tasks.map(task => (
                        <div key={task.id} className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">{task.title}</h6>
                                    <p className="card-text">{task.description}</p>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            Proyecto: {task.projectName}
                                        </small>
                                    </p>
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

export default Tasks;
