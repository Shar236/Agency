/**
 * AURA / STUDIO — Premier Digital Agency & Growth Partner
 * Comprehensive Interactive Engine, 3D Canvas, Micro-interactions & Calculator
 */

import { initGlobe3D } from './components/Globe3D.js';
import { initHeroArtifact3D } from './components/HeroArtifact3D.js';
import { initTilt3D } from './components/Tilt3D.js';

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. DYNAMIC FOOTER YEAR & REAL-TIME STUDIO CLOCK (FARIDABAD / IST)
  // =========================================================================
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const clockEl = document.getElementById('studioLocalTime');
  const clockContactEl = document.getElementById('studioLocalTimeContact');
  if (clockEl || clockContactEl) {
    const updateStudioClock = () => {
      const now = new Date();
      // Formatted in Indian Standard Time (IST / UTC+5:30)
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const timeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
      if (clockEl) clockEl.textContent = `${timeStr} IST`;
      if (clockContactEl) clockContactEl.textContent = `${timeStr} IST (Online)`;
    };
    updateStudioClock();
    setInterval(updateStudioClock, 1000);
  }

  // =========================================================================
  // 2. SCROLL PROGRESS BAR & HEADER SCROLLSPY (ZERO LAYOUT THRASHING)
  // =========================================================================
  const scrollProgressBar = document.getElementById('scrollProgress');
  const siteHeader = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  let sectionOffsets = [];
  function cacheSectionOffsets() {
    sectionOffsets = Array.from(sections).map(sec => ({
      id: sec.getAttribute('id'),
      top: sec.offsetTop,
      bottom: sec.offsetTop + sec.offsetHeight
    }));
  }
  cacheSectionOffsets();
  window.addEventListener('resize', cacheSectionOffsets, { passive: true });

  let isHeaderScrolled = false;
  let activeSectionId = '';
  let scrollTicking = false;

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Top progress bar update
        if (scrollProgressBar && docHeight > 0) {
          const progressPercent = (scrollTop / docHeight) * 100;
          scrollProgressBar.style.width = `${progressPercent}%`;
        }

        // Header elevation blur toggle (only mutate class when state changes)
        if (siteHeader) {
          const shouldScroll = scrollTop > 40;
          if (shouldScroll !== isHeaderScrolled) {
            isHeaderScrolled = shouldScroll;
            siteHeader.classList.toggle('scrolled', shouldScroll);
          }
        }

        // ScrollSpy active link tracking only for hash links
        const scrollOffset = scrollTop + 160;
        let foundSection = '';
        for (let i = 0; i < sectionOffsets.length; i++) {
          const s = sectionOffsets[i];
          if (scrollOffset >= s.top && scrollOffset < s.bottom) {
            foundSection = s.id;
            break;
          }
        }

        if (foundSection && foundSection !== activeSectionId) {
          activeSectionId = foundSection;
          navLinks.forEach(link => {
            const href = link.getAttribute('href') || '';
            if (href.startsWith('#')) {
              link.classList.toggle('active', href.replace('#', '') === activeSectionId);
            }
          });
        }

        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // =========================================================================
  // 3. MOUSE SPOTLIGHT GLOW ON BENTO CARDS (CACHED RECT + RAF THROTTLE)
  // =========================================================================
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach(card => {
    let cardRect = null;
    let cardRaf = null;

    card.addEventListener('mouseenter', () => {
      cardRect = card.getBoundingClientRect();
    }, { passive: true });

    card.addEventListener('mousemove', (e) => {
      if (!cardRect) cardRect = card.getBoundingClientRect();
      if (!cardRaf) {
        cardRaf = requestAnimationFrame(() => {
          const x = e.clientX - cardRect.left;
          const y = e.clientY - cardRect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
          cardRaf = null;
        });
      }
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      cardRect = null;
      if (cardRaf) {
        cancelAnimationFrame(cardRaf);
        cardRaf = null;
      }
    }, { passive: true });
  });

  // =========================================================================
  // 5. MOBILE DRAWER NAVIGATION
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // =========================================================================
  // 6. HERO TECH 3D ENGINE INITIALIZED IN ORIGINKIT
  // =========================================================================

  // =========================================================================
  // 7. METRICS COUNT-UP ANIMATION
  // =========================================================================
  const metricValues = document.querySelectorAll('.metric-value');
  let metricsAnimated = false;

  const animateMetrics = () => {
    metricValues.forEach(el => {
      const target = parseFloat(el.getAttribute('data-target'));
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1800;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
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
        if (entry.isIntersecting && !metricsAnimated) {
          metricsAnimated = true;
          animateMetrics();
        }
      });
    }, { threshold: 0.15 });

    observer.observe(trustSection);
  }

  // =========================================================================
  // 8. INTERACTIVE PROJECT SCOPE & BUDGET CALCULATOR
  // =========================================================================
  const deliverableChips = document.querySelectorAll('#calcDeliverableGroup .calc-chip');
  const addonChecks = document.querySelectorAll('.calc-addon-check');
  const speedChips = document.querySelectorAll('#calcSpeedGroup .calc-chip');
  const calcTotalDisplay = document.getElementById('calcTotalDisplay');
  const calcTimelineDisplay = document.getElementById('calcTimelineDisplay');
  const calcBreakdownList = document.getElementById('calcBreakdownList');
  const calcBookBtn = document.getElementById('calcBookBtn');
  const projectTypeSelect = document.getElementById('formProjectType');

  function updateCalculator() {
    // 1. Base Deliverable
    let baseCost = 7500;
    let baseWeeks = 4;
    let selectedDeliverableName = 'Custom Website (4-6 Pages)';

    deliverableChips.forEach(chip => {
      if (chip.classList.contains('active')) {
        baseCost = parseInt(chip.getAttribute('data-cost'), 10);
        baseWeeks = parseInt(chip.getAttribute('data-weeks'), 10);
        selectedDeliverableName = chip.getAttribute('data-name');
      }
    });

    // 2. Add-ons
    let addonsCost = 0;
    let addonsWeeks = 0;
    const includedItems = [`✓ ${selectedDeliverableName}`];

    addonChecks.forEach(check => {
      if (check.checked) {
        addonsCost += parseInt(check.value, 10);
        addonsWeeks += parseInt(check.getAttribute('data-addon-weeks') || '1', 10);
        includedItems.push(`✓ ${check.getAttribute('data-addon-name')}`);
      }
    });

    includedItems.push('✓ Mobile Responsive 60 FPS Polish');
    includedItems.push('✓ Analytics & Conversion Tracking');

    // 3. Speed Multiplier
    let speedMult = 1.0;
    let isExpedited = false;
    speedChips.forEach(chip => {
      if (chip.classList.contains('active')) {
        speedMult = parseFloat(chip.getAttribute('data-speed-mult'));
        if (speedMult > 1.0) isExpedited = true;
      }
    });

    // Calculations
    const subtotal = (baseCost + addonsCost) * speedMult;
    const lowRange = Math.round(subtotal * 0.95);
    const highRange = Math.round(subtotal * 1.15);

    let totalWeeks = Math.max(3, Math.round((baseWeeks + addonsWeeks) * (isExpedited ? 0.7 : 1.0)));
    const timelineStr = isExpedited 
      ? `Timeline: Fast-Track ${totalWeeks} Weeks`
      : `Timeline: Approx. ${totalWeeks}–${totalWeeks + 2} Weeks`;

    if (calcTotalDisplay) {
      calcTotalDisplay.textContent = `$${lowRange.toLocaleString()} – $${highRange.toLocaleString()}`;
    }

    if (calcTimelineDisplay) {
      calcTimelineDisplay.textContent = timelineStr;
    }

    if (calcBreakdownList) {
      calcBreakdownList.innerHTML = includedItems.map(item => `<li>${item}</li>`).join('');
    }

    // Set data attribute on Lock In button
    if (calcBookBtn) {
      calcBookBtn.setAttribute('data-scope-summary', `${selectedDeliverableName} + ${addonChecks.length} add-ons (~$${lowRange.toLocaleString()})`);
    }
  }

  // Deliverable chip toggle
  deliverableChips.forEach(chip => {
    chip.addEventListener('click', () => {
      deliverableChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      updateCalculator();
    });
  });

  // Add-on checkboxes
  addonChecks.forEach(check => {
    check.addEventListener('change', updateCalculator);
  });

  // Speed chips
  speedChips.forEach(chip => {
    chip.addEventListener('click', () => {
      speedChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      updateCalculator();
    });
  });

  // Initial calculation
  updateCalculator();

  // "Lock In This Scope" connects directly to form
  if (calcBookBtn && projectTypeSelect) {
    calcBookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      projectTypeSelect.value = 'Custom Project Scope';
      const formEl = document.getElementById('contact');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
        // Flash contact form gently
        const wrapper = formEl.querySelector('.contact-form-wrapper');
        if (wrapper) {
          wrapper.style.borderColor = 'var(--coral-500)';
          setTimeout(() => {
            wrapper.style.borderColor = '';
          }, 2000);
        }
      }
    });
  }

  // =========================================================================
  // 9. BUSINESS STAGE SELECTOR INTERACTION
  // =========================================================================
  const stageCards = document.querySelectorAll('.stage-selector-card');
  const stageCtaButtons = document.querySelectorAll('.stage-cta-btn');

  stageCards.forEach(card => {
    card.addEventListener('click', () => {
      stageCards.forEach(c => c.classList.remove('active-stage'));
      card.classList.add('active-stage');
      
      const stage = card.getAttribute('data-stage');
      if (projectTypeSelect) {
        if (stage === 'idea') projectTypeSelect.value = 'Start From Zero';
        else if (stage === 'business') projectTypeSelect.value = 'Grow My Business';
        else if (stage === 'broken') projectTypeSelect.value = 'Improve My Website';
        else if (stage === 'customers') projectTypeSelect.value = 'Get More Customers';
      }
    });
  });

  stageCtaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const preset = btn.getAttribute('data-preset');
      if (preset && projectTypeSelect) {
        projectTypeSelect.value = preset;
      }
    });
  });

  // =========================================================================
  // 10. FAQ ACCORDION INTERACTION
  // =========================================================================
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

  // =========================================================================
  // 11. BUDGET CHIPS & INQUIRY FORM SUBMISSION
  // =========================================================================
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

  // Plan Selection Quick Fill from Pricing Cards
  const selectPlanButtons = document.querySelectorAll('.select-plan-btn');
  selectPlanButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan');
      if (projectTypeSelect) {
        if (plan === 'Foundation') projectTypeSelect.value = 'Foundation Package';
        else if (plan === 'Signature Growth') projectTypeSelect.value = 'Signature Growth Package';
        else if (plan === 'Growth Partner') projectTypeSelect.value = 'Growth Partner Retainer';
      }
    });
  });

  // Contact Form Submission Handler
  const form = document.getElementById('projectInquiryForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitFormBtn');

  if (form && formStatus && submitBtn) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const origText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Transmitting inquiry...</span>`;

      // Simulated instant async transmission
      setTimeout(() => {
        formStatus.className = 'form-status success';
        formStatus.textContent = '✦ Thank you! Your project brief has been received. Our agency founders will review your goals and reply within 12-24 hours with a tailored roadmap.';
        formStatus.style.display = 'block';

        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;

        // Reset default budget chip
        budgetChips.forEach(c => c.classList.remove('active'));
        if (budgetChips[1]) budgetChips[1].classList.add('active');

        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 10000);
      }, 900);
    });
  }

  // =========================================================================
  // 12. CASE STUDY DETAILS MODAL
  // =========================================================================
  const caseStudiesData = {
    northline: {
      title: 'Northline Living',
      tag: 'Brand + Digital Flagship',
      year: '2026',
      heroImg: './images/project-1.jpg',
      headline: 'Spaces that feel like home.',
      challenge: 'Northline needed to transcend sterile luxury real estate tropes, transforming an architectural portfolio into an intimate, high-converting digital discovery experience.',
      solution: 'We engineered an editorial digital design system paired with interactive 3D floorplan viewports, high-speed mobile navigation, and seamless WhatsApp booking triggers.',
      metrics: [
        { label: 'Qualified Inquiries', val: '+68%' },
        { label: 'Avg Session Duration', val: '4m 12s' },
        { label: 'Lighthouse PageSpeed', val: '99/100' }
      ],
      stack: ['React 19', 'Next.js 15', 'Three.js', 'Tailwind', 'Sanity CMS']
    },
    forma: {
      title: 'Forma Journal',
      tag: 'Editorial Platform + Subscriptions',
      year: '2026',
      heroImg: './images/project-2.jpg',
      headline: 'Culture, collected daily.',
      challenge: 'Forma sought to modernize their editorial archive with a digital publication that bridges the tactile elegance of print monographs with instant sub-second search.',
      solution: 'Designed an adaptive modular grid system with custom typography hierarchies, instant micro-transitions, and custom subscription checkout funnels.',
      metrics: [
        { label: 'Reader Depth', val: '2.4×' },
        { label: 'Page Load Speed', val: '0.4s' },
        { label: 'Subscriber Growth', val: '+142%' }
      ],
      stack: ['Next.js', 'TypeScript', 'Tailwind', 'Stripe Subscriptions', 'Algolia']
    },
    'common-ground': {
      title: 'Common Ground',
      tag: 'Strategy + E-Commerce',
      year: '2025',
      heroImg: './images/project-3.jpg',
      headline: 'Good work starts together.',
      challenge: 'Transforming membership onboarding from a friction-filled inquiry form into a self-guided booking journey with flexible tier selection.',
      solution: 'Implemented frictionless booking and pass purchase flows, visual floor scheduling, and dynamic audience retargeting on Meta & Google Ads.',
      metrics: [
        { label: 'Faster Sign-up', val: '41%' },
        { label: 'Membership Conversions', val: '+88%' },
        { label: 'Mobile Checkout Rate', val: '74%' }
      ],
      stack: ['Shopify Plus', 'React', 'Tailwind', 'Meta Ads CAPI', 'Stripe']
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
        <h2 class="modal-title font-serif" style="margin-bottom: 12px;">${data.title}</h2>
        <h3 style="font-size: 1.25rem; font-weight: 500; margin-bottom: 24px; color: var(--text-body);">${data.headline}</h3>

        <div style="border-radius: 16px; overflow: hidden; margin-bottom: 28px; max-height: 380px; border: 1px solid var(--border-glass);">
          <img src="${data.heroImg}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px;">
          <div>
            <h4 style="font-size: 0.8rem; font-weight: 700; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 8px;">THE CHALLENGE</h4>
            <p style="font-size: 0.94rem; line-height: 1.6; color: var(--text-body);">${data.challenge}</p>
          </div>
          <div>
            <h4 style="font-size: 0.8rem; font-weight: 700; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 8px;">OUR STRATEGY & CODE</h4>
            <p style="font-size: 0.94rem; line-height: 1.6; color: var(--text-body);">${data.solution}</p>
          </div>
        </div>

        <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid var(--border-glass); border-radius: 16px; padding: 22px; margin-bottom: 28px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
          ${data.metrics.map(m => `
            <div>
              <div style="font-family: var(--font-serif); font-size: 2.2rem; color: var(--coral-500); line-height: 1; margin-bottom: 4px;">${m.val}</div>
              <div style="font-size: 0.8rem; color: var(--text-body);">${m.label}</div>
            </div>
          `).join('')}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 24px; flex-wrap: wrap; gap: 14px;">
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${data.stack.map(s => `<span class="glass-chip" style="font-size: 0.78rem; font-weight: 600; padding: 4px 12px;">${s}</span>`).join('')}
          </div>
          <a href="#contact" class="btn btn-primary" onclick="document.getElementById('caseStudyModal').classList.remove('active')">
            <span>Start a Similar Project</span>
            <span class="arrow">→</span>
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

  // =========================================================================
  // 13. COMPARISON & CAPABILITIES MODALS
  // =========================================================================
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

  // Open Capabilities Modal
  const openCapModalBtn = document.getElementById('openCapabilitiesModal');
  if (openCapModalBtn && caseStudyModal && caseModalBody) {
    openCapModalBtn.addEventListener('click', () => {
      caseModalBody.innerHTML = `
        <div>
          <div class="section-tag">AGENCY CAPABILITIES</div>
          <h2 class="modal-title font-serif" style="margin-bottom: 12px;">Complete Deliverables Scope</h2>
          <p class="modal-sub">Everything we engineer across brand strategy, code architecture, ads, and continuous growth.</p>
          
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 24px;">
            <div class="glass-card" style="padding: 22px;">
              <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 12px; color: var(--coral-500);">Brand & Visual Identity</h3>
              <ul class="bullet-list" style="margin-bottom: 0;">
                <li>Full Visual Identity & Vector Logo Kits</li>
                <li>Typography & Color Design Systems</li>
                <li>Social Media Templates & Banner Suite</li>
                <li>Digital Brand Guidelines & Motion Specs</li>
              </ul>
            </div>

            <div class="glass-card" style="padding: 22px;">
              <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 12px; color: var(--violet-400);">Web Engineering</h3>
              <ul class="bullet-list" style="margin-bottom: 0;">
                <li>Custom React 19, Next.js 15 & Vite Flagships</li>
                <li>Shopify Plus & Headless CMS Architecture</li>
                <li>Sub-second Global CDN Hosting with SSL</li>
                <li>Core Web Vitals 95+ Guarantee</li>
              </ul>
            </div>

            <div class="glass-card" style="padding: 22px;">
              <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 12px; color: var(--cyan-400);">Search & AI Dominance</h3>
              <ul class="bullet-list" style="margin-bottom: 0;">
                <li>Technical On-Page & Schema JSON-LD</li>
                <li>Local Google Maps 3-Pack Domination</li>
                <li>GEO / AEO ChatGPT & Perplexity Citations</li>
                <li>Content Strategy & Commercial Keywords</li>
              </ul>
            </div>

            <div class="glass-card" style="padding: 22px;">
              <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 12px; color: var(--emerald-live);">Paid Ads & Continuous Scale</h3>
              <ul class="bullet-list" style="margin-bottom: 0;">
                <li>Meta & Google Ads Full-Funnel Management</li>
                <li>Meta CAPI Server-Side Tracking</li>
                <li>Conversion Rate Optimization (CRO) A/B Tests</li>
                <li>Weekly Bid Optimization & ROI Reports</li>
              </ul>
            </div>
          </div>

          <div style="text-align: right; margin-top: 28px;">
            <a href="#contact" class="btn btn-primary" onclick="document.getElementById('caseStudyModal').classList.remove('active')">
              <span>Discuss Your Scope</span>
              <span class="arrow">→</span>
            </a>
          </div>
        </div>
      `;
      caseStudyModal.classList.add('active');
    });
  }

  // Open Process Modal
  const openProcessModal = document.getElementById('openProcessModal');
  if (openProcessModal && caseStudyModal && caseModalBody) {
    openProcessModal.addEventListener('click', () => {
      caseModalBody.innerHTML = `
        <div>
          <div class="section-tag">STUDIO BLUEPRINT</div>
          <h2 class="modal-title font-serif" style="margin-bottom: 12px;">Our 4-Stage Sprint Methodology</h2>
          <p class="modal-sub">How we partner with founders and marketing directors from initial strategy to scale.</p>
          
          <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 24px;">
            <div class="glass-card" style="padding: 20px 24px;">
              <h3 style="font-size: 1.15rem; font-weight: 700; color: #FFFFFF; margin-bottom: 6px;">Phase 1: Discovery & Creative Blueprint (Weeks 1–2)</h3>
              <p style="font-size: 0.92rem; color: var(--text-body); line-height: 1.55;">
                Deep stakeholder alignment, competitor audit, customer avatar mapping, domain routing, and technical feasibility scoping.
              </p>
            </div>
            <div class="glass-card" style="padding: 20px 24px;">
              <h3 style="font-size: 1.15rem; font-weight: 700; color: #FFFFFF; margin-bottom: 6px;">Phase 2: Visual Identity & UI Prototyping (Weeks 3–5)</h3>
              <p style="font-size: 0.92rem; color: var(--text-body); line-height: 1.55;">
                Bespoke design systems, typography hierarchy, high-fidelity responsive layouts, and interactive prototype validation.
              </p>
            </div>
            <div class="glass-card" style="padding: 20px 24px;">
              <h3 style="font-size: 1.15rem; font-weight: 700; color: #FFFFFF; margin-bottom: 6px;">Phase 3: Precision Frontend & SEO Engineering (Weeks 6–9)</h3>
              <p style="font-size: 0.92rem; color: var(--text-body); line-height: 1.55;">
                Clean, semantic, accessible code with headless CMS integration, server-side tracking, and 95+ PageSpeed guarantees.
              </p>
            </div>
            <div class="glass-card" style="padding: 20px 24px;">
              <h3 style="font-size: 1.15rem; font-weight: 700; color: #FFFFFF; margin-bottom: 6px;">Phase 4: Launch Cutover & Paid Acquisition Scale (Week 10+)</h3>
              <p style="font-size: 0.92rem; color: var(--text-body); line-height: 1.55;">
                DNS cutover, Meta/Google ads launch, continuous conversion tracking, and transition into monthly growth sprints.
              </p>
            </div>
          </div>

          <div style="text-align: right; margin-top: 28px;">
            <a href="#contact" class="btn btn-primary" onclick="document.getElementById('caseStudyModal').classList.remove('active')">
              <span>Kick Off Discovery</span>
              <span class="arrow">→</span>
            </a>
          </div>
        </div>
      `;
      caseStudyModal.classList.add('active');
    });
  }

  // Escape key closes modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (caseStudyModal) caseStudyModal.classList.remove('active');
      if (comparisonModal) comparisonModal.classList.remove('active');
    }
  });

  // Back to Top Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// =========================================================================
// 14. 3D INTERACTIVE SERVICES CAROUSEL ENGINE (13 DISCIPLINES)
// =========================================================================
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

  // Generate Interactive Pagination Dots
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

  // Core 3D Positioning Math
  function updateCarousel() {
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;

    const activeCard = cards[activeIndex];
    const activeAccent = activeCard ? activeCard.getAttribute('data-accent') : '#E84D38';
    document.documentElement.style.setProperty('--active-dot-accent', activeAccent);

    cards.forEach((card, i) => {
      let diff = i - activeIndex;
      if (diff > totalCards / 2) diff -= totalCards;
      if (diff < -totalCards / 2) diff += totalCards;

      const isCenter = diff === 0;
      card.classList.toggle('is-center', isCenter);

      if (isCenter) {
        card.style.transform = isMobile
          ? 'translate3d(0, 0, 80px) scale(1) rotateY(0deg)'
          : 'translate3d(0, 0, 100px) scale(1) rotateY(0deg)';
        card.style.opacity = '1';
        card.style.visibility = 'visible';
        card.style.zIndex = '30';
        card.style.pointerEvents = 'auto';
      } else {
        const sign = diff > 0 ? 1 : -1;
        const absDiff = Math.abs(diff);

        if (isMobile) {
          if (absDiff === 1) {
            const xPercent = isSmallMobile ? 74 : 80;
            card.style.transform = `translate3d(${sign * xPercent}%, 0, -25px) scale(0.85) rotateY(${-sign * 6}deg)`;
            card.style.opacity = '0.75';
            card.style.visibility = 'visible';
            card.style.zIndex = '15';
            card.style.pointerEvents = 'auto';
          } else if (absDiff === 2) {
            const xPercent = isSmallMobile ? 140 : 150;
            card.style.transform = `translate3d(${sign * xPercent}%, 0, -65px) scale(0.70) rotateY(${-sign * 11}deg)`;
            card.style.opacity = '0.35';
            card.style.visibility = 'visible';
            card.style.zIndex = '10';
            card.style.pointerEvents = 'auto';
          } else {
            card.style.transform = `translate3d(${sign * 200}%, 0, -110px) scale(0.55) rotateY(${-sign * 15}deg)`;
            card.style.opacity = '0';
            card.style.visibility = 'hidden';
            card.style.zIndex = '1';
            card.style.pointerEvents = 'none';
          }
        } else {
          // Desktop 3D Cascading
          if (absDiff === 1) {
            card.style.transform = `translate3d(calc(${sign} * (100% + 44px)), 0, 20px) scale(0.88) rotateY(${-sign * 6.5}deg)`;
            card.style.opacity = '0.85';
            card.style.visibility = 'visible';
            card.style.zIndex = '18';
            card.style.pointerEvents = 'auto';
          } else if (absDiff === 2) {
            card.style.transform = `translate3d(calc(${sign} * (196% + 68px)), 0, -40px) scale(0.76) rotateY(${-sign * 10}deg)`;
            card.style.opacity = '0.65';
            card.style.visibility = 'visible';
            card.style.zIndex = '14';
            card.style.pointerEvents = 'auto';
          } else if (absDiff === 3) {
            card.style.transform = `translate3d(calc(${sign} * (284% + 90px)), 0, -90px) scale(0.64) rotateY(${-sign * 14}deg)`;
            card.style.opacity = '0.40';
            card.style.visibility = 'visible';
            card.style.zIndex = '10';
            card.style.pointerEvents = 'auto';
          } else if (absDiff === 4) {
            card.style.transform = `translate3d(calc(${sign} * (362% + 110px)), 0, -140px) scale(0.52) rotateY(${-sign * 17}deg)`;
            card.style.opacity = '0.20';
            card.style.visibility = 'visible';
            card.style.zIndex = '6';
            card.style.pointerEvents = 'auto';
          } else {
            card.style.transform = `translate3d(calc(${sign} * (420% + 120px)), 0, -180px) scale(0.42) rotateY(${-sign * 20}deg)`;
            card.style.opacity = '0';
            card.style.visibility = 'hidden';
            card.style.zIndex = '1';
            card.style.pointerEvents = 'none';
          }
        }
      }
    });

    // Update Dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('is-active', idx === activeIndex);
      });
    }
  }

  // Hover on card centers it
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
      if (e.target.closest('a') || e.target.closest('button')) return;
      const idx = parseInt(card.getAttribute('data-index'), 10);
      if (idx !== activeIndex) {
        activeIndex = idx;
        updateCarousel();
      }
    });
  });

  // Prev / Next Buttons
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

  // Touch Swipe
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

  window.addEventListener('resize', () => {
    updateCarousel();
  });

  updateCarousel();
  
  // Pause auto-rotation when off-screen to save CPU & GPU cycles
  if ('IntersectionObserver' in window && wrapper) {
    const carouselSectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          resumeAutoRotation();
        } else {
          pauseAutoRotation();
        }
      });
    }, { threshold: 0.15 });
    carouselSectionObserver.observe(wrapper);
  } else {
    startAutoRotation();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initServicesCarousel);
} else {
  initServicesCarousel();
}

// =========================================================================
// ORIGINKIT 3D INTERACTIVE COMPONENTS INITIALIZATION
// =========================================================================
function initOriginKit3D() {
  try {
    initHeroArtifact3D();
  } catch (err) {
    console.error('HeroArtifact3D initialization failed:', err);
  }

  try {
    initGlobe3D();
  } catch (err) {
    console.error('Globe3D initialization failed:', err);
  }

  try {
    initTilt3D();
  } catch (err) {
    console.error('Tilt3D initialization failed:', err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initOriginKit3D);
} else {
  initOriginKit3D();
}

