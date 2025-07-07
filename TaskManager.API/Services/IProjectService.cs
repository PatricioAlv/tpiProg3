using TaskManager.Shared.DTOs;

namespace TaskManager.API.Services
{
    public interface IProjectService
    {
        Task<List<ProjectDto>> GetAllProjectsAsync(int userId);
        Task<ProjectDto?> GetProjectByIdAsync(int projectId, int userId);
        Task<ProjectDto?> CreateProjectAsync(CreateProjectDto createProjectDto, int userId);
        Task<ProjectDto?> UpdateProjectAsync(int projectId, UpdateProjectDto updateProjectDto, int userId);
        Task<bool> DeleteProjectAsync(int projectId, int userId);
        Task<List<ProjectDto>> GetProjectsWithPaginationAsync(int userId, int page, int pageSize);
    }
}
