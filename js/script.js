document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const todoList = document.getElementById('todoList');
    const completedList = document.getElementById('completedList');
    const archiveList = document.getElementById('archiveList');
    const tasks = [];

    function addTask(taskText) {
        const task = {
            text: taskText,
            completed: false,
            archived: false
        };
        tasks.push(task);
        displayTasks();
    }

    function completeTask(index) {
        tasks[index].completed = true;
        displayTasks();
    }

    function archiveTask(index) {
        tasks[index].archived = true;
        displayTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        displayTasks();
    }

    function createTaskElement(task, index) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            ${!task.completed && !task.archived ? '<button class="complete">Complete</button>' : ''}
            ${!task.archived ? '<button class="archive">Archive</button>' : ''}
            ${task.archived ? '<button class="delete">Delete</button>' : ''}
        `;

        const completeButton = li.querySelector('.complete');
        const archiveButton = li.querySelector('.archive');
        const deleteButton = li.querySelector('.delete');

        if (completeButton) {
            completeButton.addEventListener('click', function () {
                completeTask(index);
            });
        }

        if (archiveButton) {
            archiveButton.addEventListener('click', function () {
                if (task.completed) {
                    archiveTask(index);
                } else {
                    completeTask(index);
                    archiveTask(index);
                }
            });
        }

        if (deleteButton) {
            deleteButton.addEventListener('click', function () {
                deleteTask(index);
            });
        }

        return li;
    }

    function displayTasks() {
        todoList.innerHTML = '';
        completedList.innerHTML = '';
        archiveList.innerHTML = '';

        tasks.forEach(function (task, index) {
            const taskElement = createTaskElement(task, index);
            if (task.completed && !task.archived) {
                completedList.appendChild(taskElement);
            } else if (task.archived) {
                archiveList.appendChild(taskElement);
            } else {
                todoList.appendChild(taskElement);
            }
        });
    }

    addTaskButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    displayTasks();
});
