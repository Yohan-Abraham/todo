import { Task, TaskList } from "./list.js";

const myProjects = [];

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
            task.textContent = this.arr.tasks[i].title;
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

export { addProject, displayProjects, myProjects };