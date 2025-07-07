import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { taskService } from '../services/taskService';

const TaskDetail = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTask = async () => {
            try {
                const taskData = await taskService.getTask(id);
                setTask(taskData);
            } catch (error) {
                console.error('Error loading task:', error);
            } finally {
                setLoading(false);
            }
        };

        loadTask();
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

    if (!task) {
        return <div className="alert alert-danger">Tarea no encontrada</div>;
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h5>{task.title}</h5>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{task.description}</p>
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>Estado:</strong> 
                                        <span className={`badge bg-${getStatusColor(task.status)} ms-2`}>
                                            {task.status}
                                        </span>
                                    </p>
                                    <p><strong>Prioridad:</strong> 
                                        <span className={`badge bg-${getPriorityColor(task.priority)} ms-2`}>
                                            {task.priority}
                                        </span>
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Proyecto:</strong> {task.projectName}</p>
                                    {task.dueDate && (
                                        <p><strong>Fecha límite:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                                    )}
                                    <p><strong>Creado:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
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

export default TaskDetail;
