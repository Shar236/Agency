import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export const WHEEL_SERVICES = [
  {
    id: 'web-engineering',
    category: 'TECH',
    title: 'Bespoke Web & App Engineering',
    shortTitle: 'Bespoke Web',
    tagline: 'React & Next.js flagships with 99+ PageSpeed, 3D WebGL craft, and sub-second load times.',
    accent: '#38BDF8',
    icon: '💻',
    pills: ['React & Next.js', 'WebGL 3D', '99+ PageSpeed'],
    metric: '< 0.4s FCP',
    link: '/services#web'
  },
  {
    id: 'mern-cloud',
    category: 'TECH',
    title: 'MERN SaaS & Cloud Systems',
    shortTitle: 'MERN SaaS',
    tagline: 'Mission-critical Node.js, Express & MongoDB backend architectures with zero-latency APIs.',
    accent: '#818CF8',
    icon: '🛠️',
    pills: ['Node.js & MongoDB', 'REST / GraphQL', '99.99% Uptime'],
    metric: '99.99% SLA',
    link: '/services#web'
  },
  {
    id: 'seo-dominance',
    category: 'SEO',
    title: 'Google SEO Ranking Dominance',
    shortTitle: 'Google SEO',
    tagline: 'Technical site audits, JSON-LD schema, and keyword topical authority to capture #1 rankings.',
    accent: '#34D399',
    icon: '🔍',
    pills: ['Technical SEO', 'Schema Markup', '#1 Rankings'],
    metric: '#1 Rank Goal',
    link: '/services#seo'
  },
  {
    id: 'meta-ads',
    category: 'ADS',
    title: 'Meta & Instagram Ads Engine',
    shortTitle: 'Meta Ads',
    tagline: 'High-converting motion creatives and server-side Meta CAPI tracking for high-ROAS scaling.',
    accent: '#FB923C',
    icon: '🎯',
    pills: ['Meta CAPI Tracking', 'Motion Creatives', 'ROAS Sprints'],
    metric: '4.8× Avg. ROAS',
    link: '/services#ads'
  },
  {
    id: 'google-ads',
    category: 'ADS',
    title: 'Google Ads & Performance Max',
    shortTitle: 'Google Ads',
    tagline: 'Commercial intent search campaigns and negative keyword pruning with zero wasted ad spend.',
    accent: '#F472B6',
    icon: '📈',
    pills: ['PMax Campaigns', 'Intent Keywords', 'Landing Page CRO'],
    metric: '-38% Lead Cost',
    link: '/services#ads'
  },
  {
    id: 'ecommerce',
    category: 'COMMERCE',
    title: 'Headless E-Commerce & CMS',
    shortTitle: 'E-Commerce',
    tagline: 'Shopify Plus & headless Sanity builds with frictionless 1-click checkout conversion.',
    accent: '#C084FC',
    icon: '🛍️',
    pills: ['Shopify Plus', 'Headless Sanity', '1-Click Checkout'],
    metric: '+42% Cart Lift',
    link: '/services#web'
  },
  {
    id: 'brand-design',
    category: 'DESIGN',
    title: 'Brand Identity & Design Systems',
    shortTitle: 'Brand Design',
    tagline: 'Distinctive typographic hierarchy, iconic vector logo suites, and comprehensive brand books.',
    accent: '#E879F9',
    icon: '🎨',
    pills: ['Vector Logo Suites', 'Typography Science', '100% Bespoke'],
    metric: 'Iconic Craft',
    link: '/services#brand'
  },
  {
    id: 'ai-automations',
    category: 'AI',
    title: 'AI Sales Automations & WhatsApp',
    shortTitle: 'AI Sales',
    tagline: 'Intelligent conversational agents, automated lead qualification, and CRM synchronization.',
    accent: '#06B6D4',
    icon: '🤖',
    pills: ['AI WhatsApp Bots', 'CRM Auto-Sync', '2-Min SLA'],
    metric: '24/7 Inbound',
    link: '/services'
  }
];

