import { Task, TaskList } from "./list.js";

const myProjects = [];
const completedTasks = [];

class Project {
    constructor(name) {
        this.name = name;
        this.arr = new TaskList();
    }

    addTask(title, description, dueDate, priority) {
        const task = new Task(title, description, dueDate, priority);
        this.arr.tasks.push(task);
    }

    displayTasks() {
        const todoList = document.querySelector("#todo");
        todoList.innerHTML = "";
        for (let i = 0; i < this.arr.tasks.length; i++) {
            const task = document.createElement("div");
            task.className = "items";
            task.dataset.id = i;
            if ((this.arr.tasks[i].priority).toLowerCase() === "high") {
                task.style.borderLeftColor = "red";
                task.style.borderLeftWidth = "5px";
            }
            else if ((this.arr.tasks[i].priority).toLowerCase() === "medium") {
                task.style.borderLeftColor = "yellow";
                task.style.borderLeftWidth = "5px";
            }
            else if ((this.arr.tasks[i].priority).toLowerCase() === "low") {
                task.style.borderLeftColor = "green";
                task.style.borderLeftWidth = "5px";
            }

            const completeBtn = document.createElement("button");
            completeBtn.className = "complete";

            completeBtn.addEventListener("click", () => {
                completedTasks.push(this.arr.tasks[i]);
                this.arr.tasks.splice(i, 1);
                this.displayTasks();
            });

            task.appendChild(completeBtn);

            const taskTitle = document.createElement("div");
            taskTitle.className = "title";
            taskTitle.textContent = `Title: ${this.arr.tasks[i].title}`;
            task.appendChild(taskTitle);

            const taskDescription = document.createElement("div");
            taskDescription.className = "description";
            taskDescription.textContent = `Description: ${this.arr.tasks[i].description}`;
            task.appendChild(taskDescription);

            const taskDueDate = document.createElement("div");
            taskDueDate.className = "duedate";
            taskDueDate.textContent = `Due Date: ${this.arr.tasks[i].dueDate}`;
            task.appendChild(taskDueDate);

            todoList.appendChild(task);


        }
    }
}


function addProject(name) {
    const project = new Project(name);
    myProjects.push(project);
}

function displayProjects() {
    const projectContainer = document.querySelector("#projects");
    projectContainer.innerHTML = "";
    for (let i = 0; i < myProjects.length; i++) {
        const project = document.createElement("button");
        project.dataset.id = i;
        project.className = "project";
        project.textContent = myProjects[i].name;
        projectContainer.appendChild(project);
    }
}

export { addProject, displayProjects, myProjects, completedTasks };