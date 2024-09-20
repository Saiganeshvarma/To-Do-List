document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const taskList = document.getElementById("task-list");
    const addTaskButton = document.getElementById("add-task");
    const newTaskInput = document.getElementById("new-task");
    const searchTaskInput = document.getElementById("search-task");

    // Check if dark mode was previously enabled
    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark");
        darkModeToggle.textContent = "Light Mode";
    }

    // Toggle dark mode on button click
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        if (document.body.classList.contains("dark")) {
            darkModeToggle.textContent = "Light Mode";
            localStorage.setItem("dark-mode", "enabled"); // Store preference
        } else {
            darkModeToggle.textContent = "Dark Mode";
            localStorage.setItem("dark-mode", "disabled");
        }
    });

    // Add task
    addTaskButton.addEventListener("click", () => {
        const taskText = newTaskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            newTaskInput.value = "";
        }
    });

    // Add task function
    function addTask(text) {
        const li = document.createElement("li");
        li.textContent = text;

        // Add complete button
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
        completeBtn.classList.add("complete-btn");
        completeBtn.addEventListener("click", () => {
            if (li.classList.contains("completed")) {
                li.classList.remove("completed");
                completeBtn.textContent = "Complete";
                completeBtn.classList.remove("undo-btn");
                completeBtn.classList.add("complete-btn");
            } else {
                li.classList.add("completed");
                completeBtn.textContent = "Undo";
                completeBtn.classList.remove("complete-btn");
                completeBtn.classList.add("undo-btn");
            }
        });

        // Add delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            li.remove();
        });

        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    // Task search
    searchTaskInput.addEventListener("input", () => {
        const searchValue = searchTaskInput.value.toLowerCase();
        const tasks = taskList.getElementsByTagName("li");
        Array.from(tasks).forEach(task => {
            const taskText = task.firstChild.textContent.toLowerCase();
            if (taskText.includes(searchValue)) {
                task.style.display = "flex";
            } else {
                task.style.display = "none";
            }
        });
    });
});
