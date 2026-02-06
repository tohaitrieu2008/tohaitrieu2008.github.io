/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

// Menu show
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Menu hidden
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 80) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL TOP ====================*/
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    if (this.scrollY >= 560) {
        scrollTop.classList.add('show-scroll');
    } else {
        scrollTop.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollTop);

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 50,
              sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*==================== SCROLL REVEAL ANIMATION ====================*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

// Add fade-in class to elements
document.addEventListener('DOMContentLoaded', function() {
    // About section
    const aboutDescription = document.querySelector('.about__description');
    const infoCards = document.querySelectorAll('.info__card');
    
    if (aboutDescription) {
        aboutDescription.classList.add('fade-in');
        observer.observe(aboutDescription);
    }
    
    infoCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Hobbies section
    const hobbyCards = document.querySelectorAll('.hobby__card');
    hobbyCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Social section
    const socialDescription = document.querySelector('.social__description');
    const socialLinks = document.querySelectorAll('.social__link');
    
    if (socialDescription) {
        socialDescription.classList.add('fade-in');
        observer.observe(socialDescription);
    }
    
    socialLinks.forEach((link, index) => {
        link.classList.add('fade-in');
        link.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(link);
    });
    
    // Contact section
    const contactInfo = document.querySelector('.contact__info');
    const contactForm = document.querySelector('.contact__form');
    
    if (contactInfo) {
        contactInfo.classList.add('fade-in');
        observer.observe(contactInfo);
    }
    
    if (contactForm) {
        contactForm.classList.add('fade-in');
        contactForm.style.transitionDelay = '0.2s';
        observer.observe(contactForm);
    }
});

/*==================== SMOOTH SCROLL ====================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*==================== FORM VALIDATION & SUBMISSION ====================*/
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formInputs = this.querySelectorAll('.form__input');
        let isValid = true;
        
        // Simple validation
        formInputs.forEach(input => {
            if (input.value.trim() === '') {
                isValid = false;
                input.style.borderColor = '#FF6B6B';
                
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 2000);
            }
        });
        
        if (isValid) {
            // Show success message
            showMessage('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.', 'success');
            
            // Reset form
            this.reset();
        } else {
            showMessage('Vui lòng điền đầy đủ thông tin!', 'error');
        }
    });
}

/*==================== SHOW MESSAGE FUNCTION ====================*/
function showMessage(message, type) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Style the message
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        padding: 1rem 2rem;
        border-radius: 50px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideDown 0.5s ease;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    `;
    
    if (type === 'success') {
        messageDiv.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
    } else {
        messageDiv.style.background = 'linear-gradient(135deg, #FF6B6B, #FF5252)';
    }
    
    // Add to body
    document.body.appendChild(messageDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideUp 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 500);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
    }
    
    .scroll-header {
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1) !important;
    }
`;
document.head.appendChild(style);

/*==================== DYNAMIC YEAR IN FOOTER ====================*/
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.querySelector('.footer__copy p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} Lê Hoài Bảo Trâm. All rights reserved.`;
    }
});

/*==================== PARALLAX EFFECT FOR PARTICLES ====================*/
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        const speed = 0.5 + (index * 0.1);
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

/*==================== TYPING EFFECT FOR HERO TITLE (Optional Enhancement) ====================*/
document.addEventListener('DOMContentLoaded', function() {
    const titleElement = document.querySelector('.home__title');
    if (titleElement) {
        const originalHTML = titleElement.innerHTML;
        titleElement.style.opacity = '0';
        
        setTimeout(() => {
            titleElement.style.opacity = '1';
            titleElement.style.animation = 'fadeInUp 0.8s ease';
        }, 200);
    }
});

// Add fade in up animation
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeInUp {
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
document.head.appendChild(fadeStyle);

/*==================== CONSOLE MESSAGE ====================*/
console.log('%c👋 Xin chào! ', 'color: #FFB6C1; font-size: 20px; font-weight: bold;');
console.log('%cCảm ơn bạn đã ghé thăm trang web của tôi!', 'color: #E6B0FF; font-size: 14px;');
console.log('%c💝 Made with love by Bảo Trâm', 'color: #B4E4FF; font-size: 12px;');
