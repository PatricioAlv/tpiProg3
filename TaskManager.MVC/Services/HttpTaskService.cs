using TaskManager.Shared.DTOs;
using TaskManager.Shared.Services;

namespace TaskManager.MVC.Services
{
    public class HttpTaskService : BaseHttpService, ITaskService
    {
        public HttpTaskService(HttpClient httpClient, IHttpContextAccessor httpContextAccessor, IConfiguration configuration)
            : base(httpClient, httpContextAccessor, configuration)
        {
        }

        public async Task<IEnumerable<TaskItemDto>> GetProjectTasksAsync(int projectId, int userId)
        {
            var result = await GetAsync<IEnumerable<TaskItemDto>>($"/api/tasks/by-project/{projectId}");
            return result ?? new List<TaskItemDto>();
        }

        public async Task<TaskItemDto?> GetTaskByIdAsync(int taskId, int userId)
        {
            return await GetAsync<TaskItemDto>($"/api/tasks/{taskId}");
        }

        public async Task<TaskItemDto> CreateTaskAsync(CreateTaskItemDto createTaskDto, int userId)
        {
            var result = await PostAsync<TaskItemDto>("/api/tasks", createTaskDto);
            return result ?? new TaskItemDto();
        }

        public async Task<TaskItemDto?> UpdateTaskAsync(int taskId, UpdateTaskItemDto updateTaskDto, int userId)
        {
            return await PutAsync<TaskItemDto>($"/api/tasks/{taskId}", updateTaskDto);
        }

        public async Task<bool> DeleteTaskAsync(int taskId, int userId)
        {
            return await DeleteAsync($"/api/tasks/{taskId}");
        }

        public async Task<PagedResultDto<TaskItemDto>> GetPagedTasksAsync(int projectId, int userId, int page, int pageSize)
        {
            // Por ahora obtenemos todas las tareas del proyecto y aplicamos paginación en memoria
            var allTasks = await GetProjectTasksAsync(projectId, userId);
            var tasksList = allTasks.ToList();
            
            var totalCount = tasksList.Count;
            var pagedTasks = tasksList.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            
            return new PagedResultDto<TaskItemDto>
            {
                Items = pagedTasks,
                TotalCount = totalCount,
                PageNumber = page,
                PageSize = pageSize
            };
        }

        public async Task<PagedResultDto<TaskItemDto>> GetTasksWithPaginationAsync(int userId, int page, int pageSize)
        {
            var result = await GetAsync<PagedResultDto<TaskItemDto>>($"/api/tasks/paginated?page={page}&pageSize={pageSize}");
            return result ?? new PagedResultDto<TaskItemDto>();
        }
    }
}
