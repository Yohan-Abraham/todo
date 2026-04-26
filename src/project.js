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

    eventListener(completeBtn, i) {
        completeBtn.addEventListener("click", () => {
            completedTasks.push(this.arr.tasks[i]);
            this.arr.tasks.splice(i, 1);
            this.displayTasks();
        });
    }

    //updates task values
    updateTaskValues(i, title, description, duedate, priority) {
        this.arr.tasks[i].title = title;
        this.arr.tasks[i].description = description;
        this.arr.tasks[i].dueDate = duedate;
        this.arr.tasks[i].priority = priority;
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
                console.log(this.arr.tasks[i]);
                this.updateTaskValues(i, title.value, description.value, duedate.value, priority.value);
                console.log(this.arr.tasks[i].title);
                this.displayTasks();
                newTask.close();
            };
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

            const editTask = document.createElement("button");
            editTask.className = "editTask";
            editTask.textContent = `Edit Task`;
            task.appendChild(editTask);
            this.editTaskListener(editTask, i);


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