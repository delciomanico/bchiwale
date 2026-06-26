// useHashScroll — scrolls to the element matching window.location.hash
// after route navigation. Runs after each location change.
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useHashScroll() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small delay to let the page render before scrolling
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // No hash — scroll to top on route change
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);
}
