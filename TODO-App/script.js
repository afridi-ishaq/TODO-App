const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");

    // Load saved tasks
    document.addEventListener("DOMContentLoaded", loadTasks);

    // Add task
    addBtn.addEventListener("click", () => {
      if (taskInput.value.trim() !== "") {
        addTask(taskInput.value);
        taskInput.value = "";
        saveTasks();
      }
    });

    // Add task with Enter key
    taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && taskInput.value.trim() !== "") {
        addTask(taskInput.value);
        taskInput.value = "";
        saveTasks();
      }
    });

    function addTask(taskText, completed = false) {
      const li = document.createElement("li");
      if (completed) li.classList.add("completed");

      li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="actions">
          <button class="done">✔</button>
          <button class="delete">✖</button>
        </div>
      `;

      // Complete Task
      li.querySelector(".done").addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
      });

      // Delete Task
      li.querySelector(".delete").addEventListener("click", () => {
        li.remove();
        saveTasks();
      });

      taskList.appendChild(li);
    }

    function saveTasks() {
      const tasks = []; 
      document.querySelectorAll("#taskList li").forEach((li) => {
        tasks.push({
          text: li.querySelector(".task-text").textContent,
          completed: li.classList.contains("completed"),
        });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach((task) => addTask(task.text, task.completed));
    }
