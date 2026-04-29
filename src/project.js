import { Task, TaskList } from "./list.js";

const myProjects = [];
const completedTasks = [];

//Tasks inside project
class Project {
    constructor(name) {
        this.name = name;
        this.arr = new TaskList();
    }

    addTask(title, description, dueDate, priority) {
        const task = new Task(title, description, dueDate, priority);
        this.arr.tasks.push(task);
        localStorage.setItem("projects", JSON.stringify(myProjects));
    }

    displayTasks() {
        const todoList = document.querySelector("#todo");
        todoList.innerHTML = "";
        this.appendTasks(todoList);
    }

    priorityLevel(task, i) {
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
    }

    updateLocalStorage() {
        localStorage.removeItem("projects");
        localStorage.setItem("projects", JSON.stringify(myProjects));
    }

    eventListener(completeBtn, i) {
        completeBtn.addEventListener("click", () => {
            completedTasks.push(this.arr.tasks[i]);
            this.arr.tasks.splice(i, 1);
            this.displayTasks();
            this.updateLocalStorage();
            localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
        });
    }

    //updates task values
    updateTaskValues(i, title, description, duedate, priority) {
        this.arr.tasks[i].title = title;
        this.arr.tasks[i].description = description;
        this.arr.tasks[i].dueDate = duedate;
        this.arr.tasks[i].priority = priority;
        this.updateLocalStorage();
    }

    editTaskListener(editTask, i) {
        const newTask = document.querySelector("#newTask");
        editTask.addEventListener("click", () => {
            //form values
            const title = document.querySelector("#newTitle");
            const description = document.querySelector("#newDescription");
            const duedate = document.querySelector("#newDuedate");
            const priority = document.querySelector("#newPriority");
            newTask.showModal();

            //updating task values using form
            const confirmEditBtn = document.querySelector("#confirmEdit");
            confirmEditBtn.onclick = (event) => {
                event.preventDefault();
                this.updateTaskValues(i, title.value, description.value, duedate.value, priority.value);
                this.displayTasks();
                newTask.close();
            };
        });

    }

    removeTaskListener(removeTask, i) {
        removeTask.addEventListener("click", (event) => {
            event.preventDefault();
            this.arr.tasks.splice(i, 1);
            this.displayTasks();
            this.updateLocalStorage();
        });
    }

    expandTaskListener(expandTask, i) {
        expandTask.addEventListener("click", () => {
            const taskCanvas = document.createElement("div");
            taskCanvas.className = "taskCanvas";
            const body = document.querySelector("body");
            body.appendChild(taskCanvas);

            const closeView = document.createElement("button");
            closeView.className = "closeBtn";
            closeView.textContent = "X";
            taskCanvas.appendChild(closeView);
            closeView.addEventListener("click", () => {
                body.removeChild(taskCanvas);
            });

            const taskTitle = document.createElement("div");
            taskTitle.className = "expandTitle";
            taskTitle.textContent = `Title: ${this.arr.tasks[i].title}`;
            taskCanvas.appendChild(taskTitle);

            const taskDescription = document.createElement("div");
            taskDescription.className = "expandDescription";
            taskDescription.textContent = `Description: ${this.arr.tasks[i].description}`;
            taskCanvas.appendChild(taskDescription);

            const taskDueDate = document.createElement("div");
            taskDueDate.className = "expandDueDate";
            taskDueDate.textContent = `Due: ${this.arr.tasks[i].dueDate}`;
            taskCanvas.appendChild(taskDueDate);

            const editTask = document.createElement("button");
            editTask.className = "expandEdit";
            editTask.textContent = `Edit Task`;
            taskCanvas.appendChild(editTask);
            this.editTaskListener(editTask, i);

            const removeTask = document.createElement("button");
            removeTask.className = "expandRemove";
            removeTask.textContent = `Remove Task`;
            taskCanvas.appendChild(removeTask);
            this.removeTaskListener(removeTask, i);

        });
    }

    appendTasks(todoList) {
        for (let i = 0; i < this.arr.tasks.length; i++) {
            const task = document.createElement("div");
            task.className = "items";
            task.dataset.id = i;
            this.priorityLevel(task, i);

            const completeBtn = document.createElement("button");
            completeBtn.className = "complete";
            this.eventListener(completeBtn, i);
            task.appendChild(completeBtn);

            const taskTitle = document.createElement("div");
            taskTitle.className = "title";
            taskTitle.textContent = `${this.arr.tasks[i].title}`;
            task.appendChild(taskTitle);

            const taskDescription = document.createElement("div");
            taskDescription.className = "description";
            taskDescription.textContent = `Description: ${this.arr.tasks[i].description}`;


            const taskDueDate = document.createElement("div");
            taskDueDate.className = "duedate";
            taskDueDate.textContent = `Due: ${this.arr.tasks[i].dueDate}`;
            task.appendChild(taskDueDate);

            const editTask = document.createElement("button");
            editTask.className = "editTask";
            editTask.textContent = `Edit Task`;
            task.appendChild(editTask);
            this.editTaskListener(editTask, i);

            const removeTask = document.createElement("button");
            removeTask.className = "removeTask";
            removeTask.textContent = `Remove Task`;
            task.appendChild(removeTask);
            this.removeTaskListener(removeTask, i);

            const expandTask = document.createElement("button");
            expandTask.className = "expandTask";
            expandTask.textContent = ">";
            task.appendChild(expandTask);
            this.expandTaskListener(expandTask, i);

            todoList.appendChild(task);
        }
    }
}


function addProject(name) {
    const project = new Project(name);
    myProjects.push(project);
    localStorage.setItem("projects", JSON.stringify(myProjects));
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

function loadLocalStorage() {
    const projects = JSON.parse(localStorage.getItem("projects"));
    for (let i = 0; i < projects.length; i++) {
        addProject(projects[i].name);
        for (let j = 0; j < projects[i].arr.tasks.length; j++) {
            const task = new Task(projects[i].arr.tasks[j].title, projects[i].arr.tasks[j].description, projects[i].arr.tasks[j].dueDate, projects[i].arr.tasks[j].priority);
            myProjects[i].arr.tasks.push(task);
        }
    }

    if (JSON.parse(localStorage.getItem("completedTasks")) != null) {
        const completed = JSON.parse(localStorage.getItem("completedTasks"));
        for (let i = 0; i < completed.length; i++) {
            const task = new Task(completed[i].title, completed[i].description, completed[i].dueDate, completed[i].priority);
            completedTasks.push(task);
        }
    }
}

export { addProject, displayProjects, myProjects, completedTasks, loadLocalStorage };