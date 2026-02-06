const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const remainingCount = document.getElementById("remainingCount");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
    let text = taskInput.value.trim();
    if (text === "") return;

    let priority = prioritySelect.value;

    let li = document.createElement("li");
    li.className = `task ${priority}`;

    li.innerHTML = `
        <input type="checkbox" class="taskCheck">
        <span>${text}</span>
        <button class="deleteBtn">❌</button>
    `;

    taskList.appendChild(li);
    taskInput.value = "";

    updateCounts();
}

taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteBtn")) {
        e.target.parentElement.remove();
    }

    if (e.target.classList.contains("taskCheck")) {
        e.target.parentElement.classList.toggle("completed");
    }

    updateCounts();
});


document.getElementById("searchInput").addEventListener("input", function () {
    let value = this.value.toLowerCase();
    document.querySelectorAll(".task").forEach(task => {
        task.style.display =
            task.innerText.toLowerCase().includes(value) ? "flex" : "none";
    });
});

document.getElementById("filterSelect").addEventListener("change", function () {
    let filter = this.value;

    document.querySelectorAll(".task").forEach(task => {
        if (filter === "completed") {
            task.style.display = task.classList.contains("completed") ? "flex" : "none";
        } else if (filter === "all") {
            task.style.display = "flex";
        } else {
            task.style.display = task.classList.contains(filter) ? "flex" : "none";
        }
    });
});


function updateCounts() {
    let tasks = document.querySelectorAll(".task");
    let completed = document.querySelectorAll(".task.completed");

    totalCount.textContent = tasks.length;
    completedCount.textContent = completed.length;
    remainingCount.textContent = tasks.length - completed.length;
}

document.getElementById("themeToggle").onclick = () =>
    document.body.classList.toggle("dark");


setInterval(() => {
    document.getElementById("clock").innerText =
        new Date().toLocaleTimeString();
}, 1000);

const scrollBtn = document.getElementById("scrollTopBtn");

window.onscroll = () => {
    scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
};

scrollBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};
