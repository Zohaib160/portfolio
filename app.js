/* ═══════════════════════════════════════════════════════════════
   ZOHAIB AKRAM — PORTFOLIO JS  v1.0
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ── CURSOR GLOW ──────────────────────────────────────────────── */
const glow = document.getElementById('cursorGlow');
let mx = window.innerWidth / 2, my = window.innerHeight / 2;
let cx = mx, cy = my;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

(function animateCursor() {
  cx += (mx - cx) * 0.08;
  cy += (my - cy) * 0.08;
  if (glow) {
    glow.style.transform = `translate(${cx - 300}px, ${cy - 300}px)`;
  }
  requestAnimationFrame(animateCursor);
})();

/* ── NAV SCROLL ───────────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── HAMBURGER ────────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

/* ── SCROLL REVEAL ────────────────────────────────────────────── */
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      // Stagger siblings in the same parent
      const siblings = [...el.parentElement.querySelectorAll('.reveal:not(.visible)')];
      const idx = siblings.indexOf(el);
      setTimeout(() => {
        el.classList.add('visible');
      }, idx * 80);
      io.unobserve(el);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => io.observe(el));

/* ── ACTIVE NAV HIGHLIGHT ─────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionIO.observe(s));

/* ── HERO NAME PARALLAX ────────────────────────────────────────── */
const heroName = document.querySelector('.hero-name');
if (heroName) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroName.style.transform = `translateY(${y * 0.12}px)`;
      heroName.style.opacity = `${1 - y / window.innerHeight * 1.4}`;
    }
  }, { passive: true });
}

/* ── PROJECT CARD TILT ─────────────────────────────────────────── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rx = (-y / rect.height) * 5;
    const ry = (x / rect.width) * 5;
    card.style.transform = `translateY(-4px) perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── SKILL TAG RIPPLE ──────────────────────────────────────────── */
document.querySelectorAll('.skill-tags span').forEach(tag => {
  tag.addEventListener('click', e => {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute;pointer-events:none;border-radius:50%;
      background:rgba(99,102,241,0.35);transform:scale(0);
      animation:rippleKf 0.4s linear;
      width:60px;height:60px;
      left:${e.offsetX - 30}px;top:${e.offsetY - 30}px;
    `;
    tag.style.position = 'relative';
    tag.style.overflow = 'hidden';
    tag.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

/* inject ripple keyframes once */
const rippleStyle = document.createElement('style');
rippleStyle.textContent = '@keyframes rippleKf{to{transform:scale(3);opacity:0}}';
document.head.appendChild(rippleStyle);

/* ── SMOOTH SECTION ENTRY STAGGER ─────────────────────────────── */
// Already handled by IntersectionObserver above

/* ── TYPING EFFECT — hero tagline ─────────────────────────────── */
// Subtle: ensure hero content fades in sequentially
document.querySelectorAll('.hero-content .reveal').forEach((el, i) => {
  el.style.transitionDelay = `${0.1 + i * 0.12}s`;
});

console.log('%c👋 Hey there, developer! Source is clean.', 'color:#818cf8;font-size:14px;font-weight:600;');
