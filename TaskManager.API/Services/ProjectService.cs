using Microsoft.EntityFrameworkCore;
using TaskManager.API.Data;
using TaskManager.Shared.DTOs;
using TaskManager.Shared.Models;

namespace TaskManager.API.Services
{
    public class ProjectService : IProjectService
    {
        private readonly TaskManagerDbContext _context;

        public ProjectService(TaskManagerDbContext context)
        {
            _context = context;
        }

        public async Task<List<ProjectDto>> GetAllProjectsAsync(int userId)
        {
            var projects = await _context.Projects
                .Where(p => p.CreatedByUserId == userId)
                .Include(p => p.CreatedByUser)
                .ToListAsync();

            var result = new List<ProjectDto>();

            foreach (var project in projects)
            {
                // Cargar tareas del proyecto
                var tasks = await _context.TaskItems
                    .Where(t => t.ProjectId == project.Id)
                    .Include(t => t.CreatedByUser)
                    .ToListAsync();

                // Cargar miembros del equipo usando consulta directa
                var teamMemberIds = await _context.Database.SqlQueryRaw<int>(
                    "SELECT TeamMembersId FROM ProjectTeamMembers WHERE ProjectId = {0}", project.Id)
                    .ToListAsync();
                
                var teamMembers = await _context.Users
                    .Where(u => teamMemberIds.Contains(u.Id))
                    .ToListAsync();

                result.Add(new ProjectDto
                {
                    Id = project.Id,
                    Name = project.Name,
                    Description = project.Description,
                    CreatedAt = project.CreatedAt,
                    DueDate = project.DueDate,
                    Status = project.Status,
                    CreatedByUser = new UserDto
                    {
                        Id = project.CreatedByUser.Id,
                        Name = project.CreatedByUser.Name,
                        Email = project.CreatedByUser.Email,
                        CreatedAt = project.CreatedByUser.CreatedAt
                    },
                    TeamMembers = teamMembers.Select(tm => new UserDto
                    {
                        Id = tm.Id,
                        Name = tm.Name,
                        Email = tm.Email,
                        CreatedAt = tm.CreatedAt
                    }).ToList(),
                    Tasks = tasks.Select(t => new TaskItemDto
                    {
                        Id = t.Id,
                        Title = t.Title,
                        Description = t.Description,
                        CreatedAt = t.CreatedAt,
                        DueDate = t.DueDate,
                        Status = t.Status,
                        Priority = t.Priority,
                        ProjectId = t.ProjectId,
                        ProjectName = project.Name,
                        CreatedByUser = new UserDto
                        {
                            Id = t.CreatedByUser?.Id ?? 0,
                            Name = t.CreatedByUser?.Name ?? "",
                            Email = t.CreatedByUser?.Email ?? "",
                            CreatedAt = t.CreatedByUser?.CreatedAt ?? DateTime.MinValue
                        }
                    }).ToList()
                });
            }

            return result;
        }

