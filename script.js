// --- Role Changing Effect (Typewriter) ---

const roles = [
    "AI/ML Enthusiast ", 
    "Python Developer "
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const roleTextElement = document.getElementById('role-text');

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (!roleTextElement) return;

    // Current word-oda part-sa roleTextElement-la set pandrom
    // NOTE: HTML-la "Mohamed Hasan Faris, " ku appuram thaan <span id="role-text"> varanum.
    roleTextElement.textContent = currentRole.substring(0, charIndex);

    // Typing and Deleting logic
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    if (!isDeleting && charIndex > currentRole.length) {
        // Full word type aagiduchu, ippo delete panna ready
        isDeleting = true;
        setTimeout(typeRole, 1500); // 1.5 seconds wait
    } else if (isDeleting && charIndex < 0) {
        // Full word delete aagiduchu, next word-kku ready
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length; 
        setTimeout(typeRole, 500); // 0.5 seconds wait
    } else {
        // Typing or Deleting speed
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeRole, speed);
    }
}


// --- Navigation Active State on Scroll ---
const sections = document.querySelectorAll('section[id], main[id="home"]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    let current = 'home';
    
    sections.forEach(section => {
        // Adjust the offset for fixed header
        const sectionTop = section.offsetTop - 150; 
        
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id').toLowerCase();
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').toLowerCase() === `#${current}`) {
            link.classList.add('active');
        }
    });
}
window.addEventListener('scroll', updateActiveNav);


// --- Theme Toggle (Dark/Light) ---

function toggleTheme() {
    const body = document.body;
    const toggleIcon = document.getElementById('theme-toggle');

    body.classList.toggle('light-theme');

    if (body.classList.contains('light-theme')) {
        toggleIcon.classList.remove('fa-sun');
        toggleIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        toggleIcon.classList.remove('fa-moon');
        toggleIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const toggleIcon = document.getElementById('theme-toggle');

    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        // Icon update only if the icon element exists
        if(toggleIcon) {
            toggleIcon.classList.remove('fa-sun');
            toggleIcon.classList.add('fa-moon');
        }
    } else {
        // Default is dark mode
        if(toggleIcon) {
            toggleIcon.classList.remove('fa-moon');
            toggleIcon.classList.add('fa-sun');
        }
    }
}


// --- Resume Modal Functions ---

function openResumeModal() {
    const modal = document.getElementById("resumeModal");
    modal.style.display = "block"; 
    document.body.style.overflow = "hidden"; 
}

function closeResumeModal() {
    const modal = document.getElementById("resumeModal");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById("resumeModal");
    if (event.target == modal) {
        closeResumeModal();
    }
}


// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    // Theme load must be first to avoid initial flash of wrong theme
    loadTheme(); 
    typeRole();
    // Initial check for navigation active state
    updateActiveNav();
});
// ** Contact Form Handling - FORMPSREE INTEGRATION (AJAX) **

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    const formStatus = document.getElementById('form-status'); 

    if (contactForm && formStatus) {
        
        contactForm.addEventListener('submit', async function(event) {
            
            // 🛑 Stop the default form submission (Ithu Fetch API use panna mukkiyam)
            event.preventDefault(); 
            
            // Message-a clear panni, Loading/Sending message-a kaamikkanum
            formStatus.textContent = 'Sending... Please wait.';
            formStatus.style.display = 'block';
            
            // Get form data
            const formData = new FormData(contactForm);
            
            try {
                // Send data to Formspree endpoint (the URL in the HTML action attribute)
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = '✅ Your message has been sent successfully!';
                    formStatus.style.color = '#FF0000'; // Primary color (red)
                    // You can check if the body has light-theme class to change color
                    if (document.body.classList.contains('light-theme')) {
                        formStatus.style.color = 'green';
                    }
                    contactForm.reset(); 
                } else {
                    // Formspree error handling (e.g., rate limit)
                    formStatus.textContent = '❌ Submission failed. Formspree server error.';
                    formStatus.style.color = 'red';
                }
            } catch (error) {
                // Network error (e.g., no internet)
                formStatus.textContent = '❌ Network error. Please check your connection and try again.';
                formStatus.style.color = 'red';
            }
            
            // Message-a 5 seconds-kku apparam marakka
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000); 
        });
    }
});

//footer
document.addEventListener('DOMContentLoaded', () => {
    // ... existing JS code for theme toggle and form ...
    
    // Auto update the Copyright Year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});