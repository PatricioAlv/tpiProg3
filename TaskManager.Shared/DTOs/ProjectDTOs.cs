using System.ComponentModel.DataAnnotations;
using TaskManager.Shared.Models;

namespace TaskManager.Shared.DTOs
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime? DueDate { get; set; }
        public ProjectStatus Status { get; set; }
        public UserDto CreatedByUser { get; set; } = null!;
        public List<UserDto> TeamMembers { get; set; } = new();
        public List<TaskItemDto> Tasks { get; set; } = new();
    }
    
    public class CreateProjectDto
    {
        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;
        
        public DateTime? DueDate { get; set; }
        
        public ProjectStatus Status { get; set; } = ProjectStatus.Planning;
        
        public List<int> TeamMemberIds { get; set; } = new();
    }
    
    public class UpdateProjectDto
    {
        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;
        
        public DateTime? DueDate { get; set; }
        
        public ProjectStatus Status { get; set; }
        
        public List<int> TeamMemberIds { get; set; } = new();
    }
}
