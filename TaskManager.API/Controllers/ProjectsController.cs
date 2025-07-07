using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManager.API.Services;
using TaskManager.Shared.DTOs;

namespace TaskManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            return int.Parse(userIdClaim!.Value);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProjects()
        {
            var userId = GetCurrentUserId();
            var projects = await _projectService.GetAllProjectsAsync(userId);
            return Ok(projects);
        }

        [HttpGet("paginated")]
        public async Task<IActionResult> GetProjectsWithPagination([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var userId = GetCurrentUserId();
            var projects = await _projectService.GetProjectsWithPaginationAsync(userId, page, pageSize);
            return Ok(projects);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectById(int id)
        {
            var userId = GetCurrentUserId();
            var project = await _projectService.GetProjectByIdAsync(id, userId);
            
            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject([FromBody] CreateProjectDto createProjectDto)
        {
            var userId = GetCurrentUserId();
            var project = await _projectService.CreateProjectAsync(createProjectDto, userId);
            
            if (project == null)
            {
                return BadRequest();
            }

            return CreatedAtAction(nameof(GetProjectById), new { id = project.Id }, project);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, [FromBody] UpdateProjectDto updateProjectDto)
        {
            var userId = GetCurrentUserId();
            var project = await _projectService.UpdateProjectAsync(id, updateProjectDto, userId);
            
            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var userId = GetCurrentUserId();
            var result = await _projectService.DeleteProjectAsync(id, userId);
            
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
