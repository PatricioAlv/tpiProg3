using Microsoft.EntityFrameworkCore;
using TaskManager.API.Data;
using TaskManager.Shared.DTOs;
using TaskManager.Shared.Models;

namespace TaskManager.API.Services
{
    public class TaskService : ITaskService
    {
        private readonly TaskManagerDbContext _context;

        public TaskService(TaskManagerDbContext context)
        {
            _context = context;
        }

        public async Task<List<TaskItemDto>> GetAllTasksAsync(int userId)
        {
            return await _context.TaskItems
                .Where(t => t.CreatedByUserId == userId || 
                           t.AssignedToUserId == userId ||
                           t.Project.CreatedByUserId == userId ||
                           t.Project.TeamMembers.Any(tm => tm.Id == userId))
                .Include(t => t.Project)
                .Include(t => t.AssignedToUser)
                .Include(t => t.CreatedByUser)
                .Select(t => new TaskItemDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    CreatedAt = t.CreatedAt,
                    DueDate = t.DueDate,
                    Status = t.Status,
                    Priority = t.Priority,
                    ProjectId = t.ProjectId,
                    ProjectName = t.Project.Name,
                    AssignedToUser = t.AssignedToUser != null ? new UserDto
                    {
                        Id = t.AssignedToUser.Id,
                        Name = t.AssignedToUser.Name,
                        Email = t.AssignedToUser.Email,
                        CreatedAt = t.AssignedToUser.CreatedAt
                    } : null,
                    CreatedByUser = new UserDto
                    {
                        Id = t.CreatedByUser.Id,
                        Name = t.CreatedByUser.Name,
                        Email = t.CreatedByUser.Email,
                        CreatedAt = t.CreatedByUser.CreatedAt
                    }
                })
                .ToListAsync();
        }

