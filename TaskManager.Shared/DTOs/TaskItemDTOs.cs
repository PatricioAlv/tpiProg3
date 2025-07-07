using System.ComponentModel.DataAnnotations;
using TaskManager.Shared.Models;

namespace TaskManager.Shared.DTOs
{
    public class TaskItemDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime? DueDate { get; set; }
        public TaskManager.Shared.Models.TaskStatus Status { get; set; }
        public TaskManager.Shared.Models.TaskPriority Priority { get; set; }
        public int ProjectId { get; set; }
        public string ProjectName { get; set; } = string.Empty;
        public UserDto? AssignedToUser { get; set; }
        public UserDto CreatedByUser { get; set; } = null!;
    }
    
    public class CreateTaskItemDto
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;
        
        public DateTime? DueDate { get; set; }
        
        public TaskManager.Shared.Models.TaskStatus Status { get; set; } = TaskManager.Shared.Models.TaskStatus.Todo;
        
        public TaskManager.Shared.Models.TaskPriority Priority { get; set; } = TaskManager.Shared.Models.TaskPriority.Medium;
        
        [Required]
        public int ProjectId { get; set; }
        
        public int? AssignedToUserId { get; set; }
    }
    
    public class UpdateTaskItemDto
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;
        
        public DateTime? DueDate { get; set; }
        
        public TaskManager.Shared.Models.TaskStatus Status { get; set; }
        
        public TaskManager.Shared.Models.TaskPriority Priority { get; set; }
        
        public int? AssignedToUserId { get; set; }
    }
}