export default function ServicesWheel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [angle, setAngle] = useState(0);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const getResponsiveRadii = () => {
    if (typeof window === 'undefined') return { rx: 315, ry: 315 };
    const w = window.innerWidth;
    if (w < 480) {
      // Mobile screen: vertical ellipse to fit screen width and clear central card with ample margin
      const rx = Math.min(138, Math.max(115, Math.floor((w - 96) / 2)));
      const ry = 220;
      return { rx, ry };
    }
    if (w < 768) {
      const rx = Math.min(180, Math.floor((w - 90) / 2));
      const ry = 240;
      return { rx, ry };
    }
    if (w < 1024) {
      return { rx: 270, ry: 270 };
    }
    return { rx: 315, ry: 315 };
  };

  const [radii, setRadii] = useState(getResponsiveRadii);
  
  const sectionRef = useRef(null);
  const isVisibleRef = useRef(true);
  const angleRef = useRef(0);
  const autoSpinRef = useRef(true);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const tweenRef = useRef(null);
  const dragStartAngleRef = useRef(0);
  const dragStartMouseAngleRef = useRef(0);

  const numItems = WHEEL_SERVICES.length;

  useEffect(() => {
    angleRef.current = angle;
  }, [angle]);

  useEffect(() => {
    autoSpinRef.current = isAutoSpin;
  }, [isAutoSpin]);

  // Responsive orbit dimensions adjustment
  useEffect(() => {
    const handleResize = () => {
      setRadii(getResponsiveRadii());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // IntersectionObserver to pause auto-rotation when off-screen (0% CPU/GPU overhead when reading other sections)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Subtle continuous orbital auto-rotation when visible and not hovering or dragging
  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const loop = (time) => {
      animId = requestAnimationFrame(loop);
      const dt = (time - lastTime) * 0.001;
      lastTime = time;

      if (isVisibleRef.current && autoSpinRef.current && !isDraggingRef.current && !tweenRef.current && !isHoveredRef.current) {
        setAngle((prev) => (prev + dt * 10) % 360);
      }
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Smooth ease-out animation to target angle
  const animateToAngle = (targetAngle) => {
    if (tweenRef.current) cancelAnimationFrame(tweenRef.current);
    const startAngle = angleRef.current;
    let diff = (targetAngle - startAngle) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    const finalAngle = startAngle + diff;
    const duration = 520; // ms
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = startAngle + diff * ease;
      setAngle(current);

      if (progress < 1) {
        tweenRef.current = requestAnimationFrame(step);
      } else {
        tweenRef.current = null;
        setAngle(finalAngle % 360);
      }
    };

    tweenRef.current = requestAnimationFrame(step);
  };

  // When activeIdx changes manually, smoothly glide wheel to place that node at the top (-90deg)
  const selectService = (idx) => {
    setActiveIdx(idx);
    setIsAutoSpin(false);

    // Position node idx at the top (-90 degrees)
    const targetNodeAngle = idx * (360 / numItems);
    const desiredWheelAngle = -90 - targetNodeAngle;
    animateToAngle(desiredWheelAngle);
  };

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % numItems;
    selectService(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIdx - 1 + numItems) % numItems;
    selectService(prevIdx);
  };

  const activeService = WHEEL_SERVICES[activeIdx];

  // Mouse & Touch drag to rotate wheel
  const getPointerAngle = (clientX, clientY, stageEl) => {
    const rect = stageEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('.wheel-center-hub') || e.target.closest('.wheel-controls-row')) return;
    const stage = e.currentTarget;
    isDraggingRef.current = true;
    dragStartMouseAngleRef.current = getPointerAngle(e.clientX, e.clientY, stage);
    dragStartAngleRef.current = angle;
    setIsAutoSpin(false);

    const onMouseMove = (moveEvent) => {
      if (!isDraggingRef.current) return;
      const currentMouseAngle = getPointerAngle(moveEvent.clientX, moveEvent.clientY, stage);
      const delta = currentMouseAngle - dragStartMouseAngleRef.current;
      setAngle(dragStartAngleRef.current + delta);
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleTouchStart = (e) => {
    if (e.target.closest('.wheel-center-hub') || e.target.closest('.wheel-controls-row')) return;
    if (e.touches.length !== 1) return;
    const stage = e.currentTarget;
    isDraggingRef.current = true;
    dragStartMouseAngleRef.current = getPointerAngle(e.touches[0].clientX, e.touches[0].clientY, stage);
    dragStartAngleRef.current = angle;
    setIsAutoSpin(false);

    const onTouchMove = (moveEvent) => {
      if (!isDraggingRef.current || moveEvent.touches.length !== 1) return;
      const currentAngle = getPointerAngle(moveEvent.touches[0].clientX, moveEvent.touches[0].clientY, stage);
      const delta = currentAngle - dragStartMouseAngleRef.current;
      setAngle(dragStartAngleRef.current + delta);
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };

    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
  };

  // Mobile Card Horizontal Swipe Gesture Support
  const cardTouchStartRef = useRef({ x: 0, y: 0 });

  const handleCardTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    cardTouchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleCardTouchEnd = (e) => {
    if (e.changedTouches.length !== 1) return;
    const diffX = e.changedTouches[0].clientX - cardTouchStartRef.current.x;
    const diffY = e.changedTouches[0].clientY - cardTouchStartRef.current.y;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <section className="section services-wheel-section" ref={sectionRef} id="capabilities">
      <div className="container">
        {/* Centered Section Header */}
        <div className="section-header text-center">
          <div className="section-tag mx-auto">
            <span className="status-dot-pulse"></span>
            <span>WHAT WE DELIVER · INTERACTIVE CAPABILITIES</span>
          </div>
          <h2 className="section-title">
            Every capability ambitious brands need to<br />
            <span className="serif-italic gradient-coral-text">build, rank, advertise & scale.</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Click or spin the interactive service wheel to explore our digital engineering, search ranking, and paid acquisition capabilities.
          </p>
        </div>

        {/* Interactive 360° Orbital Wheel Stage */}
        <div 
          className="services-wheel-stage" 
          style={{
            '--rx': `${radii.rx}px`,
            '--ry': `${radii.ry}px`
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onMouseEnter={() => { isHoveredRef.current = true; }}
          onMouseLeave={() => { isHoveredRef.current = false; }}
          title="Drag anywhere on the orbit to spin the wheel"
        >
          {/* Glowing Concentric Orbital Rings */}
          <div className="orbital-ring orbital-ring-outer" aria-hidden="true" />
          <div className="orbital-ring orbital-ring-inner" aria-hidden="true" />
          <div className="orbital-ambient-glow" style={{ '--current-accent': activeService.accent }} aria-hidden="true" />

          {/* Central Interactive Showcase Hub */}
          <div 
            className="wheel-center-hub glass-card spotlight-card"
            onTouchStart={handleCardTouchStart}
            onTouchEnd={handleCardTouchEnd}
            style={{
              '--hub-accent': activeService.accent,
              borderColor: `${activeService.accent}60`,
              boxShadow: `0 20px 48px -10px rgba(0,0,0,0.8), 0 0 35px -6px ${activeService.accent}50, inset 0 1px 0 rgba(255,255,255,0.25)`
            }}
          >
            <div className="hub-header-row">
              <span className="hub-category-pill" style={{ borderColor: `${activeService.accent}40`, color: activeService.accent }}>
                {activeService.category} · {activeService.metric}
              </span>
              <span className="hub-counter font-mono-logo">
                {String(activeIdx + 1).padStart(2, '0')} / {String(numItems).padStart(2, '0')}
              </span>
            </div>

            <div className="hub-icon-row">
              <div className="hub-icon-circle" style={{ background: `${activeService.accent}20`, borderColor: `${activeService.accent}80` }}>
                <span className="hub-icon-emoji">{activeService.icon}</span>
              </div>
              <h3 className="hub-service-title">{activeService.title}</h3>
            </div>

            <p className="hub-service-tagline">{activeService.tagline}</p>

            <div className="hub-pills-row">
              {activeService.pills.map((pill, pIdx) => (
                <span key={pIdx} className="hub-pill-chip">
                  ✦ {pill}
                </span>
              ))}
            </div>

            <div className="hub-action-row">
              <Link to={activeService.link} className="hub-explore-btn">
                <span>Explore Capability</span>
                <span className="arrow">→</span>
              </Link>
              <Link to="/contact" className="hub-talk-btn">
                Book Call
              </Link>
            </div>
          </div>

          {/* 8 Orbital Floating Nodes (Equidistant Around the Circle) */}
          <div className="orbital-nodes-layer">
            {WHEEL_SERVICES.map((item, idx) => {
              const nodeBaseAngle = idx * (360 / numItems);
              const currentTotalAngle = (nodeBaseAngle + angle) * (Math.PI / 180);
              const x = radii.rx * Math.cos(currentTotalAngle);
              const y = radii.ry * Math.sin(currentTotalAngle);
              const isSelected = activeIdx === idx;

              return (
                <div
                  key={item.id}
                  className={`orbital-node ${isSelected ? 'active-node' : ''}`}
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    '--node-accent': item.accent
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectService(idx);
                  }}
                  title={`Select ${item.title}`}
                >
                  <span className="node-icon">{item.icon}</span>
                  <span className="node-label">{item.shortTitle}</span>
                  {isSelected && <span className="node-glow-halo" aria-hidden="true" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Wheel Interactive Controls Bar */}
        <div className="wheel-controls-row">
          <button
            type="button"
            className="wheel-ctrl-btn"
            onClick={handlePrev}
            title="Previous capability"
            aria-label="Previous capability"
          >
            ↺ Prev
          </button>

          <button
            type="button"
            className={`wheel-ctrl-btn toggle-spin-btn ${isAutoSpin ? 'spinning' : ''}`}
            onClick={() => setIsAutoSpin(!isAutoSpin)}
            title="Toggle Continuous Orbit"
          >
            <span className={`spin-status-indicator ${isAutoSpin ? 'active' : ''}`} />
            <span>{isAutoSpin ? 'Auto-Orbiting' : 'Orbit Paused'}</span>
          </button>

          <button
            type="button"
            className="wheel-ctrl-btn"
            onClick={handleNext}
            title="Next capability"
            aria-label="Next capability"
          >
            Next ↻
          </button>
        </div>

        {/* Sleek Minimalist Capability Progress Dots (Replaces crowded chips) */}
        <div className="wheel-pagination-dots" role="tablist" aria-label="Capabilities Selection">
          {WHEEL_SERVICES.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              className={`wheel-dot ${activeIdx === idx ? 'active-dot' : ''}`}
              style={{
                '--dot-accent': item.accent
              }}
              onClick={() => selectService(idx)}
              aria-label={`Select ${item.title}`}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
