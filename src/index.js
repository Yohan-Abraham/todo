import "./style.css";

function createPage() {
    const body = document.querySelector("body");

    const navBar = document.createElement("nav");
    navBar.id = "nav";
    const title = document.createElement("h1");
    title.textContent = "All Tasks";
    navBar.appendChild(title);
    body.appendChild(navBar);


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

    newProjectBtn.addEventListener("click", () => {

    });


    const todoList = document.createElement("div");
    todoList.id = "todo";
    body.appendChild(todoList);

}

createPage();