        public async Task<ProjectDto?> GetProjectByIdAsync(int projectId, int userId)
        {
            var project = await _context.Projects
                .Where(p => p.Id == projectId && p.CreatedByUserId == userId)
                .Include(p => p.CreatedByUser)
                .FirstOrDefaultAsync();

            if (project == null)
                return null;

            // Cargar tareas del proyecto por separado
            var tasks = await _context.TaskItems
                .Where(t => t.ProjectId == project.Id)
                .Include(t => t.CreatedByUser)
                .ToListAsync();

            // Cargar miembros del equipo usando consulta directa
            var teamMemberIds = await _context.Database.SqlQueryRaw<int>(
                "SELECT TeamMembersId FROM ProjectTeamMembers WHERE ProjectId = {0}", project.Id)
                .ToListAsync();
            
            var teamMembers = await _context.Users
                .Where(u => teamMemberIds.Contains(u.Id))
                .ToListAsync();

            return new ProjectDto
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description,
                CreatedAt = project.CreatedAt,
                DueDate = project.DueDate,
                Status = project.Status,
                CreatedByUser = new UserDto
                {
                    Id = project.CreatedByUser.Id,
                    Name = project.CreatedByUser.Name,
                    Email = project.CreatedByUser.Email,
                    CreatedAt = project.CreatedByUser.CreatedAt
                },
                TeamMembers = teamMembers.Select(tm => new UserDto
                {
                    Id = tm.Id,
                    Name = tm.Name,
                    Email = tm.Email,
                    CreatedAt = tm.CreatedAt
                }).ToList(),
                Tasks = tasks.Select(t => new TaskItemDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    CreatedAt = t.CreatedAt,
                    DueDate = t.DueDate,
                    Status = t.Status,
                    Priority = t.Priority,
                    ProjectId = t.ProjectId,
                    ProjectName = project.Name,
                    CreatedByUser = new UserDto
                    {
                        Id = t.CreatedByUser?.Id ?? 0,
                        Name = t.CreatedByUser?.Name ?? "",
                        Email = t.CreatedByUser?.Email ?? "",
                        CreatedAt = t.CreatedByUser?.CreatedAt ?? DateTime.MinValue
                    }
                }).ToList()
            };
        }

        public async Task<ProjectDto?> CreateProjectAsync(CreateProjectDto createProjectDto, int userId)
        {
            var teamMembers = await _context.Users
                .Where(u => createProjectDto.TeamMemberIds.Contains(u.Id))
                .ToListAsync();

            var project = new Project
            {
                Name = createProjectDto.Name,
                Description = createProjectDto.Description,
                DueDate = createProjectDto.DueDate,
                Status = createProjectDto.Status,
                CreatedByUserId = userId,
                CreatedAt = DateTime.UtcNow,
                TeamMembers = teamMembers
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return await GetProjectByIdAsync(project.Id, userId);
        }

        public async Task<ProjectDto?> UpdateProjectAsync(int projectId, UpdateProjectDto updateProjectDto, int userId)
        {
            var project = await _context.Projects
                .Include(p => p.TeamMembers)
                .FirstOrDefaultAsync(p => p.Id == projectId && p.CreatedByUserId == userId);

            if (project == null)
                return null;

            project.Name = updateProjectDto.Name;
            project.Description = updateProjectDto.Description;
            project.DueDate = updateProjectDto.DueDate;
            project.Status = updateProjectDto.Status;

            // Update team members
            var teamMembers = await _context.Users
                .Where(u => updateProjectDto.TeamMemberIds.Contains(u.Id))
                .ToListAsync();

            project.TeamMembers.Clear();
            project.TeamMembers.AddRange(teamMembers);

            await _context.SaveChangesAsync();

            return await GetProjectByIdAsync(projectId, userId);
        }

        public async Task<bool> DeleteProjectAsync(int projectId, int userId)
        {
            var project = await _context.Projects
                .FirstOrDefaultAsync(p => p.Id == projectId && p.CreatedByUserId == userId);

            if (project == null)
                return false;

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<ProjectDto>> GetProjectsWithPaginationAsync(int userId, int page, int pageSize)
        {
            return await _context.Projects
                .Where(p => p.CreatedByUserId == userId)
                .Include(p => p.CreatedByUser)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new ProjectDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    CreatedAt = p.CreatedAt,
                    DueDate = p.DueDate,
                    Status = p.Status,
                    CreatedByUser = new UserDto
                    {
                        Id = p.CreatedByUser.Id,
                        Name = p.CreatedByUser.Name,
                        Email = p.CreatedByUser.Email,
                        CreatedAt = p.CreatedByUser.CreatedAt
                    },
                    TeamMembers = new List<UserDto>(), // Simplificado
                    Tasks = new List<TaskItemDto>() // Simplificado
                })
                .ToListAsync();
        }
    }
}
