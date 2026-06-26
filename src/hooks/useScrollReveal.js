// useScrollReveal — attaches IntersectionObserver to elements with .reveal class
// Adds .is-revealed when element enters viewport
import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Immediately reveal all — no animation for reduced motion users
      document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px' }
    );

    // Observe all .reveal elements
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => {
      // Immediately reveal elements already in viewport on load
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-revealed');
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  });
}
