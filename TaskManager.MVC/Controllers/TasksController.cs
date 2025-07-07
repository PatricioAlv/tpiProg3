using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManager.Shared.Services;
using TaskManager.Shared.DTOs;

namespace TaskManager.MVC.Controllers
{
    [Authorize]
    public class TasksController : Controller
    {
        private readonly ITaskService _taskService;
        private readonly IProjectService _projectService;
        private readonly IAuthService _authService;

        public TasksController(ITaskService taskService, IProjectService projectService, IAuthService authService)
        {
            _taskService = taskService;
            _projectService = projectService;
            _authService = authService;
        }

        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            return int.Parse(userIdClaim!.Value);
        }

        public async Task<IActionResult> Index(int page = 1, int pageSize = 10)
        {
            var userId = GetCurrentUserId();
            var tasks = await _taskService.GetTasksWithPaginationAsync(userId, page, pageSize);
            
            ViewBag.CurrentPage = page;
            ViewBag.PageSize = pageSize;
            
            return View(tasks);
        }

        public async Task<IActionResult> Details(int id)
        {
            var userId = GetCurrentUserId();
            var task = await _taskService.GetTaskByIdAsync(id, userId);
            
            if (task == null)
            {
                return NotFound();
            }

            return View(task);
        }

        public async Task<IActionResult> Create()
        {
            var userId = GetCurrentUserId();
            var projects = await _projectService.GetAllProjectsAsync(userId);
            var users = await _authService.GetAllUsersAsync();
            
            ViewBag.Projects = projects;
            ViewBag.Users = users;
            
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(CreateTaskItemDto model)
        {
            if (!ModelState.IsValid)
            {
                var userId = GetCurrentUserId();
                var projects = await _projectService.GetAllProjectsAsync(userId);
                var users = await _authService.GetAllUsersAsync();
                
                ViewBag.Projects = projects;
                ViewBag.Users = users;
                
                return View(model);
            }

            var currentUserId = GetCurrentUserId();
            var task = await _taskService.CreateTaskAsync(model, currentUserId);
            
            if (task == null)
            {
                var userId = GetCurrentUserId();
                var projects = await _projectService.GetAllProjectsAsync(userId);
                var users = await _authService.GetAllUsersAsync();
                
                ViewBag.Projects = projects;
                ViewBag.Users = users;
                
                ModelState.AddModelError("", "Error al crear la tarea");
                return View(model);
            }

            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Edit(int id)
        {
            var userId = GetCurrentUserId();
            var task = await _taskService.GetTaskByIdAsync(id, userId);
            
            if (task == null)
            {
                return NotFound();
            }

            var projects = await _projectService.GetAllProjectsAsync(userId);
            var users = await _authService.GetAllUsersAsync();
            
            ViewBag.Projects = projects;
            ViewBag.Users = users;
            
            var model = new UpdateTaskItemDto
            {
                Title = task.Title,
                Description = task.Description,
                DueDate = task.DueDate,
                Status = task.Status,
                Priority = task.Priority,
                AssignedToUserId = task.AssignedToUser?.Id
            };

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, UpdateTaskItemDto model)
        {
            if (!ModelState.IsValid)
            {
                var userId = GetCurrentUserId();
                var projects = await _projectService.GetAllProjectsAsync(userId);
                var users = await _authService.GetAllUsersAsync();
                
                ViewBag.Projects = projects;
                ViewBag.Users = users;
                
                return View(model);
            }

            var userId2 = GetCurrentUserId();
            var task = await _taskService.UpdateTaskAsync(id, model, userId2);
            
            if (task == null)
            {
                return NotFound();
            }

            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Delete(int id)
        {
            var userId = GetCurrentUserId();
            var task = await _taskService.GetTaskByIdAsync(id, userId);
            
            if (task == null)
            {
                return NotFound();
            }

            return View(task);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var userId = GetCurrentUserId();
            await _taskService.DeleteTaskAsync(id, userId);
            return RedirectToAction(nameof(Index));
        }
    }
}
