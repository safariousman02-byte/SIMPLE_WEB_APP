document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const prioritySelect = document.getElementById('prioritySelect');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    const saveTasksBtn = document.getElementById('saveTasksBtn');
    const loadTasksBtn = document.getElementById('loadTasksBtn');
    
    // Stats elements
    const totalTasksEl = document.getElementById('totalTasks');
    const completedTasksEl = document.getElementById('completedTasks');
    const pendingTasksEl = document.getElementById('pendingTasks');
    
    // Timestamp element
    const timestampEl = document.getElementById('timestamp');
    
    // Initialize tasks array
    let tasks = [];
    let currentFilter = 'all';
    
    // Initialize timestamp
    updateTimestamp();
    
    // Event Listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Set current filter and update task list
            currentFilter = this.getAttribute('data-filter');
            renderTasks();
        });
    });
    
    clearCompletedBtn.addEventListener('click', clearCompletedTasks);
    saveTasksBtn.addEventListener('click', saveTasksToLocalStorage);
    loadTasksBtn.addEventListener('click', loadTasksFromLocalStorage);
    
    // Load tasks from localStorage on page load
    loadTasksFromLocalStorage();
    
    // Functions
    function addTask() {
        const taskText = taskInput.value.trim();
        const priority = prioritySelect.value;
        
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }
        
        // Create new task object
        const newTask = {
            id: Date.now(),
            text: taskText,
            priority: priority,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        // Add to tasks array
        tasks.push(newTask);
        
        // Clear input
        taskInput.value = '';
        
        // Render tasks and update stats
        renderTasks();
        updateStats();
        
        // Save to localStorage
        saveTasksToLocalStorage();
    }
    
    function renderTasks() {
        // Clear task list
        taskList.innerHTML = '';
        
        // Filter tasks based on current filter
        let filteredTasks = tasks;
        
        if (currentFilter === 'pending') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }
        
        // Show empty message if no tasks
        if (filteredTasks.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.className = 'empty-message';
            
            if (currentFilter === 'all') {
                emptyMessage.textContent = 'No tasks added yet. Add your first task above!';
            } else if (currentFilter === 'pending') {
                emptyMessage.textContent = 'No pending tasks. Great job!';
            } else if (currentFilter === 'completed') {
                emptyMessage.textContent = 'No completed tasks yet. Complete some tasks!';
            }
            
            taskList.appendChild(emptyMessage);
            return;
        }
        
        // Render each task
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskItem.setAttribute('data-id', task.id);
            
            // Priority class
            const priorityClass = `priority-${task.priority}`;
            
            taskItem.innerHTML = `
                <div class="task-content">
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                    <span class="task-text">${task.text}</span>
                    <span class="task-priority ${priorityClass}">${task.priority}</span>
                </div>
                <div class="task-actions">
                    <button class="delete-btn"><i class="fas fa-trash"></i> Delete</button>
                </div>
            `;
            
            // Add event listeners to checkbox and delete button
            const checkbox = taskItem.querySelector('.task-checkbox');
            const deleteBtn = taskItem.querySelector('.delete-btn');
            
            checkbox.addEventListener('change', function() {
                toggleTaskCompletion(task.id);
            });
            
            deleteBtn.addEventListener('click', function() {
                deleteTask(task.id);
            });
            
            taskList.appendChild(taskItem);
        });
    }
    
    function toggleTaskCompletion(taskId) {
        // Find task by id and toggle completed status
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        
        if (taskIndex !== -1) {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            renderTasks();
            updateStats();
            saveTasksToLocalStorage();
        }
    }
    
    function deleteTask(taskId) {
        // Remove task from array
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
        updateStats();
        saveTasksToLocalStorage();
    }
    
    function clearCompletedTasks() {
        // Keep only pending tasks
        tasks = tasks.filter(task => !task.completed);
        renderTasks();
        updateStats();
        saveTasksToLocalStorage();
    }
    
    function updateStats() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        const pendingTasks = totalTasks - completedTasks;
        
        totalTasksEl.textContent = totalTasks;
        completedTasksEl.textContent = completedTasks;
        pendingTasksEl.textContent = pendingTasks;
    }
    
    function saveTasksToLocalStorage() {
        localStorage.setItem('taskManagerTasks', JSON.stringify(tasks));
        
        // Show confirmation message
        showNotification('Tasks saved to local storage!');
    }
    
    function loadTasksFromLocalStorage() {
        const savedTasks = localStorage.getItem('taskManagerTasks');
        
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
            renderTasks();
            updateStats();
            showNotification('Tasks loaded from local storage!');
        } else {
            showNotification('No saved tasks found.');
        }
    }
    
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            font-weight: 500;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    function updateTimestamp() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        timestampEl.textContent = `Last updated: ${now.toLocaleDateString('en-US', options)}`;
    }
    
    // Add CSS animations for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});