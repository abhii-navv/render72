import { useEffect } from 'react';

/**
 * useScrollReveal:
 * Automatically observes all elements with `.scroll-fade` or `[data-reveal]`
 * and adds `.is-visible` as they enter the viewport,
 * creating a smooth fade-in + slide-up entrance while scrolling.
 */
export function useScrollReveal(trigger) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.scroll-fade, [data-reveal]');
      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            } else {
              // If the element is below the viewport, reset it so scrolling down re-triggers the fade
              const rect = entry.target.getBoundingClientRect();
              if (rect.top > window.innerHeight * 0.92) {
                entry.target.classList.remove('is-visible');
              }
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -40px 0px',
          threshold: 0.05,
        }
      );

      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 40);

    return () => clearTimeout(timer);
  }, [trigger]);
}
