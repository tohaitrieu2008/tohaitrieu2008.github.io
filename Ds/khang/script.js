// ==================== GLOBAL VARIABLES ====================
const header = document.getElementById('header');
const nav = document.getElementById('nav');
const mobileToggle = document.getElementById('mobileToggle');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const navLinks = document.querySelectorAll('.nav-link');


// ==================== THEME TOGGLE ====================
// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

// Update theme toggle icon
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ==================== Mobile menu toggle ====================
mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Đóng menu trên thiết bị di động khi nhấp vào liên kết.
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// Đóng menu di động khi nhấp chuột ra ngoài.
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
        nav.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
});

// ====================header croll effect====================
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Back to top button
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// ==================== ACTIVE NAVIGATION LINK ====================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('.section, .hero');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== BACK TO TOP BUTTON ====================
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);


const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(el => observer.observe(el));

// ==================== BUTTON RIPPLE EFFECT ====================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Get button position
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create ripple element
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== FORM VALIDATION ====================
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    // Reset error messages
    clearErrors();
    
    // Validation flags
    let isValid = true;
    
    // Validate name
    if (name.value.trim() === '') {
        showError(name, 'Vui lòng nhập họ tên');
        isValid = false;
    } else if (name.value.trim().length < 3) {
        showError(name, 'Họ tên phải có ít nhất 3 ký tự');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
        showError(email, 'Vui lòng nhập email');
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        showError(email, 'Email không hợp lệ');
        isValid = false;
    }
    
    // Validate subject
    if (subject.value.trim() === '') {
        showError(subject, 'Vui lòng nhập tiêu đề');
        isValid = false;
    } else if (subject.value.trim().length < 5) {
        showError(subject, 'Tiêu đề phải có ít nhất 5 ký tự');
        isValid = false;
    }
    
    // Validate message
    if (message.value.trim() === '') {
        showError(message, 'Vui lòng nhập tin nhắn');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'Tin nhắn phải có ít nhất 10 ký tự');
        isValid = false;
    }
    
    // If form is valid, submit
    if (isValid) {
        // Show success message
        showSuccessMessage();
        
        // Reset form
        contactForm.reset();
        
        // Log form data (in production, this would be sent to a server)
        console.log('Form submitted:', {
            name: name.value.trim(),
            email: email.value.trim(),
            subject: subject.value.trim(),
            message: message.value.trim()
        });
    }
});

// Show error message
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    errorMessage.textContent = message;
    input.style.borderColor = '#ef4444';
}

// Clear all error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    errorMessages.forEach(error => {
        error.textContent = '';
    });
    
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

// Show success message
function showSuccessMessage() {
    // Create success overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    `;
    
    // Create success message box
    const messageBox = document.createElement('div');
    messageBox.style.cssText = `
        background: white;
        padding: 3rem;
        border-radius: 12px;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        animation: slideUp 0.3s ease;
    `;
    
    // Check if dark mode
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
        messageBox.style.background = '#1e293b';
        messageBox.style.color = '#f1f5f9';
    }
    
    messageBox.innerHTML = `
        <div style="
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #22c55e 0%, #10b981 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
        ">
            <i class="fas fa-check" style="font-size: 2.5rem; color: white;"></i>
        </div>
        <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: ${isDark ? '#f1f5f9' : '#0f172a'};">
            Gửi thành công!
        </h3>
        <p style="color: ${isDark ? '#cbd5e1' : '#475569'}; margin-bottom: 2rem;">
            Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi sớm nhất có thể.
        </p>
        <button onclick="this.parentElement.parentElement.remove()" style="
            padding: 0.8rem 2rem;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            border: none;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        " onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">
            Đóng
        </button>
    `;
    
    overlay.appendChild(messageBox);
    document.body.appendChild(overlay);
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(overlay)) {
            overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => overlay.remove(), 300);
        }
    }, 5000);
}

// Add animations to CSS dynamically
const formStyle = document.createElement('style');
formStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(formStyle);

// ==================== REAL-TIME INPUT VALIDATION ====================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('input', () => {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        
        // Clear error on input
        if (errorMessage.textContent !== '') {
            errorMessage.textContent = '';
            input.style.borderColor = '';
        }
        
        // Add success border if valid
        if (input.value.trim() !== '') {
            input.style.borderColor = '#22c55e';
        }
    });
    
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.style.borderColor = '';
        }
    });
});

// ==================== PORTFOLIO CARD HOVER EFFECT ====================
const portfolioCards = document.querySelectorAll('.portfolio-card');

portfolioCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add tilt effect
        this.style.transform = 'translateY(-10px) perspective(1000px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `translateY(-10px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});

// ==================== SKILL CARD ANIMATION ====================
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ==================== PARALLAX EFFECT FOR HERO SHAPES ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.hero-shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== TYPING EFFECT FOR HERO TEXT ====================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Optional: Uncomment to enable typing effect
// window.addEventListener('load', () => {
//     const heroName = document.querySelector('.hero-name');
//     const originalText = heroName.textContent;
//     typeWriter(heroName, originalText, 100);
// });

// ==================== SECTION TRANSITION EFFECT ====================
const sections = document.querySelectorAll('.section');

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            sectionObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => sectionObserver.observe(section));

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
    // Remove any loading overlay if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
    
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero .animate-text');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Use debounced scroll for heavy operations
const debouncedScroll = debounce(() => {
    // Your scroll logic here if needed
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ==================== INITIALIZE ====================
console.log('Portfolio website loaded successfully! 🚀');
console.log('Made with ❤️ by Huỳnh Bảo Khang');
