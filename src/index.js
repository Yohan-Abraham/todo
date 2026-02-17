import "./style.css";
import { addTask, displayTasks } from "./list.js";

function createPage() {
    const body = document.querySelector("body");

    const navBar = document.createElement("nav");
    navBar.id = "nav";
    const projectTitle = document.createElement("h1");
    projectTitle.textContent = "All Tasks";
    navBar.appendChild(projectTitle);
    body.appendChild(navBar);

    const newTaskBtn = document.createElement("button");
    newTaskBtn.textContent = "New Task";
    newTaskBtn.id = "newtaskbtn";
    navBar.appendChild(newTaskBtn);


    const sidePanel = document.createElement("div");
    sidePanel.id = "side-panel";
    const projects = document.createElement("div");
    projects.textContent = "Projects";
    projects.id = "projects";
    sidePanel.appendChild(projects);
    body.appendChild(sidePanel);

    const newProjectBtn = document.createElement("button");
    newProjectBtn.textContent = "New Project";
    newProjectBtn.id = "projectbtn";
    sidePanel.appendChild(newProjectBtn);

    const todoList = document.createElement("div");
    todoList.id = "todo";
    body.appendChild(todoList);

    const dialogBox = document.querySelector("#dialog");
    const confirmBtn = document.querySelector("#confirmBtn");
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const duedate = document.querySelector("#duedate");
    const priority = document.querySelector("#priority");

    newTaskBtn.addEventListener("click", () => {
        dialogBox.showModal();
    });

    confirmBtn.addEventListener("click", (event) => {

        addTask(title.value, description.value, duedate.value, priority.value);
        event.preventDefault();
        displayTasks();
        dialogBox.close();
    });



}

createPage();