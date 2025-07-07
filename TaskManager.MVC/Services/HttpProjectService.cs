using TaskManager.Shared.DTOs;
using TaskManager.Shared.Services;
using System.Text.Json;
using System.Text;

namespace TaskManager.MVC.Services
{
    public class HttpProjectService : IProjectService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public HttpProjectService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _httpClient.BaseAddress = new Uri(_configuration["ApiSettings:BaseUrl"] ?? "https://localhost:5001");
        }

        public async Task<IEnumerable<ProjectDto>> GetUserProjectsAsync(int userId)
        {
            var response = await _httpClient.GetAsync($"/api/projects/user/{userId}");
            response.EnsureSuccessStatusCode();
            
            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<IEnumerable<ProjectDto>>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new List<ProjectDto>();
        }

        public async Task<ProjectDto?> GetProjectByIdAsync(int projectId, int userId)
        {
            var response = await _httpClient.GetAsync($"/api/projects/{projectId}");
            if (!response.IsSuccessStatusCode)
                return null;
            
            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<ProjectDto>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        public async Task<ProjectDto> CreateProjectAsync(CreateProjectDto createProjectDto, int userId)
        {
            var json = JsonSerializer.Serialize(createProjectDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            var response = await _httpClient.PostAsync("/api/projects", content);
            response.EnsureSuccessStatusCode();
            
            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<ProjectDto>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new ProjectDto();
        }

        public async Task<ProjectDto?> UpdateProjectAsync(int projectId, UpdateProjectDto updateProjectDto, int userId)
        {
            var json = JsonSerializer.Serialize(updateProjectDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            var response = await _httpClient.PutAsync($"/api/projects/{projectId}", content);
            if (!response.IsSuccessStatusCode)
                return null;
            
            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<ProjectDto>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        public async Task<bool> DeleteProjectAsync(int projectId, int userId)
        {
            var response = await _httpClient.DeleteAsync($"/api/projects/{projectId}");
            return response.IsSuccessStatusCode;
        }

        public async Task<PagedResultDto<ProjectDto>> GetPagedProjectsAsync(int userId, int page, int pageSize)
        {
            var response = await _httpClient.GetAsync($"/api/projects/paged?page={page}&pageSize={pageSize}");
            response.EnsureSuccessStatusCode();
            
            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<PagedResultDto<ProjectDto>>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new PagedResultDto<ProjectDto>();
        }

        public async Task<PagedResultDto<ProjectDto>> GetProjectsWithPaginationAsync(int userId, int page, int pageSize)
        {
            return await GetPagedProjectsAsync(userId, page, pageSize);
        }

        public async Task<IEnumerable<ProjectDto>> GetAllProjectsAsync(int userId)
        {
            return await GetUserProjectsAsync(userId);
        }
    }
}
