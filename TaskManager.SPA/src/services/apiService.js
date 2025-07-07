import apiClient from './api';

export const authService = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (resetData) => {
    const response = await apiClient.post('/auth/reset-password', resetData);
    return response.data;
  },

  getAllUsers: async () => {
    const response = await apiClient.get('/auth/users');
    return response.data;
  },
};

export const projectService = {
  getAllProjects: async () => {
    const response = await apiClient.get('/projects');
    return response.data;
  },

  getProjectById: async (id) => {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  },

  createProject: async (projectData) => {
    const response = await apiClient.post('/projects', projectData);
    return response.data;
  },

  updateProject: async (id, projectData) => {
    const response = await apiClient.put(`/projects/${id}`, projectData);
    return response.data;
  },

  deleteProject: async (id) => {
    const response = await apiClient.delete(`/projects/${id}`);
    return response.data;
  },

  getProjectsWithPagination: async (page = 1, pageSize = 10) => {
    const response = await apiClient.get(`/projects/paginated?page=${page}&pageSize=${pageSize}`);
    return response.data;
  },
};

export const taskService = {
  getAllTasks: async () => {
    const response = await apiClient.get('/tasks');
    return response.data;
  },

  getTaskById: async (id) => {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await apiClient.post('/tasks', taskData);
    return response.data;
  },

  updateTask: async (id, taskData) => {
    const response = await apiClient.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  },

  getTasksByProject: async (projectId) => {
    const response = await apiClient.get(`/tasks/by-project/${projectId}`);
    return response.data;
  },

  getTasksWithPagination: async (page = 1, pageSize = 10) => {
    const response = await apiClient.get(`/tasks/paginated?page=${page}&pageSize=${pageSize}`);
    return response.data;
  },
};

export const qrService = {
  generateQR: async (purpose = 'exclusive_access') => {
    const response = await apiClient.post('/qr/generate', { purpose });
    return response.data;
  },

  validateQR: async (hash) => {
    const response = await apiClient.get(`/qr/validate?hash=${hash}`);
    return response.data;
  },
};
