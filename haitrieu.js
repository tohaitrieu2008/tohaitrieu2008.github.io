const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  
  let devicePixelRatio = window.devicePixelRatio || 1;
  function resizeCanvas(){
    devicePixelRatio = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    canvas.width = Math.floor(w * devicePixelRatio);
    canvas.height = Math.floor(h * devicePixelRatio);
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  resizeCanvas();

  let particles = [];
  function createParticles(){
    particles = [];
    const base = Math.max(40, Math.min(120, Math.floor(window.innerWidth / 15)));
    const particleCount = base;
    for(let i=0;i<particleCount;i++) particles.push(new Particle());
  }

  class Particle {
    constructor(){
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * window.innerHeight;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() * 0.6 - 0.3);
      this.speedY = (Math.random() * 0.6 - 0.3);
      const g = Math.floor(138 + Math.random() * 60);
      const a = (0.15 + Math.random() * 0.35).toFixed(2);
      this.color = `rgba(255, ${g}, 214, ${a})`;
    }
    update(){
      this.x += this.speedX;
      this.y += this.speedY;
      if(this.x > window.innerWidth + 10) this.x = -10;
      if(this.x < -10) this.x = window.innerWidth + 10;
      if(this.y > window.innerHeight + 10) this.y = -10;
      if(this.y < -10) this.y = window.innerHeight + 10;
    }
    draw(){
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function animateParticles(){
    ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
    const len = particles.length;
    for(let i=0;i<len;i++){
      const p = particles[i];
      p.update();
      p.draw();

      const maxCheck = 70;
      for(let j = i+1, checked = 0; j < len && checked < maxCheck; j++, checked++){
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 120){
          const alpha = Math.max(0, 0.18 - dist/800);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(155, 108, 255, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }

  createParticles();
  animateParticles();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resizeCanvas();
      createParticles();
    }, 120);
  });

  const card = document.getElementById('tilt-card');
  const computer = document.getElementById('computer3d');

  if(!('ontouchstart' in window)){
    document.addEventListener('mousemove', (e) => {
      if(window.innerWidth > 968 && card){
        const x = (e.clientX / window.innerWidth - 0.5) * 6;
        const y = (e.clientY / window.innerHeight - 0.5) * 6;
        card.style.transform = `perspective(1200px) rotateX(${-y}deg) rotateY(${x}deg)`;
        if(computer){
          computer.style.transform = `translateZ(0) rotateY(${x * 0.9}deg) rotateX(${y * 0.6}deg)`;
        }
      }
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
  
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

const observerOptions = {
  root: null,
  rootMargin: '-45% 0px -45% 0px',
  threshold: 0
};

let currentActive = '';

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      
      if (currentActive !== id) {
        currentActive = id;
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight;
  const winHeight = window.innerHeight;
  // Đầu trang -> Home
  if (scrollY < 200 && currentActive !== 'home') {
    currentActive = 'home';
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#home') link.classList.add('active');
    });
  }
  // Cuối trang -> Contact
  if (scrollY + winHeight > docHeight - 200 && currentActive !== 'contact') {
    currentActive = 'contact';
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#contact') link.classList.add('active');
    });
  }
}, { passive: true });

navLinks.forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks.forEach(link => link.classList.remove('active'));
      this.classList.add('active');
    }
  });
});