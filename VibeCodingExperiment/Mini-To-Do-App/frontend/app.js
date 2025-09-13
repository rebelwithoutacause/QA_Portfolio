const API_BASE = 'http://localhost:3001';

class TodoApp {
    constructor() {
        this.taskInput = document.getElementById('taskInput');
        this.addBtn = document.getElementById('addBtn');
        this.tasksList = document.getElementById('tasksList');

        this.initEventListeners();
        this.loadTasks();
    }

    initEventListeners() {
        this.addBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });
    }

    async loadTasks() {
        try {
            const response = await fetch(`${API_BASE}/tasks`);
            const tasks = await response.json();
            this.renderTasks(tasks);
        } catch (error) {
            console.error('Error loading tasks:', error);
            this.showError('Failed to load tasks');
        }
    }

    async addTask() {
        const title = this.taskInput.value.trim();

        if (!title) {
            this.taskInput.focus();
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }),
            });

            if (response.ok) {
                this.taskInput.value = '';
                this.loadTasks();
            } else {
                throw new Error('Failed to add task');
            }
        } catch (error) {
            console.error('Error adding task:', error);
            this.showError('Failed to add task');
        }
    }

    async toggleTask(taskId) {
        try {
            const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
                method: 'PUT',
            });

            if (response.ok) {
                this.loadTasks();
            } else {
                throw new Error('Failed to update task');
            }
        } catch (error) {
            console.error('Error updating task:', error);
            this.showError('Failed to update task');
        }
    }

    async deleteTask(taskId) {
        if (!confirm('Are you sure you want to delete this task?')) {
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                this.loadTasks();
            } else {
                throw new Error('Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            this.showError('Failed to delete task');
        }
    }

    renderTasks(tasks) {
        this.tasksList.innerHTML = '';

        if (tasks.length === 0) {
            this.tasksList.innerHTML = '<li class="empty-state">No tasks yet. Add one above!</li>';
            return;
        }

        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.done ? 'done' : ''}`;

            taskItem.innerHTML = `
                <span class="task-text ${task.done ? 'done' : ''}">${this.escapeHtml(task.title)}</span>
                <div class="task-actions">
                    <button class="done-btn ${task.done ? 'completed' : ''}" onclick="app.toggleTask(${task.id})">
                        ${task.done ? 'Undo' : 'Done'}
                    </button>
                    <button class="delete-btn" onclick="app.deleteTask(${task.id})">Delete</button>
                </div>
            `;

            this.tasksList.appendChild(taskItem);
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showError(message) {
        alert(message);
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TodoApp();
});