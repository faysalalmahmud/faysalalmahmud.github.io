import './style.css';

// -------------------------------------------------------------
// 0. Awwwards Preloader Sequence
// -------------------------------------------------------------
const preloader = document.getElementById('preloader');
const progressCounter = document.getElementById('progress-counter');
const progressBar = document.getElementById('progress-bar');
let loaderProgress = 0;

const preloaderLabel = document.getElementById('preloader-label');
const mlPhrases = [
  "INITIALIZING COGNITIVE MODELS...",
  "DEPLOYING TENSOR ARRAYS...",
  "OPTIMIZING GRADIENT DESCENT...",
  "CALIBRATING HYPERPARAMETERS...",
  "SYNTHESIZING NEURAL WEIGHTS...",
  "ALLOCATING GPU COMPUTE...",
  "EXECUTING EPOCH ITERATIONS...",
  "LOADING PREDICTIVE MATRICES..."
];

function updateLoader() {
  loaderProgress += Math.floor(Math.random() * 10) + 2;
  if (loaderProgress > 100) loaderProgress = 100;
  
  progressCounter.innerText = loaderProgress < 10 ? `0${loaderProgress}%` : `${loaderProgress}%`;
  progressBar.style.width = `${loaderProgress}%`;
  
  // Randomly update the ML phrase to look like a real terminal process
  if (Math.random() > 0.6) {
    preloaderLabel.innerText = mlPhrases[Math.floor(Math.random() * mlPhrases.length)];
  }
  
  if (loaderProgress < 100) {
    setTimeout(updateLoader, 30 + Math.random() * 80);
  } else {
    preloaderLabel.innerText = "SYSTEM.READY // COGNITION ONLINE";
    setTimeout(finishLoading, 500);
  }
}

function finishLoading() {
  const gsap = window.gsap;
  // Slide preloader up into the void
  gsap.to(preloader, { y: '-100%', duration: 1.2, ease: "power4.inOut", onComplete: () => {
    preloader.style.display = 'none';
    initMainAnimations();
  }});
}
// Start Preloader
updateLoader();


// -------------------------------------------------------------
// 1. Core Lenis Smooth Scroll Initialization
// -------------------------------------------------------------
const lenis = new window.Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
});

window.gsap.ticker.add((time)=>{ lenis.raf(time * 1000); });
window.gsap.ticker.lagSmoothing(0);


// -------------------------------------------------------------
// 2. Custom Cursor System with Trailing Engine
// -------------------------------------------------------------
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let outlineX = mouseX, outlineY = mouseY;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorDot.style.left = `${mouseX}px`;
  cursorDot.style.top = `${mouseY}px`;
});

