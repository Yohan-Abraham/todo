const myTasks = [];

class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
};

function addTask(title, description, dueDate, priority) {
    console.log(title);
    const task = new Task(title, description, dueDate, priority);
    myTasks.push(task);
}

function displayTasks() {
    const todoList = document.querySelector("#todo");
    todoList.innerHTML = "";

    for (let i = 0; i < myTasks.length; i++) {
        const taskContainer = document.createElement("div");
        taskContainer.className = "items";
        taskContainer.dataset.id = i;

        const title = document.createElement("div");
        title.className = "title";
        title.textContent = `Title: ${myTasks[i].title}`;
        taskContainer.appendChild(title);

        const description = document.createElement("div");
        description.className = "description";
        description.textContent = `Description: ${myTasks[i].description}`;
        taskContainer.appendChild(description);

        const dueDate = document.createElement("div");
        dueDate.className = "duedate";
        dueDate.textContent = `Due Date: ${myTasks[i].dueDate}`;
        taskContainer.appendChild(dueDate);

        const priority = document.createElement("div");
        priority.className = "priority";
        priority.textContent = `Priority: ${myTasks[i].priority}`;
        taskContainer.appendChild(priority);

        const todoList = document.querySelector("#todo");
        todoList.appendChild(taskContainer);
    }
}

export { addTask, displayTasks };