// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Typing effect
const typingText = document.querySelector('.typing-text');
const phrases = ["I'm a Professional Developer", "I'm a Web Designer", "I'm a Problem Solver"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

// Start typing effect
setTimeout(type, 1000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitBtn = this.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Simulate form submission (replace with actual API endpoint)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
        submitBtn.style.background = 'var(--primary-color)';
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
        
    } catch (error) {
        // Show error message
        submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed to Send';
        submitBtn.style.background = 'var(--accent-color)';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }
});

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // Animate skill tags
    const skillTags = document.querySelectorAll('.skill-tags span');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('fade-in');
    });
});

// Project data
const projectData = {
    categories: ['all', 'web', 'mobile', 'blockchain'],
    projects: [
        {
            title: "Blockchain E-Voting System",
            description: "Secure and transparent voting system built with blockchain technology.",
            image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
            category: "blockchain",
            tech: ["React", "Solidity", "Web3.js"],
            github: "https://github.com/yourusername/blockchain-voting",
            demo: "https://blockchain-voting-demo.com"
        },
        {
            title: "MedConnect App",
            description: "Healthcare platform connecting patients with medical professionals.",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
            category: "mobile",
            tech: ["Flutter", "Firebase", "Node.js"],
            github: "https://github.com/yourusername/medconnect",
            demo: "https://medconnect-demo.com"
        },
        {
            title: "CoFounder Connect",
            description: "Platform for entrepreneurs to find co-founders and team members.",
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
            category: "web",
            tech: ["React", "Node.js", "MongoDB"],
            github: "https://github.com/yourusername/cofounder-connect",
            demo: "https://cofounder-connect-demo.com"
        }
    ]
};

// Initialize projects section
function initializeProjects() {
    renderFilters();
    renderProjects();
    setupFilterHandlers();
}

// Render filter buttons
function renderFilters() {
    const filterContainer = document.getElementById('projectFilters');
    if (!filterContainer) return;

    const filterButtons = projectData.categories.map(category => `
        <button class="filter-btn${category === 'all' ? ' active' : ''}" data-filter="${category}">
            ${category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
    `).join('');

    filterContainer.innerHTML = filterButtons;
}

// Create project card HTML
function createProjectCard(project) {
    return `
        <div class="project-card" data-category="${project.category}" data-aos="fade-up">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" class="project-img">
                <div class="project-overlay">
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-links">
                    <a href="${project.github}" class="btn btn-outline" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-github"></i> Code
                    </a>
                    <a href="${project.demo}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-external-link-alt"></i> Demo
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Render all projects
function renderProjects() {
    const projectGrid = document.getElementById('projectGrid');
    if (!projectGrid) return;

    const projectCards = projectData.projects.map(project => createProjectCard(project)).join('');
    projectGrid.innerHTML = projectCards;

    // Add hover animations after rendering
    setupProjectHoverEffects();
}

// Setup project hover effects
function setupProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const img = card.querySelector('.project-img');
        
        card.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
}

// Setup filter functionality
function setupFilterHandlers() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Filter projects with animation
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize projects section when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProjects);

// Skill progress animation
const skills = document.querySelectorAll('.skill-tags span');
const animateSkills = () => {
    skills.forEach(skill => {
        skill.style.width = skill.dataset.progress;
    });
};

// Intersection Observer for skill animation
const skillsSection = document.querySelector('.skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(skillsSection);

// Add scroll reveal animation
window.addEventListener('scroll', reveal);

function reveal() {
    const reveals = document.querySelectorAll('.project-card, .about-content, .contact-form');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Navbar scroll effect with throttling
let lastScrollPosition = 0;
let ticking = false;

function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    lastScrollPosition = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateNavbar();
            ticking = false;
        });
        ticking = true;
    }
});

// Theme Switching
const lightModeBtn = document.getElementById('lightMode');
const darkModeBtn = document.getElementById('darkMode');
const htmlElement = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeButtons(savedTheme);

// Theme switch event listeners
lightModeBtn.addEventListener('click', () => {
    htmlElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    updateThemeButtons('light');
});

darkModeBtn.addEventListener('click', () => {
    htmlElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    updateThemeButtons('dark');
});

function updateThemeButtons(theme) {
    if (theme === 'light') {
        lightModeBtn.classList.add('active');
        darkModeBtn.classList.remove('active');
    } else {
        darkModeBtn.classList.add('active');
        lightModeBtn.classList.remove('active');
    }
}

// Add gradient text animation
const gradientTexts = document.querySelectorAll('.gradient-text');
gradientTexts.forEach(text => {
    text.addEventListener('mouseover', () => {
        text.style.backgroundSize = '200% 200%';
        text.style.animation = 'gradientShift 2s ease infinite';
    });
    
    text.addEventListener('mouseout', () => {
        text.style.animation = 'none';
    });
});
