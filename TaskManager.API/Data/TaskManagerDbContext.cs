using Microsoft.EntityFrameworkCore;
using TaskManager.Shared.Models;

namespace TaskManager.API.Data
{
    public class TaskManagerDbContext : DbContext
    {
        public TaskManagerDbContext(DbContextOptions<TaskManagerDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Project> Projects { get; set; } = null!;
        public DbSet<TaskItem> TaskItems { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
                entity.Property(e => e.PasswordHash).IsRequired();
                entity.Property(e => e.Salt).IsRequired();
            });

            // Project configuration
            modelBuilder.Entity<Project>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(1000);
                
                entity.HasOne(e => e.CreatedByUser)
                    .WithMany()
                    .HasForeignKey(e => e.CreatedByUserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // TaskItem configuration
            modelBuilder.Entity<TaskItem>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(1000);
                
                entity.HasOne(e => e.Project)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(e => e.ProjectId)
                    .OnDelete(DeleteBehavior.Cascade);
                
                entity.HasOne(e => e.AssignedToUser)
                    .WithMany(u => u.AssignedTasks)
                    .HasForeignKey(e => e.AssignedToUserId)
                    .OnDelete(DeleteBehavior.SetNull);
                
                entity.HasOne(e => e.CreatedByUser)
                    .WithMany()
                    .HasForeignKey(e => e.CreatedByUserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Many-to-many relationship between Project and User (team members)
            modelBuilder.Entity<Project>()
                .HasMany(p => p.TeamMembers)
                .WithMany()
                .UsingEntity(j => j.ToTable("ProjectTeamMembers"));

            base.OnModelCreating(modelBuilder);
        }
    }
}
