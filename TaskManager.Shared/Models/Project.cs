using System.ComponentModel.DataAnnotations;

namespace TaskManager.Shared.Models
{
    public class Project
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; }
        
        public DateTime? DueDate { get; set; }
        
        public ProjectStatus Status { get; set; } = ProjectStatus.Planning;
        
        public int CreatedByUserId { get; set; }
        
        public User CreatedByUser { get; set; } = null!;
        
        public List<TaskItem> Tasks { get; set; } = new();
        
        public List<User> TeamMembers { get; set; } = new();
    }
    
    public enum ProjectStatus
    {
        Planning,
        InProgress,
        Completed,
        OnHold,
        Cancelled
    }
}