        public async Task<TaskItemDto?> GetTaskByIdAsync(int taskId, int userId)
        {
            var task = await _context.TaskItems
                .Where(t => t.Id == taskId && 
                           (t.CreatedByUserId == userId || 
                            t.AssignedToUserId == userId ||
                            t.Project.CreatedByUserId == userId ||
                            t.Project.TeamMembers.Any(tm => tm.Id == userId)))
                .Include(t => t.Project)
                .Include(t => t.AssignedToUser)
                .Include(t => t.CreatedByUser)
                .FirstOrDefaultAsync();

            if (task == null)
                return null;

            return new TaskItemDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                CreatedAt = task.CreatedAt,
                DueDate = task.DueDate,
                Status = task.Status,
                Priority = task.Priority,
                ProjectId = task.ProjectId,
                ProjectName = task.Project.Name,
                AssignedToUser = task.AssignedToUser != null ? new UserDto
                {
                    Id = task.AssignedToUser.Id,
                    Name = task.AssignedToUser.Name,
                    Email = task.AssignedToUser.Email,
                    CreatedAt = task.AssignedToUser.CreatedAt
                } : null,
                CreatedByUser = new UserDto
                {
                    Id = task.CreatedByUser.Id,
                    Name = task.CreatedByUser.Name,
                    Email = task.CreatedByUser.Email,
                    CreatedAt = task.CreatedByUser.CreatedAt
                }
            };
        }

        public async Task<TaskItemDto?> CreateTaskAsync(CreateTaskItemDto createTaskDto, int userId)
        {
            // Verificar que el usuario tiene acceso al proyecto
            var project = await _context.Projects
                .FirstOrDefaultAsync(p => p.Id == createTaskDto.ProjectId && p.CreatedByUserId == userId);

            if (project == null)
                return null;

            var task = new TaskItem
            {
                Title = createTaskDto.Title,
                Description = createTaskDto.Description,
                DueDate = createTaskDto.DueDate,
                Status = createTaskDto.Status,
                Priority = createTaskDto.Priority,
                ProjectId = createTaskDto.ProjectId,
                AssignedToUserId = createTaskDto.AssignedToUserId,
                CreatedByUserId = userId,
                CreatedAt = DateTime.UtcNow
            };

            _context.TaskItems.Add(task);
            await _context.SaveChangesAsync();

            return await GetTaskByIdAsync(task.Id, userId);
        }

        public async Task<TaskItemDto?> UpdateTaskAsync(int taskId, UpdateTaskItemDto updateTaskDto, int userId)
        {
            var task = await _context.TaskItems
                .Include(t => t.Project)
                .FirstOrDefaultAsync(t => t.Id == taskId && 
                                         (t.CreatedByUserId == userId || 
                                          t.AssignedToUserId == userId ||
                                          t.Project.CreatedByUserId == userId));

            if (task == null)
                return null;

            task.Title = updateTaskDto.Title;
            task.Description = updateTaskDto.Description;
            task.DueDate = updateTaskDto.DueDate;
            task.Status = updateTaskDto.Status;
            task.Priority = updateTaskDto.Priority;
            task.AssignedToUserId = updateTaskDto.AssignedToUserId;

            await _context.SaveChangesAsync();

            return await GetTaskByIdAsync(taskId, userId);
        }

        public async Task<bool> DeleteTaskAsync(int taskId, int userId)
        {
            var task = await _context.TaskItems
                .Include(t => t.Project)
                .FirstOrDefaultAsync(t => t.Id == taskId && 
                                         (t.CreatedByUserId == userId || 
                                          t.Project.CreatedByUserId == userId));

            if (task == null)
                return false;

            _context.TaskItems.Remove(task);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<TaskItemDto>> GetTasksByProjectIdAsync(int projectId, int userId)
        {
            return await _context.TaskItems
                .Where(t => t.ProjectId == projectId && 
                           (t.CreatedByUserId == userId || 
                            t.AssignedToUserId == userId ||
                            t.Project.CreatedByUserId == userId))
                .Include(t => t.Project)
                .Include(t => t.AssignedToUser)
                .Include(t => t.CreatedByUser)
                .Select(t => new TaskItemDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    CreatedAt = t.CreatedAt,
                    DueDate = t.DueDate,
                    Status = t.Status,
                    Priority = t.Priority,
                    ProjectId = t.ProjectId,
                    ProjectName = t.Project.Name,
                    AssignedToUser = t.AssignedToUser != null ? new UserDto
                    {
                        Id = t.AssignedToUser.Id,
                        Name = t.AssignedToUser.Name,
                        Email = t.AssignedToUser.Email,
                        CreatedAt = t.AssignedToUser.CreatedAt
                    } : null,
                    CreatedByUser = new UserDto
                    {
                        Id = t.CreatedByUser.Id,
                        Name = t.CreatedByUser.Name,
                        Email = t.CreatedByUser.Email,
                        CreatedAt = t.CreatedByUser.CreatedAt
                    }
                })
                .ToListAsync();
        }

        public async Task<List<TaskItemDto>> GetTasksWithPaginationAsync(int userId, int page, int pageSize)
        {
            return await _context.TaskItems
                .Where(t => t.CreatedByUserId == userId || 
                           t.AssignedToUserId == userId ||
                           t.Project.CreatedByUserId == userId ||
                           t.Project.TeamMembers.Any(tm => tm.Id == userId))
                .Include(t => t.Project)
                .Include(t => t.AssignedToUser)
                .Include(t => t.CreatedByUser)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(t => new TaskItemDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    CreatedAt = t.CreatedAt,
                    DueDate = t.DueDate,
                    Status = t.Status,
                    Priority = t.Priority,
                    ProjectId = t.ProjectId,
                    ProjectName = t.Project.Name,
                    AssignedToUser = t.AssignedToUser != null ? new UserDto
                    {
                        Id = t.AssignedToUser.Id,
                        Name = t.AssignedToUser.Name,
                        Email = t.AssignedToUser.Email,
                        CreatedAt = t.AssignedToUser.CreatedAt
                    } : null,
                    CreatedByUser = new UserDto
                    {
                        Id = t.CreatedByUser.Id,
                        Name = t.CreatedByUser.Name,
                        Email = t.CreatedByUser.Email,
                        CreatedAt = t.CreatedByUser.CreatedAt
                    }
                })
                .ToListAsync();
        }
    }
}
