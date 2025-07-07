using TaskManager.Shared.DTOs;

namespace TaskManager.Shared.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItemDto>> GetProjectTasksAsync(int projectId, int userId);
        Task<TaskItemDto?> GetTaskByIdAsync(int taskId, int userId);
        Task<TaskItemDto> CreateTaskAsync(CreateTaskItemDto createTaskDto, int userId);
        Task<TaskItemDto?> UpdateTaskAsync(int taskId, UpdateTaskItemDto updateTaskDto, int userId);
        Task<bool> DeleteTaskAsync(int taskId, int userId);
        Task<PagedResultDto<TaskItemDto>> GetPagedTasksAsync(int projectId, int userId, int page, int pageSize);
        Task<PagedResultDto<TaskItemDto>> GetTasksWithPaginationAsync(int userId, int page, int pageSize);
    }
}
