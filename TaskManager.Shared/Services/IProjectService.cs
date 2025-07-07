using TaskManager.Shared.DTOs;

namespace TaskManager.Shared.Services
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectDto>> GetUserProjectsAsync(int userId);
        Task<ProjectDto?> GetProjectByIdAsync(int projectId, int userId);
        Task<ProjectDto> CreateProjectAsync(CreateProjectDto createProjectDto, int userId);
        Task<ProjectDto?> UpdateProjectAsync(int projectId, UpdateProjectDto updateProjectDto, int userId);
        Task<bool> DeleteProjectAsync(int projectId, int userId);
        Task<PagedResultDto<ProjectDto>> GetPagedProjectsAsync(int userId, int page, int pageSize);
        Task<PagedResultDto<ProjectDto>> GetProjectsWithPaginationAsync(int userId, int page, int pageSize);
        Task<IEnumerable<ProjectDto>> GetAllProjectsAsync(int userId);
    }
}
