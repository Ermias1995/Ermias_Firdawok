const projects = document.querySelector('.project-container');
const dots = document.querySelectorAll('.dot');

function scrollToProject(index) {
    const project = projects.children[index];
    if (project) {
        project.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        updateActiveDot(index);
        hideInactiveProjects(index);
    }
}

function updateActiveDot(activeIndex) {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}

function hideInactiveProjects(activeIndex) {
    Array.from(projects.children).forEach((project, index) => {
        if (index !== activeIndex) {
            project.classList.add('hidden'); // Add hidden class to inactive projects
        } else {
            project.classList.remove('hidden'); // Remove hidden class from active project
        }
    });
}

// Add event listeners to dots
dots.forEach((dot) => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        scrollToProject(index);
    });
});

// Initialize the first dot as active and show the first project
updateActiveDot(0);
hideInactiveProjects(0);