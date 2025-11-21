const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const remainingCount = document.getElementById("remainingCount");
// ADD TASK
addTaskBtn.addEventListener("click", addTask);
function addTask() {
    let text = taskInput.value.trim();
    let priority = prioritySelect.value;
    if (text === "") return;
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
// DELETE & COMPLETE FUNCTIONALITY
taskList.addEventListener("click", function(e) {
    if (e.target.classList.contains("deleteBtn")) {
        e.target.parentElement.remove();
        updateCounts();
    }
    if (e.target.classList.contains("taskCheck")) {
        e.target.parentElement.classList.toggle("completed");
        updateCounts();
    }
});
// SEARCH
document.getElementById("searchInput").addEventListener("input", function() {
    let value = this.value.toLowerCase();
    document.querySelectorAll(".task").forEach(task => {
        task.style.display = task.innerText.toLowerCase().includes(value)
            ? "flex"
            : "none";
    });
});
// FILTER
document.getElementById("filterSelect").addEventListener("change", function() {
    let filter = this.value;
    document.querySelectorAll(".task").forEach(task => {
        if (filter === "completed") {
            task.style.display = task.classList.contains("completed") ? "flex" : "none";
        } else if (filter === "all" || task.classList.contains(filter)) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
});
// UPDATE COUNTERS
function updateCounts() {
    let tasks = document.querySelectorAll(".task");
    let completed = document.querySelectorAll(".task.completed");
    totalCount.textContent = tasks.length;
    completedCount.textContent = completed.length;
    remainingCount.textContent = tasks.length - completed.length;
}
// DARK MODE
document.getElementById("themeToggle").onclick = () =>
    document.body.classList.toggle("dark");
// CLOCK
setInterval(() => {
    document.getElementById("clock").innerText = new Date().toLocaleTimeString();
}, 1000);
// SCROLL TO TOP
const scrollBtn = document.getElementById("scrollTopBtn");
window.onscroll = () => {
    scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
};
scrollBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};