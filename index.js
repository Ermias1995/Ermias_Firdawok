// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    try {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    
    // Update particles color based on theme
    updateParticlesTheme(newTheme);
    
    // Update navbar background for new theme
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        if (newTheme === 'light') {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }
    } else {
        if (newTheme === 'light') {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    // Add a subtle animation effect for the welcome section
    const welcomeSection = document.getElementById('welcome-section');
    if (welcomeSection) {
        welcomeSection.style.transition = 'background 0.3s ease';
        setTimeout(() => {
            welcomeSection.style.transition = '';
        }, 300);
    }
    
    // Add a subtle animation effect
    document.body.style.transition = 'background-color 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
    } catch (error) {
        console.warn('Failed to toggle theme:', error);
    }
});

// Function to update particles theme
function updateParticlesTheme(theme) {
    if (window.pJSDom && window.pJSDom[0]) {
        const particles = window.pJSDom[0].pJS;
        const particleColor = theme === 'dark' ? '#ffffff' : '#2c3e50';
        const lineColor = theme === 'dark' ? '#ffffff' : '#2c3e50';
        
        // Update particle colors
        if (particles.particles.array) {
            particles.particles.array.forEach(particle => {
                if (particle.color) {
                    particle.color.value = particleColor;
                }
            });
        }
        
        // Update line colors
        if (particles.particles.line_linked) {
            particles.particles.line_linked.color = lineColor;
        }
        
        // Update particle color configuration
        if (particles.particles.color) {
            particles.particles.color.value = particleColor;
        }
        
        // Redraw particles
        if (particles.fn && particles.fn.particlesRefresh) {
            particles.fn.particlesRefresh();
        }
    }
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    try {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    } catch (error) {
        console.warn('Failed to toggle mobile menu:', error);
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        try {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        } catch (error) {
            console.warn('Failed to close mobile menu:', error);
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        try {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } catch (error) {
            console.warn('Failed to scroll to target:', error);
        }
    });
});

// Project Navigation - Horizontal sliding carousel
const projects = document.querySelectorAll('.project');
const navDots = document.querySelectorAll('.nav-dot');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentProjectIndex = 0;

// Show first project by default, hide others
if (projects.length > 0) {
    // Hide all projects first
    projects.forEach((project, index) => {
        if (index !== 0) {
            project.style.display = 'none';
            project.style.opacity = '0';
            project.style.visibility = 'hidden';
        }
    });
    
    // Show first project
    const isMobile = window.innerWidth <= 768;
    projects[0].style.display = isMobile ? 'block' : 'flex';
    projects[0].style.opacity = '1';
    projects[0].style.visibility = 'visible';
    navDots[0].classList.add('active');
    
    // Ensure first project content is visible
    const firstProjectContent = projects[0].querySelector('.project-content');
    const firstProjectDescription = projects[0].querySelector('.project-description');
    const firstProjectHeader = projects[0].querySelector('.project-header');
    const firstProjectTeam = projects[0].querySelector('.project-team');
    const firstProjectTech = projects[0].querySelector('.project-tech');
    const firstProjectTags = projects[0].querySelector('.project-tags');
    const firstProjectLinks = projects[0].querySelector('.project-links');
    
    // Make sure all content is visible
    [firstProjectContent, firstProjectDescription, firstProjectHeader, firstProjectTeam, firstProjectTech, firstProjectTags, firstProjectLinks].forEach(element => {
        if (element) {
            element.style.opacity = '1';
            element.style.visibility = 'visible';
            element.style.display = element === firstProjectContent ? 'flex' : '';
        }
    });
    
    // Update button states
    updateNavigationButtons();
}

// Function to show project
function showProject(index) {
    // Remove active class from all dots
    navDots.forEach(d => d.classList.remove('active'));
    
    // Add active class to clicked dot
    navDots[index].classList.add('active');
    
    // Hide all projects
    projects.forEach(project => {
        project.style.display = 'none';
        project.style.opacity = '0';
        project.style.visibility = 'hidden';
    });
    
    // Show selected project
    if (projects[index]) {
        // Check if mobile view
        const isMobile = window.innerWidth <= 768;
        projects[index].style.display = isMobile ? 'block' : 'flex';
        projects[index].style.opacity = '1';
        projects[index].style.visibility = 'visible';
        
        console.log(`Showing project ${index}:`, projects[index].querySelector('h3')?.textContent);
        
        // Ensure all content elements are visible
        const projectContent = projects[index].querySelector('.project-content');
        const projectDescription = projects[index].querySelector('.project-description');
        const projectHeader = projects[index].querySelector('.project-header');
        const projectTeam = projects[index].querySelector('.project-team');
        const projectTech = projects[index].querySelector('.project-tech');
        const projectTags = projects[index].querySelector('.project-tags');
        const projectLinks = projects[index].querySelector('.project-links');
        
        // Make sure all content is visible
        [projectContent, projectDescription, projectHeader, projectTeam, projectTech, projectTags, projectLinks].forEach(element => {
            if (element) {
                element.style.opacity = '1';
                element.style.visibility = 'visible';
                element.style.display = element === projectContent ? 'flex' : '';
            }
        });
        
        console.log('Project content and description should be visible now');
    }
    
    currentProjectIndex = index;
    updateNavigationButtons();
}

