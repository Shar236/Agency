/**
 * OriginKit 3D Spatial Depth & Specular Glare Tilt Component
 * Features:
 * - Dynamic 3D perspective tilt with spring damping
 * - Multi-layer spatial depth (Z-translation of child elements: badges, headlines, buttons)
 * - Dynamic specular light sheen / glare reflection that follows cursor position
 * - Works on mousemove & touch with zero layout thrashing
 */

export function initTilt3D() {
  const cards = document.querySelectorAll('.case-study-item, .bento-card, .service-video-card');
  if (!cards.length) return;

  cards.forEach(card => {
    // Avoid double initialization
    if (card.dataset.tilt3dInit) return;
    card.dataset.tilt3dInit = 'true';

    // Enable 3D transform style on the card
    card.style.transformStyle = 'preserve-3d';
    card.style.perspective = '1200px';

    // Add specular glare element if not present
    let glare = card.querySelector('.originkit-3d-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'originkit-3d-glare';
      card.appendChild(glare);
    }

    let rect = null;
    let rafId = null;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    function onMouseEnter() {
      rect = card.getBoundingClientRect();
      card.classList.add('is-tilting');
    }

    function onMouseMove(e) {
      if (!rect) rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const px = (x / rect.width) * 2 - 1;   // -1 to 1
      const py = (y / rect.height) * 2 - 1;  // -1 to 1

      // Tilt angles (max 12 degrees)
      targetX = -py * 10;
      targetY = px * 10;

      // Glare position
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      card.style.setProperty('--glare-x', `${glareX}%`);
      card.style.setProperty('--glare-y', `${glareY}%`);

      if (!rafId) {
        rafId = requestAnimationFrame(updateTilt);
      }
    }

    function updateTilt() {
      // Smooth interpolation (lerp)
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;

      card.style.transform = `perspective(1000px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;

      // Apply Z-depth translations to child elements
      const depthBadges = card.querySelectorAll('.case-number-badge, .case-client-tag, .service-category-badge, .viewfinder-top');
      depthBadges.forEach(el => {
        el.style.transform = 'translateZ(26px)';
        el.style.transition = 'transform 0.1s ease-out';
      });

      const depthCTAs = card.querySelectorAll('.btn-case-study, .card-action-footer, .btn-glass');
      depthCTAs.forEach(el => {
        el.style.transform = 'translateZ(34px)';
        el.style.transition = 'transform 0.1s ease-out';
      });

      const depthVisuals = card.querySelectorAll('.case-img-container, .card-video-container');
      depthVisuals.forEach(el => {
        el.style.transform = 'translateZ(14px)';
        el.style.transition = 'transform 0.1s ease-out';
      });

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        rafId = requestAnimationFrame(updateTilt);
      } else {
        rafId = null;
      }
    }

    function onMouseLeave() {
      rect = null;
      targetX = 0;
      targetY = 0;
      card.classList.remove('is-tilting');

      // Reset transform smoothly
      card.style.transition = 'transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1)';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

      const depthElements = card.querySelectorAll('.case-number-badge, .case-client-tag, .service-category-badge, .viewfinder-top, .btn-case-study, .card-action-footer, .btn-glass, .case-img-container, .card-video-container');
      depthElements.forEach(el => {
        el.style.transition = 'transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1)';
        el.style.transform = 'translateZ(0px)';
      });

      setTimeout(() => {
        card.style.transition = '';
        depthElements.forEach(el => el.style.transition = '');
      }, 550);

      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    card.addEventListener('mouseenter', onMouseEnter, { passive: true });
    card.addEventListener('mousemove', onMouseMove, { passive: true });
    card.addEventListener('mouseleave', onMouseLeave, { passive: true });
  });
}
