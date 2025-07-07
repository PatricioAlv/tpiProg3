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
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            return int.Parse(userIdClaim!.Value);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {
            var userId = GetCurrentUserId();
            var tasks = await _taskService.GetAllTasksAsync(userId);
            return Ok(tasks);
        }

        [HttpGet("paginated")]
        public async Task<IActionResult> GetTasksWithPagination([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var userId = GetCurrentUserId();
            var tasks = await _taskService.GetTasksWithPaginationAsync(userId, page, pageSize);
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(int id)
        {
            var userId = GetCurrentUserId();
            var task = await _taskService.GetTaskByIdAsync(id, userId);
            
            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpGet("by-project/{projectId}")]
        public async Task<IActionResult> GetTasksByProjectId(int projectId)
        {
            var userId = GetCurrentUserId();
            var tasks = await _taskService.GetTasksByProjectIdAsync(projectId, userId);
            return Ok(tasks);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] CreateTaskItemDto createTaskDto)
        {
            var userId = GetCurrentUserId();
            var task = await _taskService.CreateTaskAsync(createTaskDto, userId);
            
            if (task == null)
            {
                return BadRequest();
            }

            return CreatedAtAction(nameof(GetTaskById), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] UpdateTaskItemDto updateTaskDto)
        {
            var userId = GetCurrentUserId();
            var task = await _taskService.UpdateTaskAsync(id, updateTaskDto, userId);
            
            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var userId = GetCurrentUserId();
            var result = await _taskService.DeleteTaskAsync(id, userId);
            
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
