/**
 * STUDIO / NAME — Interactive Engine & Micro-interactions
 * Crafted to accompany the Figma Design System
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Header Scroll Effect & ScrollSpy
  const siteHeader = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // ScrollSpy
    let currentSection = '';
    const scrollPos = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').replace('#', '');
      if (href === currentSection) {
        link.classList.add('active');
      }
    });
  });

  // 3. Mobile Navigation Drawer
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 4. Hero Mockup Theme Switcher
  const themeDots = document.querySelectorAll('.theme-dot');
  const mockupStage = document.getElementById('mockupStage');
  const browserViewport = document.getElementById('browserViewport');

  const themePresets = {
    dark: {
      stageBg: '#F4EFEA',
      viewportBg: '#1A1A1A',
      headlineColor: '#FFFFFF',
      caption: 'Built for attention, clarity, and growth.'
    },
    coral: {
      stageBg: '#FCECE9',
      viewportBg: '#FAF9F6',
      headlineColor: '#111111',
      caption: 'Vibrant, editorial, and unforgettable.'
    },
    warm: {
      stageBg: '#EFE7DC',
      viewportBg: '#FAF7F2',
      headlineColor: '#111111',
      caption: 'Warm stone, natural light, and quiet craft.'
    },
    sage: {
      stageBg: '#E9EFE6',
      viewportBg: '#F4F7F2',
      headlineColor: '#111111',
      caption: 'Organic digital presence for conscious brands.'
    }
  };

  themeDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      themeDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      const selected = dot.getAttribute('data-theme');
      const preset = themePresets[selected];

      if (preset && mockupStage && browserViewport) {
        mockupStage.style.backgroundColor = preset.stageBg;
        browserViewport.style.backgroundColor = preset.viewportBg;

        const headline = browserViewport.querySelector('.mockup-hero-headline');
        if (headline) {
          headline.style.color = preset.headlineColor;
        }

        const captionEl = mockupStage.querySelector('.mockup-caption');
        if (captionEl) {
          captionEl.textContent = preset.caption;
        }
      }
    });
  });

  // 5. Interactive 3D Parallax on Hero Badges
  const heroVisual = document.querySelector('.hero-visual');
  const badgeMetric = document.getElementById('badgeMetric');
  const badgeType = document.getElementById('badgeType');

  if (heroVisual && badgeMetric && badgeType) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      badgeMetric.style.transform = `translate(${x * -24}px, ${y * -24}px)`;
      badgeType.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    });

    heroVisual.addEventListener('mouseleave', () => {
      badgeMetric.style.transform = 'translate(0px, 0px)';
      badgeType.style.transform = 'translate(0px, 0px)';
    });
  }

  // 6. Metrics Count-up Animation & Section Reveal
  const metricValues = document.querySelectorAll('.metric-value');
  let metricsAnimated = false;

  const animateMetrics = () => {
    metricValues.forEach(el => {
      const target = parseFloat(el.getAttribute('data-target'));
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1600;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Exponential ease-out
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = ease * target;

        el.textContent = current.toFixed(decimals) + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          el.textContent = target.toFixed(decimals) + suffix;
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  const trustSection = document.getElementById('trust');
  if (trustSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          trustSection.classList.add('revealed');
          if (!metricsAnimated) {
            metricsAnimated = true;
            animateMetrics();
          }
        }
      });
    }, { threshold: 0.15 });

    observer.observe(trustSection);
  }

  // 7. FAQ Accordion Interaction
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const icon = item.querySelector('.accordion-icon');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      accordionItems.forEach(other => {
        other.classList.remove('active');
        const otherTrigger = other.querySelector('.accordion-trigger');
        const otherIcon = other.querySelector('.accordion-icon');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        if (otherIcon) otherIcon.textContent = '+';
      });

      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        icon.textContent = '×';
      }
    });
  });

  // 8. Budget Chips Selection in Contact Form
  const budgetChips = document.querySelectorAll('.budget-chip');
  const selectedBudgetInput = document.getElementById('selectedBudget');

  budgetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      budgetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      if (selectedBudgetInput) {
        selectedBudgetInput.value = chip.getAttribute('data-budget');
      }
    });
  });

  // 9. Plan & Stage Selection Quick Fill
  const selectPlanButtons = document.querySelectorAll('.select-plan-btn');
  const stageCtaButtons = document.querySelectorAll('.stage-cta-btn');
  const projectTypeSelect = document.getElementById('formProjectType');

  if (projectTypeSelect) {
    selectPlanButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const plan = btn.getAttribute('data-plan');
        if (plan === 'Foundation') projectTypeSelect.value = 'Foundation Package';
        else if (plan === 'Signature' || plan === 'Signature Growth') projectTypeSelect.value = 'Signature Growth Package';
        else if (plan === 'Growth' || plan === 'Growth Partner') projectTypeSelect.value = 'Growth Partner Retainer';
      });
    });

    stageCtaButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = btn.getAttribute('data-preset');
        if (preset) {
          projectTypeSelect.value = preset;
        }
      });
    });
  }

  // 10. Contact Form Submission with Feedback
  const form = document.getElementById('projectInquiryForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitFormBtn');

  if (form && formStatus && submitBtn) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const origText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending inquiry...</span>`;

      setTimeout(() => {
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Thank you! Your project enquiry has been received. We will respond within 24 hours.';
        formStatus.style.display = 'block';

        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;

        // Reset default budget chip
        budgetChips.forEach(c => c.classList.remove('active'));
        if (budgetChips[1]) budgetChips[1].classList.add('active');

        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 8000);
      }, 1000);
    });
  }

  // 11. Case Study Data & Modal Preview
  const caseStudiesData = {
    northline: {
      title: 'Northline Living',
      tag: 'Brand + Digital Flagship',
      year: '2026',
      heroImg: './images/project-1.jpg',
      headline: 'Spaces that feel like home.',
      description: 'A warmer way to discover contemporary homes, neighborhoods, and a new kind of city living.',
      challenge: 'Northline needed to transcend standard luxury real estate conventions, turning a high-end property portfolio into an intimate, warm architectural discovery experience.',
      solution: 'We crafted an editorial digital identity paired with high-performance responsive web architecture, interactive 3D floorplan explorations, and neighborhood storytelling.',
      metrics: [
        { label: 'Qualified Enquiries', val: '+68%' },
        { label: 'Avg Session Duration', val: '4m 12s' },
        { label: 'Awards Won', val: '2 × Awwwards Site of the Day' }
      ],
      stack: ['React', 'TypeScript', 'Vite', 'Three.js', 'Sanity CMS']
    },
    forma: {
      title: 'Forma Journal',
      tag: 'Editorial Platform',
      year: '2026',
      heroImg: './images/project-2.jpg',
      headline: 'Culture, collected daily.',
      description: 'A bold publishing system that makes discovery feel spontaneous without losing clarity.',
      challenge: 'Forma sought to modernize their editorial catalog with a digital publication that bridges the tactile elegance of printed art monographs with blazing-fast digital reading.',
      solution: 'Designed an adaptive modular grid system with bespoke typography hierarchies, instant article transitions, and dynamic bookmarking features.',
      metrics: [
        { label: 'Reader Depth', val: '2.4×' },
        { label: 'Page Load Speed', val: '0.4s' },
        { label: 'Newsletter Growth', val: '+142%' }
      ],
      stack: ['Webflow Enterprise', 'TypeScript', 'Framer Motion', 'Algolia']
    },
    'common-ground': {
      title: 'Common Ground',
      tag: 'Strategy + Commerce',
      year: '2025',
      heroImg: './images/project-3.jpg',
      headline: 'Good work starts together.',
      description: 'A flexible membership experience for a workspace built around people, energy, and useful connection.',
      challenge: 'Transforming membership onboarding from a friction-filled inquiry form into an intuitive, self-guided booking journey with flexible tier selection.',
      solution: 'Implemented a frictionless booking and pass purchase flow, visual floor scheduling, and an interactive virtual club tour.',
      metrics: [
        { label: 'Faster Sign-up', val: '41%' },
        { label: 'Membership Conversions', val: '+88%' },
        { label: 'Mobile Checkout Rate', val: '74%' }
      ],
      stack: ['Shopify Plus', 'React', 'Tailored CSS', 'Stripe Connect']
    }
  };

  const caseStudyModal = document.getElementById('caseStudyModal');
  const caseModalBody = document.getElementById('caseModalBody');
  const closeCaseModal = document.getElementById('closeCaseModal');
  const caseStudyBtns = document.querySelectorAll('.btn-case-study');

  const openCaseModal = (projectKey) => {
    const data = caseStudiesData[projectKey];
    if (!data || !caseModalBody) return;

    caseModalBody.innerHTML = `
      <div class="case-modal-content">
        <div class="case-meta" style="margin-bottom: 12px;">
          <span>${data.tag}</span>
          <span>·</span>
          <span>${data.year}</span>
        </div>
        <h2 class="modal-title font-serif" style="margin-bottom: 16px;">${data.title}</h2>
        <h3 style="font-size: 1.3rem; font-weight: 500; margin-bottom: 24px; color: var(--text-muted);">${data.headline}</h3>

        <div style="border-radius: 16px; overflow: hidden; margin-bottom: 28px; max-height: 380px;">
          <img src="${data.heroImg}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px;">
          <div>
            <h4 style="font-size: 0.8rem; font-weight: 700; letter-spacing: 0.1em; color: var(--text-subtle); margin-bottom: 8px;">THE CHALLENGE</h4>
            <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-muted);">${data.challenge}</p>
          </div>
          <div>
            <h4 style="font-size: 0.8rem; font-weight: 700; letter-spacing: 0.1em; color: var(--text-subtle); margin-bottom: 8px;">OUR APPROACH</h4>
            <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-muted);">${data.solution}</p>
          </div>
        </div>

        <div style="background-color: var(--bg-secondary); border-radius: 16px; padding: 24px; margin-bottom: 32px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
          ${data.metrics.map(m => `
            <div>
              <div style="font-family: var(--font-serif); font-size: 2.2rem; color: var(--coral-500); line-height: 1; margin-bottom: 4px;">${m.val}</div>
              <div style="font-size: 0.82rem; color: var(--text-muted);">${m.label}</div>
            </div>
          `).join('')}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-light); padding-top: 24px;">
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${data.stack.map(s => `<span style="font-size: 0.78rem; font-weight: 600; background: rgba(0,0,0,0.05); padding: 4px 10px; border-radius: 999px;">${s}</span>`).join('')}
          </div>
          <a href="#contact" class="btn btn-dark" onclick="document.getElementById('caseStudyModal').classList.remove('active')">
            Start a Similar Project →
          </a>
        </div>
      </div>
    `;

    caseStudyModal.classList.add('active');
  };

  caseStudyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      openCaseModal(projectKey);
    });
  });

  if (closeCaseModal && caseStudyModal) {
    closeCaseModal.addEventListener('click', () => {
      caseStudyModal.classList.remove('active');
    });

    caseStudyModal.addEventListener('click', (e) => {
      if (e.target === caseStudyModal) {
        caseStudyModal.classList.remove('active');
      }
    });
  }

  // 12. Comparison Modal Controls
  const comparePlansBtn = document.getElementById('comparePlansBtn');
  const comparisonModal = document.getElementById('comparisonModal');
  const closeComparisonModal = document.getElementById('closeComparisonModal');

  if (comparePlansBtn && comparisonModal && closeComparisonModal) {
    comparePlansBtn.addEventListener('click', () => {
      comparisonModal.classList.add('active');
    });

    closeComparisonModal.addEventListener('click', () => {
      comparisonModal.classList.remove('active');
    });

    comparisonModal.addEventListener('click', (e) => {
      if (e.target === comparisonModal) {
        comparisonModal.classList.remove('active');
      }
    });
  }

  // 13. Interactive Capabilities Modal / Drawer
  const openCapModalBtn = document.getElementById('openCapabilitiesModal');
  if (openCapModalBtn && caseStudyModal && caseModalBody) {
    openCapModalBtn.addEventListener('click', () => {
      caseModalBody.innerHTML = `
        <div>
          <div class="section-tag">CAPABILITIES MATRIX</div>
          <h2 class="modal-title font-serif" style="margin-bottom: 12px;">Full Scope of Deliverables</h2>
          <p class="modal-sub">Everything we deliver across brand, design, engineering, and continuous growth.</p>
          
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 24px;">
            <div style="border: 1px solid var(--border-light); border-radius: 16px; padding: 24px;">
              <h3 style="font-size: 1.15rem; font-weight: 600; margin-bottom: 12px; color: var(--coral-500);">Brand & Identity</h3>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.92rem; color: var(--text-muted);">
                <li>✓ Visual Identity & Guidelines</li>
                <li>✓ Art Direction & Typography Systems</li>
                <li>✓ Motion Design & Brand Guidelines</li>
                <li>✓ Tone of Voice & Copy Direction</li>
              </ul>
            </div>

            <div style="border: 1px solid var(--border-light); border-radius: 16px; padding: 24px;">
              <h3 style="font-size: 1.15rem; font-weight: 600; margin-bottom: 12px; color: var(--coral-500);">Digital Product & Web</h3>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.92rem; color: var(--text-muted);">
                <li>✓ Responsive Web Design (Mobile to 4K)</li>
                <li>✓ Design Systems & Component Libraries</li>
                <li>✓ Custom Prototyping & User Testing</li>
                <li>✓ Micro-interactions & WebGL Canvas</li>
              </ul>
            </div>

            <div style="border: 1px solid var(--border-light); border-radius: 16px; padding: 24px;">
              <h3 style="font-size: 1.15rem; font-weight: 600; margin-bottom: 12px; color: var(--coral-500);">Engineering & Architecture</h3>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.92rem; color: var(--text-muted);">
                <li>✓ Headless CMS Integration (Sanity, Strapi)</li>
                <li>✓ High-Performance React / TypeScript / Vite</li>
                <li>✓ Custom Shopify Plus & Webflow Builds</li>
                <li>✓ Technical SEO & Core Web Vitals 95+</li>
              </ul>
            </div>

            <div style="border: 1px solid var(--border-light); border-radius: 16px; padding: 24px;">
              <h3 style="font-size: 1.15rem; font-weight: 600; margin-bottom: 12px; color: var(--coral-500);">Growth & Evolution</h3>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.92rem; color: var(--text-muted);">
                <li>✓ Conversion Rate Optimization (CRO)</li>
                <li>✓ A/B Split Testing & Analytics Dashboards</li>
                <li>✓ Monthly Sprint Retainers</li>
                <li>✓ Priority SLA & Continuous Upgrades</li>
              </ul>
            </div>
          </div>

          <div style="text-align: right; margin-top: 32px;">
            <a href="#contact" class="btn btn-dark" onclick="document.getElementById('caseStudyModal').classList.remove('active')">
              Discuss Your Scope →
            </a>
          </div>
        </div>
      `;
      caseStudyModal.classList.add('active');
    });
  }

  // 14. Interactive Process Deep Dive Modal
  const openProcessModal = document.getElementById('openProcessModal');
  if (openProcessModal && caseStudyModal && caseModalBody) {
    openProcessModal.addEventListener('click', () => {
      caseModalBody.innerHTML = `
        <div>
          <div class="section-tag">OUR METHODOLOGY</div>
          <h2 class="modal-title font-serif" style="margin-bottom: 12px;">The 4-Stage Studio Process</h2>
          <p class="modal-sub">How we partner with founders and marketing leaders from inception to world-class launch.</p>
          
          <div style="display: flex; flex-direction: column; gap: 20px; margin-top: 24px;">
            <div style="background-color: var(--bg-primary); border: 1px solid var(--border-light); border-radius: 16px; padding: 20px 24px;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                <span style="font-weight: 700; color: var(--coral-500);">01</span>
                <h3 style="font-size: 1.15rem; font-weight: 600;">Phase 1: Discovery & Strategy (Weeks 1–2)</h3>
              </div>
              <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.55;">
                Deep stakeholder interviews, competitor teardowns, audience architecture, and content audit. We produce a comprehensive Creative Blueprint and Technical Roadmap before touching visual design.
              </p>
            </div>

            <div style="background-color: var(--bg-primary); border: 1px solid var(--border-light); border-radius: 16px; padding: 20px 24px;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                <span style="font-weight: 700; color: var(--coral-500);">02</span>
                <h3 style="font-size: 1.15rem; font-weight: 600;">Phase 2: Art Direction & System Design (Weeks 3–5)</h3>
              </div>
              <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.55;">
                Typography curation, layout prototypes, bespoke motion choreography, and high-fidelity page designs. We test interactive prototypes with real stakeholders to validate clarity and conversion flow.
              </p>
            </div>

            <div style="background-color: var(--bg-primary); border: 1px solid var(--border-light); border-radius: 16px; padding: 20px 24px;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                <span style="font-weight: 700; color: var(--coral-500);">03</span>
                <h3 style="font-size: 1.15rem; font-weight: 600;">Phase 3: Precision Development (Weeks 6–9)</h3>
              </div>
              <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.55;">
                Clean, semantic, accessible frontend engineering with headless CMS integration. Rigorous multi-browser testing across mobile, tablet, and desktop with 95+ Google Lighthouse scores guaranteed.
              </p>
            </div>

            <div style="background-color: var(--bg-primary); border: 1px solid var(--border-light); border-radius: 16px; padding: 20px 24px;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                <span style="font-weight: 700; color: var(--coral-500);">04</span>
                <h3 style="font-size: 1.15rem; font-weight: 600;">Phase 4: Launch & Continual Optimization (Week 10+)</h3>
              </div>
              <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.55;">
                Domain cutover, DNS validation, 301 redirect mapping, CMS team training, and 90 days of performance monitoring. Clients can transition seamlessly to our monthly Growth sprints.
              </p>
            </div>
          </div>

          <div style="text-align: right; margin-top: 28px;">
            <a href="#contact" class="btn btn-dark" onclick="document.getElementById('caseStudyModal').classList.remove('active')">
              Kick Off Discovery →
            </a>
          </div>
        </div>
      `;
      caseStudyModal.classList.add('active');
    });
  }

  // 15. Orbital System Interaction
  const orbitalSystem = document.getElementById('orbitalSystem');
  if (orbitalSystem) {
    orbitalSystem.addEventListener('mouseenter', () => {
      const textSvg = orbitalSystem.querySelector('.orbit-text-svg');
      const ringOuter = orbitalSystem.querySelector('.ring-outer');
      if (textSvg) textSvg.style.animationDuration = '8s';
      if (ringOuter) ringOuter.style.animationDuration = '12s';
    });

    orbitalSystem.addEventListener('mouseleave', () => {
      const textSvg = orbitalSystem.querySelector('.orbit-text-svg');
      const ringOuter = orbitalSystem.querySelector('.ring-outer');
      if (textSvg) textSvg.style.animationDuration = '20s';
      if (ringOuter) ringOuter.style.animationDuration = '40s';
    });
  }
});
// 17. 3D Interactive Video-Style Service Carousel
function initServicesCarousel() {
  const wrapper = document.getElementById('servicesCarouselWrapper');
  const stage = document.getElementById('servicesCarouselStage');
  const cards = Array.from(document.querySelectorAll('.service-video-card'));
  const prevBtn = document.getElementById('servicePrevBtn');
  const nextBtn = document.getElementById('serviceNextBtn');
  const dotsContainer = document.getElementById('serviceCarouselDots');

  if (!wrapper || !stage || cards.length === 0) return;

  let activeIndex = 2; // Center on Website Design & Development by default
  const totalCards = cards.length;
  let autoRotationTimer = null;
  let isInteracting = false;

  // Generate Pagination Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    cards.forEach((card, idx) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Navigate to ${card.querySelector('.card-service-title')?.textContent || 'Service ' + (idx + 1)}`);
      dot.setAttribute('data-dot-index', idx);
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        activeIndex = idx;
        updateCarousel();
        pauseAutoRotation();
      });
      dotsContainer.appendChild(dot);
    });
  }

  // Core 3D Positioning & Depth Engine
  function updateCarousel() {
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;

    const activeCard = cards[activeIndex];
    const activeAccent = activeCard ? activeCard.getAttribute('data-accent') : '#E84D38';
    document.documentElement.style.setProperty('--active-dot-accent', activeAccent);

    cards.forEach((card, i) => {
      // Compute circular signed distance
      let diff = i - activeIndex;
      if (diff > totalCards / 2) diff -= totalCards;
      if (diff < -totalCards / 2) diff += totalCards;

      const isCenter = diff === 0;
      card.classList.toggle('is-center', isCenter);

      if (isCenter) {
        card.style.transform = isMobile
          ? 'translate3d(0, 0, 80px) scale(1) rotateY(0deg)'
          : 'translate3d(0, 0, 95px) scale(1) rotateY(0deg)';
        card.style.opacity = '1';
        card.style.zIndex = '25';
        card.style.pointerEvents = 'auto';
      } else {
        const sign = diff > 0 ? 1 : -1;
        const absDiff = Math.abs(diff);

        if (isMobile) {
          if (absDiff === 1) {
            const xPercent = isSmallMobile ? 74 : 80;
            card.style.transform = `translate3d(${sign * xPercent}%, 0, -25px) scale(0.85) rotateY(${-sign * 6}deg)`;
            card.style.opacity = '0.75';
            card.style.zIndex = '15';
            card.style.pointerEvents = 'auto';
          } else if (absDiff === 2) {
            const xPercent = isSmallMobile ? 140 : 150;
            card.style.transform = `translate3d(${sign * xPercent}%, 0, -65px) scale(0.70) rotateY(${-sign * 11}deg)`;
            card.style.opacity = '0.35';
            card.style.zIndex = '10';
            card.style.pointerEvents = 'auto';
          } else {
            card.style.transform = `translate3d(${sign * 200}%, 0, -110px) scale(0.55) rotateY(${-sign * 15}deg)`;
            card.style.opacity = '0';
            card.style.zIndex = '1';
            card.style.pointerEvents = 'none';
          }
        } else {
          // Desktop 3D Perspective Cascading
          if (absDiff === 1) {
            card.style.transform = `translate3d(calc(${sign} * (100% + 44px)), 0, 20px) scale(0.88) rotateY(${-sign * 6.5}deg)`;
            card.style.opacity = '0.85';
            card.style.zIndex = '18';
            card.style.pointerEvents = 'auto';
          } else if (absDiff === 2) {
            card.style.transform = `translate3d(calc(${sign} * (196% + 68px)), 0, -40px) scale(0.76) rotateY(${-sign * 10}deg)`;
            card.style.opacity = '0.65';
            card.style.zIndex = '14';
            card.style.pointerEvents = 'auto';
          } else if (absDiff === 3) {
            card.style.transform = `translate3d(calc(${sign} * (284% + 90px)), 0, -90px) scale(0.64) rotateY(${-sign * 14}deg)`;
            card.style.opacity = '0.40';
            card.style.zIndex = '10';
            card.style.pointerEvents = 'auto';
          } else if (absDiff === 4) {
            card.style.transform = `translate3d(calc(${sign} * (362% + 110px)), 0, -140px) scale(0.52) rotateY(${-sign * 17}deg)`;
            card.style.opacity = '0.20';
            card.style.zIndex = '6';
            card.style.pointerEvents = 'auto';
          } else {
            card.style.transform = `translate3d(calc(${sign} * (420% + 120px)), 0, -180px) scale(0.42) rotateY(${-sign * 20}deg)`;
            card.style.opacity = '0';
            card.style.zIndex = '1';
            card.style.pointerEvents = 'none';
          }
        }
      }
    });

    // Update Pagination Dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('is-active', idx === activeIndex);
      });
    }
  }

  // Hover Interaction: Hovering over any card instantly centers it
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      if (idx !== activeIndex) {
        activeIndex = idx;
        updateCarousel();
      }
      pauseAutoRotation();
    });

    card.addEventListener('click', (e) => {
      // If clicking a CTA link or button inside the card, allow default action
      if (e.target.closest('a') || e.target.closest('button')) return;
      const idx = parseInt(card.getAttribute('data-index'), 10);
      if (idx !== activeIndex) {
        activeIndex = idx;
        updateCarousel();
      }
    });
  });

  // Arrow Buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      activeIndex = (activeIndex - 1 + totalCards) % totalCards;
      updateCarousel();
      pauseAutoRotation();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      activeIndex = (activeIndex + 1) % totalCards;
      updateCarousel();
      pauseAutoRotation();
    });
  }

  // Auto-Rotation (Every 5.5s)
  function startAutoRotation() {
    stopAutoRotation();
    autoRotationTimer = setInterval(() => {
      if (!isInteracting) {
        activeIndex = (activeIndex + 1) % totalCards;
        updateCarousel();
      }
    }, 5500);
  }

  function stopAutoRotation() {
    if (autoRotationTimer) {
      clearInterval(autoRotationTimer);
      autoRotationTimer = null;
    }
  }

  function pauseAutoRotation() {
    isInteracting = true;
    stopAutoRotation();
  }

  function resumeAutoRotation() {
    isInteracting = false;
    startAutoRotation();
  }

  wrapper.addEventListener('mouseenter', pauseAutoRotation);
  wrapper.addEventListener('mouseleave', resumeAutoRotation);

  // Touch & Swipe Support
  let touchStartX = 0;
  let touchDeltaX = 0;

  wrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchDeltaX = 0;
    pauseAutoRotation();
  }, { passive: true });

  wrapper.addEventListener('touchmove', (e) => {
    touchDeltaX = e.touches[0].clientX - touchStartX;
  }, { passive: true });

  wrapper.addEventListener('touchend', () => {
    if (touchDeltaX < -45) {
      activeIndex = (activeIndex + 1) % totalCards;
      updateCarousel();
    } else if (touchDeltaX > 45) {
      activeIndex = (activeIndex - 1 + totalCards) % totalCards;
      updateCarousel();
    }
    setTimeout(resumeAutoRotation, 2800);
  });

  // Mouse Drag Support
  let isMouseDown = false;
  let mouseStartX = 0;

  wrapper.addEventListener('mousedown', (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return;
    isMouseDown = true;
    mouseStartX = e.clientX;
    pauseAutoRotation();
  });

  window.addEventListener('mouseup', (e) => {
    if (!isMouseDown) return;
    isMouseDown = false;
    const deltaX = e.clientX - mouseStartX;
    if (deltaX < -50) {
      activeIndex = (activeIndex + 1) % totalCards;
      updateCarousel();
    } else if (deltaX > 50) {
      activeIndex = (activeIndex - 1 + totalCards) % totalCards;
      updateCarousel();
    }
    setTimeout(resumeAutoRotation, 2800);
  });

  // Keyboard navigation
  wrapper.setAttribute('tabindex', '0');
  wrapper.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      activeIndex = (activeIndex - 1 + totalCards) % totalCards;
      updateCarousel();
    } else if (e.key === 'ArrowRight') {
      activeIndex = (activeIndex + 1) % totalCards;
      updateCarousel();
    }
  });

  // Resize listener
  window.addEventListener('resize', () => {
    updateCarousel();
  });

  // Initial Render & Start Auto-Rotation
  updateCarousel();
  startAutoRotation();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initServicesCarousel);
} else {
  initServicesCarousel();
}

