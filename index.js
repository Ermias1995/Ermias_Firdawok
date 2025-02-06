const projects = document.querySelector('.project-container');
const dots = document.querySelectorAll('.dot');

function scrollToProject(index) {
    const project = projects.children[index];
    if (project) {
        project.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        updateActiveDot(index);
    }
}

function updateActiveDot(activeIndex) {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}


// Add event listeners to dots
dots.forEach((dot) => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        scrollToProject(index);
    });
});

let activeDot = null;

function changeColor(dot) {
    if (activeDot) {
        activeDot.classList.remove('active'); // Remove active class from previously active dot
    }
    activeDot = dot; // Set the new active dot
    dot.classList.add('active'); // Add active class to the clicked dot
}

// Initialize the first dot as active and show the first project
updateActiveDot(0);
