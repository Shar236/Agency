import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Universal Scroll Reveal Engine
 * Observes components across all pages as user scrolls and slides them into view.
 */
export default function ScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    // Add js-scroll-reveal to html tag to activate CSS transitions safely
    document.documentElement.classList.add('js-scroll-reveal');

    // Selectors to automatically apply scroll reveal animations
    const targetSelectors = [
      '.reveal-on-scroll',
      '.reveal-up',
      '.reveal-left',
      '.reveal-right',
      '.reveal-scale',
      '.section-header',
      '.studio-visual-mosaic',
      '.studio-growth-content',
      '.faq-item',
      '.cta-banner-card',
      '.trust-marquee-showcase',
      '.case-study-item',
      '.case-study-card',
      '.pricing-card',
      '.process-step',
      '.process-step-card',
      '.process-card',
      '.service-detail-card',
      '.service-card',
      '.contact-form-card',
      '.contact-info-card',
      '.contact-method-card',
      '.studio-stat-card',
      '.scope-calculator-wrapper',
      '.wheel-stage-container',
      '.wheel-info-card',
      '.matrix-card',
      '.sla-card'
    ];

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          // Once revealed, unobserve to keep DOM performant and steady
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    });

    // Small timeout to ensure DOM nodes are fully rendered after route transition
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(targetSelectors.join(', '));
      
      elements.forEach((el, index) => {
        // If element doesn't have a directional reveal class, default to reveal-up
        if (!el.classList.contains('reveal-left') && 
            !el.classList.contains('reveal-right') && 
            !el.classList.contains('reveal-scale') &&
            !el.classList.contains('reveal-up')) {
          el.classList.add('reveal-up');
        }

        // Apply stagger delay for list/grid items if inside common containers
        const parentGrid = el.closest('.studio-growth-grid, .faq-section, .pricing-grid, .services-grid, .case-studies-list, .contact-methods-grid');
        if (parentGrid && !el.style.transitionDelay) {
          const siblings = Array.from(parentGrid.querySelectorAll(targetSelectors.join(', ')));
          const siblingIndex = siblings.indexOf(el);
          if (siblingIndex > 0) {
            el.style.transitionDelay = `${Math.min(siblingIndex * 0.12, 0.48)}s`;
          }
        }

        // Check if element is already in viewport on initial load
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 40 && rect.bottom > 0) {
          // Stagger reveal for initial viewport items
          setTimeout(() => {
            el.classList.add('is-revealed');
          }, Math.min(index * 60, 400));
        } else {
          observer.observe(el);
        }
      });
    }, 80);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
}