// Function to update navigation button states
function updateNavigationButtons() {
    if (prevBtn && nextBtn) {
        prevBtn.disabled = currentProjectIndex === 0;
        nextBtn.disabled = currentProjectIndex === projects.length - 1;
    }
}

// Navigation button event listeners
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        try {
            if (currentProjectIndex > 0) {
                showProject(currentProjectIndex - 1);
            }
        } catch (error) {
            console.warn('Failed to navigate to previous project:', error);
        }
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        try {
            if (currentProjectIndex < projects.length - 1) {
                showProject(currentProjectIndex + 1);
            }
        } catch (error) {
            console.warn('Failed to navigate to next project:', error);
        }
    });
}

// Project navigation functionality - horizontal sliding
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showProject(index);
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    try {
        const navbar = document.getElementById('navbar');
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (window.scrollY > 100) {
            if (currentTheme === 'light') {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(26, 26, 26, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            }
        } else {
            if (currentTheme === 'light') {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            } else {
                navbar.style.background = 'rgba(26, 26, 26, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    } catch (error) {
        console.warn('Failed to update navbar on scroll:', error);
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        try {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        } catch (error) {
            console.warn('Failed to animate element:', error);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    try {
        const animatedElements = document.querySelectorAll('.interest-card, .education-card, .experience-card, .contact-card');
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    } catch (error) {
        console.warn('Failed to initialize animations:', error);
    }
});

// Typing effect for welcome section
function typeWriter(element, text, speed = 100) {
    try {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    } catch (error) {
        console.warn('Failed to start typing effect:', error);
    }
}

// Dynamic greeting text functionality - continuous alternation
let greetingInterval;
let isAmharic = true; // Start with Amharic

function changeGreeting() {
    try {
        const greetingElement = document.getElementById('welcome-greeting');
        if (greetingElement) {
            const currentText = greetingElement.innerHTML;
            
            if (isAmharic) {
                // Change to English
                greetingElement.innerHTML = currentText.replace('ሰላም', 'Hi');
                isAmharic = false;
            } else {
                // Change back to Amharic
                greetingElement.innerHTML = currentText.replace('Hi', 'ሰላም');
                isAmharic = true;
            }
        }
    } catch (error) {
        console.warn('Failed to change greeting:', error);
    }
}

// Start continuous alternation
function startGreetingAlternation() {
    try {
        const greetingElement = document.getElementById('welcome-greeting');
        if (greetingElement) {
            // Start with Amharic
            isAmharic = true;
            
            // Alternate every 3 seconds
            greetingInterval = setInterval(changeGreeting, 3000);
        }
    } catch (error) {
        console.warn('Failed to start greeting alternation:', error);
    }
}

// Stop alternation (optional - can be used if needed)
function stopGreetingAlternation() {
    if (greetingInterval) {
        clearInterval(greetingInterval);
        greetingInterval = null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        const greetingElement = document.getElementById('welcome-greeting');
        if (greetingElement) {
            // Remove click functionality and cursor pointer
            greetingElement.style.cursor = 'default';
            greetingElement.title = 'Greeting alternates between Amharic and English';
            
            // Start the continuous alternation after a short delay
            setTimeout(startGreetingAlternation, 2000); // Start after 2 seconds
        }
        
        const welcomeTitle = document.querySelector('.welcome-text h1');
        if (welcomeTitle) {
            const originalText = welcomeTitle.textContent;
            typeWriter(welcomeTitle, originalText, 50);
        }
        
        // Initialize particles with current theme
        const currentTheme = html.getAttribute('data-theme');
        setTimeout(() => {
            updateParticlesTheme(currentTheme);
        }, 500); // Wait for particles to load
    } catch (error) {
        console.warn('Failed to initialize page effects:', error);
    }
});

// Add loading animation
window.addEventListener('load', () => {
    try {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    } catch (error) {
        console.warn('Failed to add loading animation:', error);
    }
});

// Handle window resize for responsive project display
window.addEventListener('resize', () => {
    try {
        const isMobile = window.innerWidth <= 768;
        projects.forEach((project, index) => {
            if (project.style.display !== 'none') {
                project.style.display = isMobile ? 'block' : 'flex';
            }
        });
    } catch (error) {
        console.warn('Failed to handle window resize:', error);
    }
});
