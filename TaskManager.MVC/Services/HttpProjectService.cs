using TaskManager.Shared.DTOs;
using TaskManager.Shared.Services;

namespace TaskManager.MVC.Services
{
    public class HttpProjectService : BaseHttpService, IProjectService
    {
        public HttpProjectService(HttpClient httpClient, IHttpContextAccessor httpContextAccessor, IConfiguration configuration)
            : base(httpClient, httpContextAccessor, configuration)
        {
        }

        public async Task<IEnumerable<ProjectDto>> GetUserProjectsAsync(int userId)
        {
            var result = await GetAsync<IEnumerable<ProjectDto>>($"/api/projects/user/{userId}");
            return result ?? new List<ProjectDto>();
        }

        public async Task<ProjectDto?> GetProjectByIdAsync(int projectId, int userId)
        {
            return await GetAsync<ProjectDto>($"/api/projects/{projectId}");
        }

        public async Task<ProjectDto> CreateProjectAsync(CreateProjectDto createProjectDto, int userId)
        {
            var result = await PostAsync<ProjectDto>("/api/projects", createProjectDto);
            return result ?? new ProjectDto();
        }

        public async Task<ProjectDto?> UpdateProjectAsync(int projectId, UpdateProjectDto updateProjectDto, int userId)
        {
            return await PutAsync<ProjectDto>($"/api/projects/{projectId}", updateProjectDto);
        }

        public async Task<bool> DeleteProjectAsync(int projectId, int userId)
        {
            return await DeleteAsync($"/api/projects/{projectId}");
        }

        public async Task<PagedResultDto<ProjectDto>> GetPagedProjectsAsync(int userId, int page, int pageSize)
        {
            var result = await GetAsync<PagedResultDto<ProjectDto>>($"/api/projects/paginated?page={page}&pageSize={pageSize}");
            return result ?? new PagedResultDto<ProjectDto>();
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
