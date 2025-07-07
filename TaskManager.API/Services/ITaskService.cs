using TaskManager.Shared.DTOs;

namespace TaskManager.API.Services
{
    public interface ITaskService
    {
        Task<List<TaskItemDto>> GetAllTasksAsync(int userId);
        Task<TaskItemDto?> GetTaskByIdAsync(int taskId, int userId);
        Task<TaskItemDto?> CreateTaskAsync(CreateTaskItemDto createTaskDto, int userId);
        Task<TaskItemDto?> UpdateTaskAsync(int taskId, UpdateTaskItemDto updateTaskDto, int userId);
        Task<bool> DeleteTaskAsync(int taskId, int userId);
        Task<List<TaskItemDto>> GetTasksByProjectIdAsync(int projectId, int userId);
        Task<List<TaskItemDto>> GetTasksWithPaginationAsync(int userId, int page, int pageSize);
    }
}
