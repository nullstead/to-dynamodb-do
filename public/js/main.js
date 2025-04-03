
document.addEventListener('DOMContentLoaded', function() {
    // Add animations to todo items
    const todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach((item, index) => {
      item.style.animation = `fadeIn 0.3s ease forwards ${index * 0.1}s`;
      item.style.opacity = '0';
    });
  
    // Add confirm dialog to delete buttons (as a backup to the inline onclick)
    const deleteForms = document.querySelectorAll('form[action^="/delete/"]');
    deleteForms.forEach(form => {
      form.addEventListener('submit', function(e) {
        if (!confirm('Are you sure you want to delete this todo?')) {
          e.preventDefault();
        }
      });
    });
  });
  