function animateCursor() {
  outlineX += (mouseX - outlineX) * 0.15;
  outlineY += (mouseY - outlineY) * 0.15;
  cursorOutline.style.left = `${outlineX}px`;
  cursorOutline.style.top = `${outlineY}px`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Attach Hover events dynamically to constantly created elements if needed
document.addEventListener('mouseover', (e) => {
  if (e.target.closest('.hover-target') || e.target.closest('a')) {
    cursorOutline.classList.add('hover');
    cursorDot.style.opacity = '0';
  }
});
document.addEventListener('mouseout', (e) => {
  if (e.target.closest('.hover-target') || e.target.closest('a')) {
    cursorOutline.classList.remove('hover');
    cursorDot.style.opacity = '1';
  }
});


// -------------------------------------------------------------
// 3. 3D Tilt Logic & Spotlight
// -------------------------------------------------------------
const tiltElements = document.querySelectorAll(".js-tilt");

tiltElements.forEach(elem => {
  // Spotlight
  elem.addEventListener("mousemove", (e) => {
    const rect = elem.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    elem.style.setProperty("--mouse-x", `${x}px`);
    elem.style.setProperty("--mouse-y", `${y}px`);
    
    // Tilt calculations
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;
    
    elem.style.setProperty("--rot-x", `${rotateX}deg`);
    elem.style.setProperty("--rot-y", `${rotateY}deg`);
  });
  
  elem.addEventListener("mouseleave", () => {
    elem.style.setProperty("--rot-x", `0deg`);
    elem.style.setProperty("--rot-y", `0deg`);
  });
});


// -------------------------------------------------------------
// 4. GSAP Master Animations
// -------------------------------------------------------------
function splitTextLines(selector) {
  const el = document.querySelector(selector);
  if(!el) return;
  const words = el.innerText.split(' ');
  el.innerHTML = '';
  words.forEach(word => {
    const wrp = document.createElement('span');
    wrp.className = 'line-wrapper';
    const inr = document.createElement('span');
    inr.className = 'line-inner';
    inr.style.marginRight = '30px'; 
    inr.innerHTML = word;
    wrp.appendChild(inr);
    el.appendChild(wrp);
  });
}

function initMainAnimations() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
  lenis.on('scroll', ScrollTrigger.update);
  
  splitTextLines('#split-title');
  
  // Title Sequence
  const tl = gsap.timeline();
  tl.to('.gsap-fade', { opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }, 0)
    .to('.line-inner', { y: '0%', duration: 1.5, stagger: 0.1, ease: "expo.out" }, 0.2)
    .to('.gsap-hero-item', { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "expo.out" }, 0.5);

  // Scroll Headings
  gsap.utils.toArray('.gsap-heading').forEach(heading => {
    gsap.from(heading, {
      scrollTrigger: { trigger: heading, start: 'top 85%' },
      y: 100, opacity: 0, duration: 1.5, ease: "expo.out"
    });
  });

  // Fade Up Text
  gsap.utils.toArray('.fade-up-text').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 90%" },
      y: 60, opacity: 0, duration: 1.2, ease: "power3.out"
    });
  });

  // Projects Image Parallax
  gsap.utils.toArray('.prlx-container').forEach(container => {
    const image = container.querySelector('.prlx-image');
    gsap.to(image, {
      yPercent: 20, 
      ease: "none",
      scrollTrigger: {
        trigger: container, start: "top bottom", end: "bottom top", scrub: 1
      } 
    });
    // Clip Reveal
    gsap.from(container, {
      scrollTrigger: { trigger: container, start: "top 85%" },
      clipPath: "inset(30% 15% 30% 15% round 30px)",
      duration: 1.8, ease: "expo.inOut"
    });
  });
  
  // Projects Text Split Reveal
  gsap.utils.toArray('.js-info').forEach(info => {
    gsap.from(info.children, {
      scrollTrigger: { trigger: info, start: "top 80%" },
      y: 50, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power3.out"
    });
  });
  
  // Marquee Fast Scroll Trigger
  gsap.to('.marquee-content', {
    xPercent: -30,
    ease: "none",
    scrollTrigger: {
      trigger: ".marquee-section", start: "top bottom", end: "bottom top", scrub: true
    }
  });

  // Mega Horizontal Experience Scroll (Responsive)
  let mm = gsap.matchMedia();
  mm.add("(min-width: 1025px)", () => {
    const expSection = document.querySelector('.mega-exp-section');
    const expTrack = document.querySelector('.mega-exp-track');
    if (expSection && expTrack) {
      let scrollAmount = expTrack.scrollWidth - window.innerWidth;
      
      gsap.to(expTrack, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: expSection,
          start: "top top",
          end: () => `+=${scrollAmount}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    }
  });
}


// -------------------------------------------------------------
// 5. Magnetic Physical Elements
// -------------------------------------------------------------
const gsapRef = window.gsap;
document.querySelectorAll('.magnetic').forEach((elem) => {
  elem.addEventListener('mousemove', (e) => {
    const rect = elem.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsapRef.to(elem, { x: x * 0.4, y: y * 0.4, duration: 0.5, ease: "power3.out" });
    const text = elem.querySelector('.btn-text');
    if(text) gsapRef.to(text, { x: x * 0.2, y: y * 0.2, duration: 0.5, ease: "power3.out" });
  });
  elem.addEventListener('mouseleave', () => {
    gsapRef.to(elem, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
    const text = elem.querySelector('.btn-text');
    if(text) gsapRef.to(text, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
  });
});


// -------------------------------------------------------------
// 6. Interactive Neural Canvas System (Depth & Scroll-Synced)
// -------------------------------------------------------------
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let nodes = [];
const numNodes = 250;
for(let i=0; i<numNodes; i++) {
  nodes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * 2000,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4
  });
}

let scrollYPos = 0;
lenis.on('scroll', (e) => { scrollYPos = e.animatedScroll; });

let pColor = '255, 255, 255';
let lColor = '0, 243, 255';
function updateCanvasColors() {
  pColor = getComputedStyle(document.documentElement).getPropertyValue('--canvas-particle').trim() || '255, 255, 255';
  lColor = getComputedStyle(document.documentElement).getPropertyValue('--canvas-line').trim() || '0, 243, 255';
}
// Initial fetch might need a small delay for CSS to map
setTimeout(updateCanvasColors, 100);

function renderCanvas() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  const cx = canvas.width / 2, cy = canvas.height / 2;
  
  // Create Neural Web connections
  for (let i = 0; i < nodes.length; i++) {
    const nodeA = nodes[i];
    nodeA.x += nodeA.vx; nodeA.y += nodeA.vy;
    
    // Depth calculations
    let driftZ = nodeA.z - (scrollYPos * 2.0) % 2000;
    if(driftZ < 0) driftZ += 2000; 
    
    const scale = 600 / (600 + driftZ);
    const px = (nodeA.x - cx) * scale + cx;
    const py = (nodeA.y - cy) * scale + cy;
    
    const opacity = Math.max(0, 1 - (driftZ / 1500));
    const ox = px + (cx - mouseX) * scale * 0.15;
    const oy = py + (cy - mouseY) * scale * 0.15;
    
    if (ox > 0 && ox < canvas.width && oy > 0 && oy < canvas.height) {
      ctx.beginPath();
      ctx.arc(ox, oy, Math.max(0.2, scale * 2), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${pColor}, ${opacity * 0.5})`;
      ctx.fill();
      
      // Lines to close nodes
      for(let j = i+1; j < nodes.length; j++) {
        const nodeB = nodes[j];
        let dZb = nodeB.z - (scrollYPos * 2.0) % 2000;
        if(dZb < 0) dZb += 2000;
        const scaleB = 600 / (600 + dZb);
        const ox2 = ((nodeB.x - cx) * scaleB + cx) + (cx - mouseX) * scaleB * 0.15;
        const oy2 = ((nodeB.y - cy) * scaleB + cy) + (cy - mouseY) * scaleB * 0.15;
        
        const dist = Math.sqrt((ox-ox2)**2 + (oy-oy2)**2);
        if (dist < 100 * scale && Math.abs(driftZ - dZb) < 300) {
          ctx.beginPath();
          ctx.moveTo(ox, oy);
          ctx.lineTo(ox2, oy2);
          ctx.strokeStyle = `rgba(${lColor}, ${opacity * (1 - dist/(100*scale)) * 0.15})`;
          ctx.stroke();
        }
      }
    }
  }
  requestAnimationFrame(renderCanvas);
}
renderCanvas();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Navbar Blur Handler
const navbar = document.getElementById('navbar');
lenis.on('scroll', (e) => {
  if (e.targetScroll > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// Theme Toggle Logic
function applyThemeToggle() {
  const isLight = document.documentElement.classList.contains('light');
  if (isLight) {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
  setTimeout(updateCanvasColors, 50);
}

const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) themeBtn.addEventListener('click', applyThemeToggle);

const themeBtnMobile = document.getElementById('theme-toggle-mobile');
if (themeBtnMobile) themeBtnMobile.addEventListener('click', applyThemeToggle);

// Hamburger Mobile Menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

function openMobileMenu() {
  hamburger.classList.add('is-open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.classList.add('is-open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // prevent scroll behind overlay
}

function closeMobileMenu() {
  hamburger.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    if (hamburger.classList.contains('is-open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close when a nav link is clicked
  mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

// -------------------------------------------------------------
// 8. Awards Neural Canvas — Synaptic Connections
// -------------------------------------------------------------
(function initAwardsCanvas() {
  const awardsSection = document.getElementById('awards');
  const aCanvas = document.getElementById('awards-canvas');
  if (!aCanvas || !awardsSection) return;
  const actx = aCanvas.getContext('2d');

  // Resize canvas to match its CSS container
  function resizeAwardsCanvas() {
    aCanvas.width  = aCanvas.offsetWidth;
    aCanvas.height = aCanvas.offsetHeight;
  }
  resizeAwardsCanvas();
  window.addEventListener('resize', resizeAwardsCanvas);

  // Collect node centre positions relative to the canvas wrap
  function getNodeCenters() {
    const wrap = aCanvas.parentElement; // .neural-canvas-wrap
    const wRect = wrap.getBoundingClientRect();
    const centers = [];
    awardsSection.querySelectorAll('.neural-node').forEach(node => {
      const r = node.getBoundingClientRect();
      centers.push({
        x: r.left - wRect.left + r.width  / 2,
        y: r.top  - wRect.top  + r.height / 2,
        layer: parseInt(node.dataset.layer, 10),
        idx:   parseInt(node.dataset.index, 10),
        type:  node.classList.contains('node-award') ? 'award' :
               node.classList.contains('node-hidden') ? 'hidden' : 'input'
      });
    });
    return centers;
  }

  // Travelling pulses
  const pulses = [];
  function spawnPulse(src, dst) {
    pulses.push({ sx: src.x, sy: src.y, dx: dst.x, dy: dst.y, t: 0, speed: 0.006 + Math.random()*0.006 });
  }

  let nodes = [];
  let lastPulseTime = 0;

  function drawAwardsCanvas(ts) {
    requestAnimationFrame(drawAwardsCanvas);
    actx.clearRect(0, 0, aCanvas.width, aCanvas.height);

    if (nodes.length === 0 || ts % 2000 < 16) nodes = getNodeCenters();

    const isDark = !document.documentElement.classList.contains('light');
    const cyanRGB   = isDark ? '0,243,255'   : '0,130,160';
    const purpleRGB = isDark ? '188,19,254'  : '150,0,200';

    // Draw connections between layers
    nodes.forEach(a => {
      nodes.forEach(b => {
        if (b.layer !== a.layer + 1) return;
        const grad = actx.createLinearGradient(a.x, a.y, b.x, b.y);
        const colA = a.type === 'input'  ? cyanRGB : purpleRGB;
        const colB = b.type === 'award'  ? cyanRGB : purpleRGB;
        grad.addColorStop(0, `rgba(${colA},0.35)`);
        grad.addColorStop(1, `rgba(${colB},0.12)`);
        actx.beginPath();
        actx.moveTo(a.x, a.y);
        actx.lineTo(b.x, b.y);
        actx.strokeStyle = grad;
        actx.lineWidth = 1;
        actx.stroke();
      });
    });

    // Spawn pulses periodically
    if (ts - lastPulseTime > 600) {
      lastPulseTime = ts;
      const inputs  = nodes.filter(n => n.type === 'input');
      const hiddens = nodes.filter(n => n.type === 'hidden');
      const awards  = nodes.filter(n => n.type === 'award');
      if (inputs.length && hiddens.length) {
        const i = inputs[Math.floor(Math.random() * inputs.length)];
        const h = hiddens.find(n => n.idx === i.idx) || hiddens[0];
        spawnPulse(i, h);
      }
      if (hiddens.length && awards.length) {
        const h = hiddens[Math.floor(Math.random() * hiddens.length)];
        const a = awards.find(n => n.idx === h.idx) || awards[0];
        spawnPulse(h, a);
      }
    }

    // Animate pulses
    for (let pi = pulses.length - 1; pi >= 0; pi--) {
      const p = pulses[pi];
      p.t += p.speed;
      if (p.t >= 1) { pulses.splice(pi, 1); continue; }
      const px = p.sx + (p.dx - p.sx) * p.t;
      const py = p.sy + (p.dy - p.sy) * p.t;
      const grd = actx.createRadialGradient(px, py, 0, px, py, 10);
      grd.addColorStop(0, `rgba(${cyanRGB},0.9)`);
      grd.addColorStop(1, `rgba(${cyanRGB},0)`);
      actx.beginPath();
      actx.arc(px, py, 10, 0, Math.PI * 2);
      actx.fillStyle = grd;
      actx.fill();
      // Trail
      actx.beginPath();
      actx.arc(px, py, 3, 0, Math.PI * 2);
      actx.fillStyle = `rgba(${cyanRGB},1)`;
      actx.fill();
    }
  }

  // Only run when visible
  if (typeof IntersectionObserver !== 'undefined') {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        requestAnimationFrame(drawAwardsCanvas);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(awardsSection);
  } else {
    requestAnimationFrame(drawAwardsCanvas);
  }
})();
