using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManager.Shared.Services;
using TaskManager.Shared.DTOs;

namespace TaskManager.MVC.Controllers
{
    [Authorize]
    public class ProjectsController : Controller
    {
        private readonly IProjectService _projectService;
        private readonly IAuthService _authService;

        public ProjectsController(IProjectService projectService, IAuthService authService)
        {
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
            var projects = await _projectService.GetProjectsWithPaginationAsync(userId, page, pageSize);
            
            ViewBag.CurrentPage = page;
            ViewBag.PageSize = pageSize;
            
            return View(projects);
        }

        public async Task<IActionResult> Details(int id)
        {
            var userId = GetCurrentUserId();
            var project = await _projectService.GetProjectByIdAsync(id, userId);
            
            if (project == null)
            {
                return NotFound();
            }

            return View(project);
        }

        public async Task<IActionResult> Create()
        {
            var users = await _authService.GetAllUsersAsync();
            ViewBag.Users = users;
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(CreateProjectDto model)
        {
            if (!ModelState.IsValid)
            {
                var users = await _authService.GetAllUsersAsync();
                ViewBag.Users = users;
                return View(model);
            }

            var userId = GetCurrentUserId();
            var project = await _projectService.CreateProjectAsync(model, userId);
            
            if (project == null)
            {
                var users = await _authService.GetAllUsersAsync();
                ViewBag.Users = users;
                ModelState.AddModelError("", "Error al crear el proyecto");
                return View(model);
            }

            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Edit(int id)
        {
            var userId = GetCurrentUserId();
            var project = await _projectService.GetProjectByIdAsync(id, userId);
            
            if (project == null)
            {
                return NotFound();
            }

            var users = await _authService.GetAllUsersAsync();
            ViewBag.Users = users;
            
            var model = new UpdateProjectDto
            {
                Name = project.Name,
                Description = project.Description,
                DueDate = project.DueDate,
                Status = project.Status,
                TeamMemberIds = project.TeamMembers.Select(tm => tm.Id).ToList()
            };

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, UpdateProjectDto model)
        {
            if (!ModelState.IsValid)
            {
                var users = await _authService.GetAllUsersAsync();
                ViewBag.Users = users;
                return View(model);
            }

            var userId = GetCurrentUserId();
            var project = await _projectService.UpdateProjectAsync(id, model, userId);
            
            if (project == null)
            {
                return NotFound();
            }

            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Delete(int id)
        {
            var userId = GetCurrentUserId();
            var project = await _projectService.GetProjectByIdAsync(id, userId);
            
            if (project == null)
            {
                return NotFound();
            }

            return View(project);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var userId = GetCurrentUserId();
            await _projectService.DeleteProjectAsync(id, userId);
            return RedirectToAction(nameof(Index));
        }
    }
}
