using System.ComponentModel.DataAnnotations;

namespace TaskManager.Shared.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
        
        public string Salt { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; }
        
        public string? ResetToken { get; set; }
        
        public DateTime? ResetTokenExpiry { get; set; }
        
        public List<TaskItem> AssignedTasks { get; set; } = new();
    }
}
