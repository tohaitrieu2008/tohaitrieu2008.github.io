// ============================================
// Navigation & Mobile Menu
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// ============================================
// Active Navigation Link
// ============================================
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// Scroll Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.project-card, .skill-category, .contact-content');
animateElements.forEach(el => {
    observer.observe(el);
});

// Special animation for about section
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const aboutImage = entry.target.querySelector('.about-image');
            const aboutText = entry.target.querySelector('.about-text');
            const infoItems = entry.target.querySelectorAll('.info-item');
            
            if (aboutImage) {
                aboutImage.style.opacity = '0';
                aboutImage.style.transform = 'translateX(-50px)';
                setTimeout(() => {
                    aboutImage.style.transition = 'all 0.6s ease';
                    aboutImage.style.opacity = '1';
                    aboutImage.style.transform = 'translateX(0)';
                }, 100);
            }
            
            if (aboutText) {
                aboutText.style.opacity = '0';
                aboutText.style.transform = 'translateX(50px)';
                setTimeout(() => {
                    aboutText.style.transition = 'all 0.6s ease';
                    aboutText.style.opacity = '1';
                    aboutText.style.transform = 'translateX(0)';
                }, 200);
            }
            
            infoItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.5s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 400 + (index * 100));
            });
            
            aboutObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const aboutContent = document.querySelector('.about-content');
if (aboutContent) {
    aboutObserver.observe(aboutContent);
}

// ============================================
// Typing Effect for Hero Title (Optional Enhancement)
// ============================================
// Disabled to prevent scroll issues
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//     const text = heroTitle.innerHTML;
//     heroTitle.innerHTML = '';
//     
//     let i = 0;
//     const typeWriter = () => {
//         if (i < text.length) {
//             heroTitle.innerHTML += text.charAt(i);
//             i++;
//             setTimeout(typeWriter, 50);
//         }
//     };
//     
//     // Start typing effect after a short delay
//     setTimeout(typeWriter, 500);
// }

// ============================================
// Dynamic Year in Footer
// ============================================
const updateYear = () => {
    const yearElements = document.querySelectorAll('.footer-content p');
    if (yearElements.length > 0) {
        const currentYear = new Date().getFullYear();
        yearElements[0].innerHTML = `&copy; ${currentYear} Thiết kế bởi Trần Quyết Thắng`;
    }
};

updateYear();

// ============================================
// Project Cards Hover Effect
// ============================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// Parallax Effect for Hero Section (Optional)
// ============================================
// Disabled to prevent scroll issues
// const heroSection = document.querySelector('.hero');
// 
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const parallaxSpeed = 0.5;
//     
//     if (heroSection && scrolled < window.innerHeight) {
//         heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
//     }
// });


// ============================================
// Mouse Trail Effect (Optional - can be removed if too much)
// ============================================
const createMouseTrail = () => {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll('.circle');
    
    if (circles.length === 0) return;
    
    circles.forEach((circle, index) => {
        circle.x = 0;
        circle.y = 0;
    });
    
    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });
    
    const animateCircles = () => {
        let x = coords.x;
        let y = coords.y;
        
        circles.forEach((circle, index) => {
            circle.style.left = x - 12 + 'px';
            circle.style.top = y - 12 + 'px';
            circle.style.scale = (circles.length - index) / circles.length;
            
            circle.x = x;
            circle.y = y;
            
            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });
        
        requestAnimationFrame(animateCircles);
    };
    
    animateCircles();
};

// Uncomment to enable mouse trail effect
// createMouseTrail();

// ============================================
// Typing Effect for Name
// ============================================
const typeName = () => {
    const nameElement = document.getElementById('typed-name');
    if (!nameElement) return;
    
    const fullName = 'Trần Quyết Thắng';
    let characterCount = 0;
    let isDeleting = false;

    nameElement.textContent = '';
    
    const cycleTyping = () => {
        if (!nameElement.isConnected) return;
        
        if (!isDeleting) {
            if (characterCount < fullName.length) {
                characterCount += 1;
                nameElement.textContent = fullName.slice(0, characterCount);
                
                if (characterCount % 3 === 0) {
                    createSparkle(nameElement);
                }
                
                setTimeout(cycleTyping, 120);
                return;
            }
            
            nameElement.classList.add('typing-complete');
            
            // Trigger final sparkle burst when finishing typing
            for (let i = 0; i < 5; i++) {
                setTimeout(() => createSparkle(nameElement), i * 120);
            }
            
            setTimeout(() => {
                isDeleting = true;
                nameElement.classList.remove('typing-complete');
                setTimeout(cycleTyping, 200);
            }, 1500);
        } else {
            if (characterCount > 0) {
                characterCount -= 1;
                nameElement.textContent = fullName.slice(0, characterCount);
                setTimeout(cycleTyping, 70);
                return;
            }
            
            nameElement.textContent = '';
            
            setTimeout(() => {
                isDeleting = false;
                setTimeout(cycleTyping, 500);
            }, 400);
        }
    };
    
    setTimeout(cycleTyping, 800);
};

// Sparkle effect
const createSparkle = (element) => {
    const sparkle = document.createElement('span');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.fontSize = '1.5rem';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'sparkleFloat 1s ease-out forwards';
    
    const rect = element.getBoundingClientRect();
    sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
    sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
};

// Initialize typing effect on page load
window.addEventListener('load', () => {
    typeName();
    handleImageLoad();
});

document.addEventListener('DOMContentLoaded', () => {
    createDarkModeToggle();
});
