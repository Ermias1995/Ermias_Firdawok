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

function setMenuOpen(isOpen) {
    hamburger.classList.toggle('active', isOpen);
    navMenu.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
}

hamburger.addEventListener('click', () => {
    try {
        setMenuOpen(!navMenu.classList.contains('active'));
    } catch (error) {
        console.warn('Failed to toggle mobile menu:', error);
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        try {
            setMenuOpen(false);
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

// Project Navigation - one dot per .project card, so new projects stay in sync
const projects = document.querySelectorAll('.project');
const navDotsContainer = document.querySelector('.project-navigation');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentProjectIndex = 0;
let navDots = [];

function buildNavDots() {
    if (!navDotsContainer) return;

    navDotsContainer.replaceChildren();
    projects.forEach((project, index) => {
        const title = project.querySelector('h3')?.textContent?.trim() || `Project ${index + 1}`;
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'nav-dot';
        dot.setAttribute('role', 'tab');
        dot.dataset.project = project.id || String(index);
        dot.setAttribute('aria-label', `Go to ${title}`);
        dot.setAttribute('aria-selected', 'false');
        dot.addEventListener('click', () => showProject(index));
        navDotsContainer.appendChild(dot);
    });
    navDots = navDotsContainer.querySelectorAll('.nav-dot');
}

function showProject(index) {
    if (!projects.length) return;

    const safeIndex = Math.max(0, Math.min(index, projects.length - 1));

    projects.forEach((project, i) => {
        const isActive = i === safeIndex;
        project.classList.toggle('is-active', isActive);
        project.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });

    navDots.forEach((dot, i) => {
        const isActive = i === safeIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    currentProjectIndex = safeIndex;
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

buildNavDots();
showProject(0);

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

// Dynamic greeting text functionality - continuous alternation
let greetingInterval;
let isAmharic = true;

function changeGreeting() {
    try {
        const greetingWord = document.getElementById('greeting-word');
        if (!greetingWord) return;

        greetingWord.textContent = isAmharic ? 'Hi' : 'ሰላም';
        isAmharic = !isAmharic;
    } catch (error) {
        console.warn('Failed to change greeting:', error);
    }
}

function startGreetingAlternation() {
    try {
        const greetingWord = document.getElementById('greeting-word');
        if (!greetingWord) return;

        isAmharic = true;
        greetingWord.textContent = 'ሰላም';
        greetingInterval = setInterval(changeGreeting, 3000);
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
            setTimeout(startGreetingAlternation, 2000);
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

