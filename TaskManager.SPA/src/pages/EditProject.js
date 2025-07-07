import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectService } from '../services/projectService';

const EditProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState({
        name: '',
        description: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadProject = async () => {
            try {
                const projectData = await projectService.getProject(id);
                setProject({
                    name: projectData.name,
                    description: projectData.description
                });
            } catch (error) {
                console.error('Error loading project:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProject();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            await projectService.updateProject(id, project);
            navigate(`/projects/${id}`);
        } catch (error) {
            console.error('Error updating project:', error);
            alert('Error al actualizar el proyecto');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e) => {
        setProject({
            ...project,
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
                            <h5>Editar Proyecto</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={project.name}
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
                                        value={project.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate(`/projects/${id}`)}
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

export default EditProject;
