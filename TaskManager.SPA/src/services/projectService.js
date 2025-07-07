import apiClient from './api';

export const projectService = {
  // Get all projects
  getProjects: async (page = 1, pageSize = 10) => {
    const response = await apiClient.get(`/projects`);
    return response.data;
  },

  // Get project by ID
  getProject: async (id) => {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  },

  // Create new project
  createProject: async (projectData) => {
    const response = await apiClient.post('/projects', projectData);
    return response.data;
  },

  // Update project
  updateProject: async (id, projectData) => {
    const response = await apiClient.put(`/projects/${id}`, projectData);
    return response.data;
  },

  // Delete project
  deleteProject: async (id) => {
    await apiClient.delete(`/projects/${id}`);
  },

  // Get project tasks
  getProjectTasks: async (projectId) => {
    const response = await apiClient.get(`/tasks/by-project/${projectId}`);
    return response.data;
  }
};

export default projectService;
