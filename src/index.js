import "./style.css";
import { addProject, displayProjects, myProjects, completedTasks } from "./project.js";

//setup nav bar
function createNavBar(body) {
    const navBar = document.createElement("nav");
    navBar.id = "nav";
    const projectTitle = document.createElement("h1");
    navBar.appendChild(projectTitle);
    body.appendChild(navBar);

    const newTaskBtn = document.createElement("button");
    newTaskBtn.textContent = "New Task";
    newTaskBtn.id = "newtaskbtn";
    const newProjectBtn = document.createElement("button");
    newProjectBtn.textContent = "New Project";
    newProjectBtn.id = "projectbtn";

    navBar.appendChild(newProjectBtn);
    navBar.appendChild(newTaskBtn);
}

//setup side panel
function createSidePanel(body) {
    const sidePanel = document.createElement("div");
    sidePanel.id = "side-panel";

    const completedBtn = document.createElement("button");
    completedBtn.textContent = "Completed";
    completedBtn.id = "completedbtn";
    sidePanel.appendChild(completedBtn);

    const sidePanelTitle = document.createElement("h2");
    sidePanelTitle.textContent = "Projects";
    sidePanel.appendChild(sidePanelTitle);

    const projects = document.createElement("div");
    projects.id = "projects";

    sidePanel.appendChild(projects);
    body.appendChild(sidePanel);
}

//setup todo list container
function createTodoListContainer(body) {
    const todoList = document.createElement("div");
    todoList.id = "todo";
    body.appendChild(todoList);
}


function createPage() {
    const body = document.querySelector("body");
    createNavBar(body);
    createSidePanel(body);
    createTodoListContainer(body);
}

function setupEventListeners() {
    //Completed tasks section
    const completedBtn = document.querySelector("#completedbtn");
    const projectTitle = document.querySelector("#nav h1");
    completedBtn.addEventListener("click", () => {

        if (completedTasks.length === 0) {
            projectTitle.textContent = "Completed Tasks";
            return;
        }

        const todoList = document.querySelector("#todo");
        todoList.innerHTML = "";
        for (let i = 0; i < completedTasks.length; i++) {
            const task = document.createElement("div");
            task.className = "items";
            task.dataset.id = i;
            projectTitle.textContent = "Completed Tasks";

            const taskTitle = document.createElement("div");
            taskTitle.className = "title";
            taskTitle.textContent = `Title: ${completedTasks[i].title}`;
            task.appendChild(taskTitle);

            const taskDescription = document.createElement("div");
            taskDescription.className = "description";
            taskDescription.textContent = `Description: ${completedTasks[i].description}`;
            task.appendChild(taskDescription);

            const taskDueDate = document.createElement("div");
            taskDueDate.className = "duedate";
            taskDueDate.textContent = `Due Date: ${completedTasks[i].dueDate}`;
            task.appendChild(taskDueDate);

            todoList.appendChild(task);
        }
    });


    // new project creation
    const projectModla = document.querySelector("#newproject");
    const projectConfirmBtn = document.querySelector("#projectConfirmBtn");
    const newProjectName = document.querySelector("#projectname");


    const createNewProject = document.querySelector("#projectbtn");
    createNewProject.addEventListener("click", () => {
        projectModla.showModal();
    });

    projectConfirmBtn.addEventListener("click", (event) => {
        if (newProjectName.value == "") {
            return;
        }

        else {
            addProject(newProjectName.value);
            event.preventDefault();
            displayProjects();
            projectModla.close();
        }
    });

    // new task creation
    const dialogBox = document.querySelector("#task");
    const confirmBtn = document.querySelector("#confirmBtn");
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const duedate = document.querySelector("#duedate");
    const priority = document.querySelector("#priority");

    const projectsContainer = document.querySelector("#projects");
    let currentID = null;

    const createNewTask = document.querySelector("#newtaskbtn");
    createNewTask.addEventListener("click", () => {
        dialogBox.showModal();
    });

    //checking if project exists and task title is not empty before adding task to project
    confirmBtn.addEventListener("click", (event) => {
        const projectTitle = document.querySelector("#nav h1");
        if (myProjects.length === 0) {
            alert("Please create a project first!");
            dialogBox.close();
            return;
        }
        else if (title.value == "") {
            return;
        }
        else if (currentID === null) {
            alert("Please select a project first!");
            dialogBox.close();
            return;
        }
        else if (projectTitle.textContent === "Completed Tasks") {
            alert("Please select a project to add a task!");
            return;
        }
        else {
            myProjects[currentID].addTask(title.value, description.value, duedate.value, priority.value);
            event.preventDefault();
            myProjects[currentID].displayTasks();
            dialogBox.close();
        }
    });

    //add new task to project
    projectsContainer.addEventListener("click", (e) => {
        currentID = e.target.dataset.id;
        projectTitle.textContent = myProjects[e.target.dataset.id].name;
        myProjects[e.target.dataset.id].displayTasks();
    });

}

//initialize app
function initializeApp() {
    createPage();
    setupEventListeners();
}

initializeApp();