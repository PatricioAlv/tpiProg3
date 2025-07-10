// TaskManager MVC - Funciones JavaScript adicionales

// Función para descargar el código QR
function downloadQR() {
    const qrImage = document.querySelector('.qr-code img');
    if (qrImage) {
        const link = document.createElement('a');
        link.download = 'codigo-qr-taskmanager.png';
        link.href = qrImage.src;
        link.click();
    }
}

// Función para compartir el código QR
function shareQR() {
    const qrImage = document.querySelector('.qr-code img');
    if (qrImage && navigator.share) {
        navigator.share({
            title: 'Código QR TaskManager',
            text: 'Mi código QR de acceso exclusivo a TaskManager',
            url: window.location.href
        }).catch(err => {
            console.log('Error sharing:', err);
            // Fallback: copiar URL al portapapeles
            copyToClipboard(window.location.href);
        });
    } else {
        // Fallback: copiar URL al portapapeles
        copyToClipboard(window.location.href);
    }
}

// Función para copiar texto al portapapeles
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('URL copiada al portapapeles', 'success');
    }).catch(err => {
        console.error('Error copying to clipboard:', err);
        showNotification('Error al copiar al portapapeles', 'error');
    });
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '1050';
    notification.style.minWidth = '300px';
    
    notification.innerHTML = `
        <strong>${type === 'success' ? 'Éxito' : type === 'error' ? 'Error' : 'Información'}:</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

// Función para aplicar filtros en las listas
function applyFilters() {
    const statusFilter = document.getElementById('statusFilter')?.value;
    const priorityFilter = document.getElementById('priorityFilter')?.value;
    const searchTerm = document.getElementById('searchTerm')?.value.toLowerCase();
    
    const cards = document.querySelectorAll('.task-card, .project-card');
    
    cards.forEach(card => {
        let show = true;
        
        // Filtro por estado
        if (statusFilter && card.dataset.status !== statusFilter) {
            show = false;
        }
        
        // Filtro por prioridad
        if (priorityFilter && card.dataset.priority !== priorityFilter) {
            show = false;
        }
        
        // Filtro por término de búsqueda
        if (searchTerm) {
            const text = card.textContent.toLowerCase();
            if (!text.includes(searchTerm)) {
                show = false;
            }
        }
        
        // Mostrar/ocultar con animación
        if (show) {
            card.style.display = 'block';
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 50);
        } else {
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Función para limpiar filtros
function clearFilters() {
    document.getElementById('statusFilter').value = '';
    document.getElementById('priorityFilter').value = '';
    document.getElementById('searchTerm').value = '';
    applyFilters();
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Aplicar animaciones de entrada
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Aplicar animaciones de deslizamiento
    const slideElements = document.querySelectorAll('.slide-in');
    slideElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, index * 50);
    });
    
    // Configurar búsqueda en tiempo real
    const searchInput = document.getElementById('searchTerm');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                applyFilters();
            }, 300);
        });
    }
    
    // Configurar filtros
    const statusFilter = document.getElementById('statusFilter');
    const priorityFilter = document.getElementById('priorityFilter');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', applyFilters);
    }
    
    if (priorityFilter) {
        priorityFilter.addEventListener('change', applyFilters);
    }
    
    // Inicializar tooltips de Bootstrap si están disponibles
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
});

// Función para confirmar eliminación
function confirmDelete(itemName, deleteUrl) {
    if (confirm(`¿Estás seguro de que deseas eliminar "${itemName}"? Esta acción no se puede deshacer.`)) {
        window.location.href = deleteUrl;
    }
}

// Función para actualizar el progreso de un proyecto
function updateProgress(projectId, progressPercentage) {
    const progressBar = document.querySelector(`[data-project-id="${projectId}"] .progress-bar`);
    if (progressBar) {
        progressBar.style.width = progressPercentage + '%';
        progressBar.setAttribute('aria-valuenow', progressPercentage);
        
        // Animar el cambio
        progressBar.style.transition = 'width 0.5s ease-in-out';
    }
}

// Función para marcar tarea como completada
function toggleTaskComplete(taskId) {
    // Aquí se podría implementar una llamada AJAX para actualizar el estado
    console.log('Toggling task completion for task:', taskId);
}

// Función para expandir/contraer detalles
function toggleDetails(element) {
    const details = element.nextElementSibling;
    if (details && details.classList.contains('collapse-details')) {
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
        
        const icon = element.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        }
    }
}
