using System.ComponentModel.DataAnnotations;

namespace TaskManager.Shared.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; }
        
        public DateTime? DueDate { get; set; }
        
        public TaskStatus Status { get; set; } = TaskStatus.Todo;
        
        public TaskPriority Priority { get; set; } = TaskPriority.Medium;
        
        public int ProjectId { get; set; }
        
        public Project Project { get; set; } = null!;
        
        public int? AssignedToUserId { get; set; }
        
        public User? AssignedToUser { get; set; }
        
        public int CreatedByUserId { get; set; }
        
        public User CreatedByUser { get; set; } = null!;
    }
    
    public enum TaskStatus
    {
        Todo,
        InProgress,
        Testing,
        Completed,
        Cancelled
    }
    
    public enum TaskPriority
    {
        Low,
        Medium,
        High,
        Critical
    }
}
