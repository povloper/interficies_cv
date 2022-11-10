const components = [
    { id: "nav", file: "nav.html" },
    { id: "header", file: "header.html" },
    { id: "experience", file: "experience.html" },
    { id: "studies", file: "studies.html" },
    { id: "projects", file: "projects.html" },
    { id: "footer", file: "footer.html" },
]

var experience;
var projects;
var studies;

document.addEventListener("DOMContentLoaded", function() { 
   loadComponents();
   getData();
})

/**
 * It loops through the components array and adds each component to the DOM.
 */
function loadComponents() {
    components.forEach(component => {
        addComponent(component.id, "./pages/" + component.file);
    });
}

/**
 * The function takes an id and a file, fetches the file, and then inserts the file's contents into the
 * element with the given id.
 * @param id - The id of the element you want to add the component to.
 * @param file - The file to be loaded.
 */
async function addComponent(id, file) {
    const resp = await fetch(file);
    const html = await resp.text();
    document.getElementById(id).innerHTML = html;
}

/**
 * It calls the functions getExperienceData(), getProjectseData() and getStudiesData()
 */
function getData() {
    getExperienceData();
    getProjectseData();
    getStudiesData();
}

/**
 * It opens a new tab with the url you pass to it
 * @param url - The URL to open in a new window.
 */
function goTo(url) {
    window.open(url, '_blank');
}

/**
 * It fetches the JSON file, then it parses the JSON file, then it assigns the parsed JSON file to the
 * variable experience, then it calls the function printExperience().
 */
async function getExperienceData() {
    await  fetch('./data/experience.json')
        .then(response => response.json())
        .then(data => experience = data)
        .catch(error => console.log(error));
    printExperience();
}

/**
 * It takes the data from the experience array and prints it to the page.
 */
function printExperience() {
    let experience_container = document.getElementById("experience-container");
    let message = '<div id="experience-container">';
    experience_container.innerHTML = '';
    experience.forEach(e => {
        message += `
            <div class="experience-item">
                <span class="experience-company">${e.company}</span>
                <span class="experience-title">${e.title}</span>
                <span class="experience-time">${e.from} - ${e.to}</span>
                <span class="experience-site">${e.site}</span>
            </div>
        `
    })
    
    experience_container.innerHTML += message + '</div>';
}

/**
 * It fetches the data from the projects.json file, then it sets the projects variable to the data,
 * then it prints the projects.
 */
async function getProjectseData() {
    await  fetch('./data/projects.json')
        .then(response => response.json())
        .then(data => projects = data)
        .catch(error => console.log(error));
    printProjects();
}

/**
 * It takes the projects array and creates a div for each project, then adds the divs to the
 * projects-container div.
 */
function printProjects() {
    let projects_container = document.getElementById("projects-container");
    let message = '<div id="projects-container">';
    projects_container.innerHTML = '';
    projects.forEach(p => {
        message += `
            <div class="projects-item" onclick="goTo('${p.url}')">
                <div class="projects-item-image" style="background-image: url('./img/${p.src}');"></div>
                <div class="projects-info">
                    <span class="projects-title">${p.title}</span>
                    <span class="projects-description">${p.description}</span>
                </div>
            </div>`;
    })
    
    projects_container.innerHTML += message + '</div>';
}

/**
 * It fetches the data from the studies.json file, then it sets the studies variable to the data, then
 * it prints the studies.
 */
async function getStudiesData() {
    await  fetch('./data/studies.json')
        .then(response => response.json())
        .then(data => studies = data)
        .catch(error => console.log(error));
    printStudies()
}

/**
 * It takes the data from the studies array and prints it to the page.
 */
function printStudies() {
    let studies_container = document.getElementById("studies-container");
    let message = '<div id="studies-container">';
    studies_container.innerHTML = '';
    studies.forEach(s => {
        message += `
            <div class="studies-item">
                <span class="studies-company">${s.center}</span>
                <span class="studies-title">${s.study}</span>
                <span class="studies-time">${s.from} - ${s.to}</span>
                <span class="studies-site">${s.site}</span>
            </div>
        `
    })
    
    studies_container.innerHTML += message + '</div>';
}
