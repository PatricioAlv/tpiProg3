using TaskManager.Shared.DTOs;
using TaskManager.Shared.Services;
using System.Text.Json;
using System.Text;

namespace TaskManager.MVC.Services
{
    public class HttpTaskService : ITaskService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public HttpTaskService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _httpClient.BaseAddress = new Uri(_configuration["ApiSettings:BaseUrl"] ?? "https://localhost:5001");
        }

        public async Task<IEnumerable<TaskItemDto>> GetProjectTasksAsync(int projectId, int userId)
        {
            var response = await _httpClient.GetAsync($"/api/tasks/project/{projectId}");
            response.EnsureSuccessStatusCode();
            
            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<IEnumerable<TaskItemDto>>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new List<TaskItemDto>();
        }

        public async Task<TaskItemDto?> GetTaskByIdAsync(int taskId, int userId)
        {
            var response = await _httpClient.GetAsync($"/api/tasks/{taskId}");
            if (!response.IsSuccessStatusCode)
                return null;
            
            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<TaskItemDto>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        public async Task<TaskItemDto> CreateTaskAsync(CreateTaskItemDto createTaskDto, int userId)
        {
            var json = JsonSerializer.Serialize(createTaskDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            var response = await _httpClient.PostAsync("/api/tasks", content);
            response.EnsureSuccessStatusCode();
            
            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<TaskItemDto>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new TaskItemDto();
        }

        public async Task<TaskItemDto?> UpdateTaskAsync(int taskId, UpdateTaskItemDto updateTaskDto, int userId)
        {
            var json = JsonSerializer.Serialize(updateTaskDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            var response = await _httpClient.PutAsync($"/api/tasks/{taskId}", content);
            if (!response.IsSuccessStatusCode)
                return null;
            
            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<TaskItemDto>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        public async Task<bool> DeleteTaskAsync(int taskId, int userId)
        {
            var response = await _httpClient.DeleteAsync($"/api/tasks/{taskId}");
            return response.IsSuccessStatusCode;
        }

        public async Task<PagedResultDto<TaskItemDto>> GetPagedTasksAsync(int projectId, int userId, int page, int pageSize)
        {
            var response = await _httpClient.GetAsync($"/api/tasks/paged?projectId={projectId}&page={page}&pageSize={pageSize}");
            response.EnsureSuccessStatusCode();
            
            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<PagedResultDto<TaskItemDto>>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new PagedResultDto<TaskItemDto>();
        }

        public async Task<PagedResultDto<TaskItemDto>> GetTasksWithPaginationAsync(int userId, int page, int pageSize)
        {
            var response = await _httpClient.GetAsync($"/api/tasks/paged?page={page}&pageSize={pageSize}");
            response.EnsureSuccessStatusCode();
            
            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<PagedResultDto<TaskItemDto>>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new PagedResultDto<TaskItemDto>();
        }
    }
}
