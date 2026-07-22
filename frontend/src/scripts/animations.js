/**
 * Pramo Jewels Motion & GSAP Animation Engine
 * Delivers ultra-luxurious, 60fps micro-interactions, scroll triggers, and fluid reveals.
 */

import { gsap } from 'gsap';

export const MotionEngine = {
  init() {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.animateHero();
    this.initScrollReveals();
    this.initParallax();
  },

  animateHero() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroBtn = document.querySelector('.hero-cta');

    if (heroTitle) {
      gsap.fromTo(heroTitle, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      );
    }

    if (heroSubtitle) {
      gsap.fromTo(heroSubtitle,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: 0.5 }
      );
    }

    if (heroBtn) {
      gsap.fromTo(heroBtn,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.8 }
      );
    }
  },

  initScrollReveals() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      gsap.set(el, { opacity: 0, y: 30 });
      observer.observe(el);
    });
  },

  initParallax() {
    window.addEventListener('mousemove', (e) => {
      const floaters = document.querySelectorAll('.floating-jewel');
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 30;

      floaters.forEach(el => {
        gsap.to(el, {
          x: mouseX,
          y: mouseY,
          duration: 1.5,
          ease: 'power1.out'
        });
      });
    });
  }
};
