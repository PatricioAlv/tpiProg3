import apiClient from './api';

export const taskService = {
    async getAllTasks() {
        const response = await apiClient.get('/tasks');
        return response.data;
    },

    async getProjectTasks(projectId) {
        const response = await apiClient.get(`/tasks/by-project/${projectId}`);
        return response.data;
    },

    async getTask(id) {
        const response = await apiClient.get(`/tasks/${id}`);
        return response.data;
    },

    async createTask(task) {
        const response = await apiClient.post('/tasks', task);
        return response.data;
    },

    async updateTask(id, task) {
        const response = await apiClient.put(`/tasks/${id}`, task);
        return response.data;
    },

    async deleteTask(id) {
        const response = await apiClient.delete(`/tasks/${id}`);
        return response.data;
    }
};
