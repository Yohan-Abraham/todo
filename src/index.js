import "./style.css";
import { addProject, displayProjects, myProjects } from "./project.js";

function createPage() {
    const body = document.querySelector("body");

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


    const sidePanel = document.createElement("div");
    sidePanel.id = "side-panel";
    const sidePanelTitle = document.createElement("h2");
    sidePanelTitle.textContent = "Projects";
    sidePanel.appendChild(sidePanelTitle);
    const projects = document.createElement("div");
    projects.id = "projects";

    sidePanel.appendChild(projects);
    body.appendChild(sidePanel);

    const projectModla = document.querySelector("#newproject");
    const projectConfirmBtn = document.querySelector("#projectConfirmBtn");
    const newProjectName = document.querySelector("#projectname");


    newProjectBtn.addEventListener("click", () => {
        projectModla.showModal();
    });

    projectConfirmBtn.addEventListener("click", (event) => {
        addProject(newProjectName.value);
        event.preventDefault();
        displayProjects();
        projectModla.close();
    });

    const todoList = document.createElement("div");
    todoList.id = "todo";
    body.appendChild(todoList);

    const dialogBox = document.querySelector("#task");
    const confirmBtn = document.querySelector("#confirmBtn");
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const duedate = document.querySelector("#duedate");
    const priority = document.querySelector("#priority");

    const projectsContainer = document.querySelector("#projects");
    let currentID = 0;

    newTaskBtn.addEventListener("click", () => {
        dialogBox.showModal();
    });


    confirmBtn.addEventListener("click", (event) => {
        if (myProjects.length === 0) {
            alert("Please create a project first!");
            dialogBox.close();
            return;
        }
        myProjects[currentID].addTask(title.value, description.value, duedate.value, priority.value);
        event.preventDefault();
        myProjects[currentID].displayTasks();
        dialogBox.close();
    });



    projectsContainer.addEventListener("click", (e) => {
        currentID = e.target.dataset.id;
        projectTitle.textContent = myProjects[e.target.dataset.id].name;
        myProjects[e.target.dataset.id].displayTasks();
    });

}

createPage();