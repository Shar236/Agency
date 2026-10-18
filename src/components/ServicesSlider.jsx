import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ServicesSlider() {
  const sliderRef = useRef(null);
  const [activeTab, setActiveTab] = useState('all');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const services = [
    // --- TECH & ENGINEERING ---
    {
      id: 'web-dev',
      category: 'tech',
      catLabel: '01 · WEB ENGINEERING',
      title: 'Bespoke Web & App Engineering',
      desc: 'Ultra-fast, responsive web flagships and single-page applications engineered without template bloat. 99+ Core Web Vitals, interactive 3D WebGL features, and military-grade edge security.',
      badge: 'SPEED & CODE CRAFT',
      accent: '#38BDF8',
      bgGlow: 'rgba(56, 189, 248, 0.12)',
      icon: '⚡',
      tags: ['React / Next.js', 'WebGL / Three.js', '99+ PageSpeed', 'Edge CDN', 'Micro-Interactions'],
      metric: { val: '< 0.4s', label: 'First Contentful Paint Guarantee' },
      link: '/services#web'
    },
    {
      id: 'fullstack-cloud',
      category: 'tech',
      catLabel: '02 · FULL-STACK & CLOUD',
      title: 'SaaS Platforms & MERN Architecture',
      desc: 'Robust Node.js, Express, MongoDB, and Next.js architectures built for mission-critical scale. Zero-latency REST & GraphQL APIs, secure authentication, and resilient cloud deployments.',
      badge: 'SCALABLE BACKEND',
      accent: '#818CF8',
      bgGlow: 'rgba(129, 140, 248, 0.12)',
      icon: '🛠️',
      tags: ['Node.js & Express', 'MongoDB / Mongoose', 'REST & GraphQL', 'JWT / OAuth', 'Docker & CI/CD'],
      metric: { val: '99.99%', label: 'Uptime SLA Reliability' },
      link: '/services#web'
    },
    {
      id: 'headless-ecommerce',
      category: 'tech',
      catLabel: '03 · COMMERCE & CMS',
      title: 'Headless E-Commerce & CMS Systems',
      desc: 'Next-generation Shopify Plus and headless CMS integrations (Sanity/Strapi) giving your marketing team complete autonomy while maintaining lightning-fast shopping cart conversions.',
      badge: 'HIGH-CONVERTING STORE',
      accent: '#C084FC',
      bgGlow: 'rgba(192, 132, 252, 0.12)',
      icon: '🛍️',
      tags: ['Shopify Plus', 'Headless Sanity', 'Dynamic Cart', 'Stripe Subscriptions', '1-Click Checkout'],
      metric: { val: '+42%', label: 'Average Mobile Checkout Lift' },
      link: '/services#web'
    },

    // --- DIGITAL MARKETING & SEO ---
    {
      id: 'seo-dominance',
      category: 'marketing',
      catLabel: '04 · ORGANIC SEARCH',
      title: 'Google SEO Ranking Dominance',
      desc: 'Comprehensive technical SEO, JSON-LD rich schema, programmatic keyword architecture, and high-authority backlink sprints that capture high-intent commercial buyers before your competitors.',
      badge: 'ORGANIC PIPELINE',
      accent: '#34D399',
      bgGlow: 'rgba(52, 211, 153, 0.12)',
      icon: '🔍',
      tags: ['Commercial Intent Keywords', 'JSON-LD Schema', 'Core Web Vitals Pass', 'Topical Authority', 'Google Search Console'],
      metric: { val: '#1 RANK', label: 'Target Search Term Placement' },
      link: '/services#seo'
    },
    {
      id: 'meta-ads',
      category: 'marketing',
      catLabel: '05 · PAID SOCIAL',
      title: 'Meta & Instagram Ads Engine',
      desc: 'High-converting creative copy, motion video ads, server-side Meta Conversions API (CAPI) tracking, and audience lookalike targeting engineered to scale high-ticket customer acquisition.',
      badge: 'HIGH-ROAS SCALE',
      accent: '#FB923C',
      bgGlow: 'rgba(251, 146, 60, 0.12)',
      icon: '🎯',
      tags: ['Server-side Meta CAPI', 'High-Converting Video Creatives', 'ROAS Scaling Sprints', 'Split-Testing CRO', 'Omnichannel Retargeting'],
      metric: { val: '4.8× ROAS', label: 'Average Client Campaign Return' },
      link: '/services#ads'
    },
    {
      id: 'google-ads-pmax',
      category: 'marketing',
      catLabel: '06 · SEARCH ADVERTISING',
      title: 'Google Ads & Performance Max',
      desc: 'Laser-focused Google Search, YouTube, and Performance Max campaigns that capture active in-market buyers. Negative keyword sculpting and landing page split-testing ensure zero wasted spend.',
      badge: 'INTENT-BASED ADS',
      accent: '#F472B6',
      bgGlow: 'rgba(244, 114, 182, 0.12)',
      icon: '📈',
      tags: ['Performance Max (PMax)', 'Google Search Intent', 'Negative Keyword Pruning', 'Conversion Tagging', 'High-Ticket B2B Funnels'],
      metric: { val: '-38%', label: 'Cost Per Qualified Lead' },
      link: '/services#ads'
    },

    // --- BRAND, DESIGN & AI ---
    {
      id: 'brand-identity',
      category: 'brand',
      catLabel: '07 · VISUAL CRAFT',
      title: 'Brand Identity & Design Systems',
      desc: 'Distinctive typographic hierarchy, iconic vector logo suites, color science, and cohesive design systems that command immediate category authority and premium market perception.',
      badge: 'INDUSTRY AUTHORITY',
      accent: '#E879F9',
      bgGlow: 'rgba(232, 121, 249, 0.12)',
      icon: '🎨',
      tags: ['Vector Logo Suites', 'Color Psychology', 'Design Guidelines Book', 'Social Ad Templates', 'Favicon & Glyphs'],
      metric: { val: '100% Custom', label: 'Zero Generic Templates' },
      link: '/services#brand'
    },
    {
      id: 'ai-automations',
      category: 'brand',
      catLabel: '08 · AI & WORKFLOWS',
      title: 'AI Sales Automations & WhatsApp Funnels',
      desc: 'Automated 24/7 lead qualification, intelligent WhatsApp conversational agents, CRM synchronization (HubSpot, Notion, Slack), and automated follow-up sequences that convert leads while you sleep.',
      badge: '24/7 LEAD ENGINE',
      accent: '#38BDF8',
      bgGlow: 'rgba(56, 189, 248, 0.12)',
      icon: '🤖',
      tags: ['AI WhatsApp Bots', 'CRM Auto-Sync', 'Instant SLA Follow-ups', 'Automated Lead Scoring', 'Zapier / Make Workflows'],
      metric: { val: '2-Min', label: 'Inbound Response Time' },
      link: '/services'
    },
    {
      id: 'cro-funnel',
      category: 'brand',
      catLabel: '09 · CONVERSION DESIGN',
      title: 'Conversion Rate Optimization (CRO)',
      desc: 'Data-backed UX session audits, heatmaps, scroll maps, and multivariate landing page split tests designed to systematically extract maximum revenue from your existing traffic.',
      badge: 'REVENUE MULTIPLIER',
      accent: '#10B981',
      bgGlow: 'rgba(16, 185, 129, 0.12)',
      icon: '📊',
      tags: ['Multivariate A/B Testing', 'Heatmap Session Audits', 'Frictionless Funnels', 'Copywriting Optimization', 'Checkout Flow Audit'],
      metric: { val: '+68%', label: 'Average Inbound Pipeline Growth' },
      link: '/services'
    }
  ];

  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(s => s.category === activeTab);

  const checkScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 20);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
  };

  useEffect(() => {
    checkScroll();
    const el = sliderRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, [filteredServices]);

  const slide = (direction) => {
    const el = sliderRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('.service-slide-card')?.clientWidth || 380;
    const scrollAmount = (cardWidth + 24) * 1.5;
    el.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="section services-slider-section" id="capabilities">
      <div className="container">
        {/* Section Header */}
        <div className="services-slider-header">
          <div className="header-left">
            <div className="section-tag">
              <span className="tag-spark">✦</span>
              <span>COMPLETE GROWTH LIFECYCLE</span>
            </div>
            <h2 className="section-title services-main-title">
              Everything ambitious businesses need to<br />
              <span className="serif-italic gradient-coral-text">build, rank, advertise & scale.</span>
            </h2>
            <p className="section-subtitle">
              From bespoke high-performance web engineering to organic Google SEO dominance, high-ROAS Meta Ads, and automated AI sales pipelines.
            </p>
          </div>

          {/* Slider Arrow Controls */}
          <div className="services-slider-controls">
            <button
              type="button"
              className={`slider-arrow-btn prev-arrow ${!canScrollLeft ? 'disabled' : ''}`}
              onClick={() => slide('prev')}
              aria-label="Previous service"
              disabled={!canScrollLeft}
            >
              ←
            </button>
            <button
              type="button"
              className={`slider-arrow-btn next-arrow ${!canScrollRight ? 'disabled' : ''}`}
              onClick={() => slide('next')}
              aria-label="Next service"
              disabled={!canScrollRight}
            >
              →
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="services-category-tabs">
          <button
            type="button"
            className={`category-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => { setActiveTab('all'); if (sliderRef.current) sliderRef.current.scrollLeft = 0; }}
          >
            All Capabilities ({services.length})
          </button>
          <button
            type="button"
            className={`category-tab-btn ${activeTab === 'tech' ? 'active' : ''}`}
            onClick={() => { setActiveTab('tech'); if (sliderRef.current) sliderRef.current.scrollLeft = 0; }}
          >
            💻 Tech & Web Engineering
          </button>
          <button
            type="button"
            className={`category-tab-btn ${activeTab === 'marketing' ? 'active' : ''}`}
            onClick={() => { setActiveTab('marketing'); if (sliderRef.current) sliderRef.current.scrollLeft = 0; }}
          >
            📈 Digital Marketing & SEO
          </button>
          <button
            type="button"
            className={`category-tab-btn ${activeTab === 'brand' ? 'active' : ''}`}
            onClick={() => { setActiveTab('brand'); if (sliderRef.current) sliderRef.current.scrollLeft = 0; }}
          >
            ✦ Brand & AI Automations
          </button>
        </div>

        {/* Sliding Cards Track */}
        <div className="services-slider-track" ref={sliderRef}>
          {filteredServices.map((service, idx) => (
            <div 
              key={service.id} 
              className="service-slide-card glass-card spotlight-card"
              style={{
                '--accent-color': service.accent,
                '--accent-glow': service.bgGlow
              }}
            >
              {/* Card Top Pill & Icon */}
              <div className="service-card-top">
                <span className="service-card-cat-pill" style={{ borderColor: `${service.accent}40`, color: service.accent }}>
                  {service.catLabel}
                </span>
                <div className="service-card-icon-box" style={{ background: service.bgGlow, borderColor: `${service.accent}60` }}>
                  <span className="service-card-icon">{service.icon}</span>
                </div>
              </div>

              {/* Service Title & Description */}
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-desc">{service.desc}</p>

              {/* Metric Callout Highlight */}
              <div className="service-metric-badge" style={{ borderColor: `${service.accent}30` }}>
                <span className="metric-val" style={{ color: service.accent }}>{service.metric.val}</span>
                <span className="metric-lbl">{service.metric.label}</span>
              </div>

              {/* Tech Tags */}
              <div className="service-tags-wrap">
                {service.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="service-tech-pill">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Card Footer Action */}
              <div className="service-card-footer">
                <Link to={service.link} className="service-action-link">
                  <span>Explore Service Details</span>
                  <span className="arrow-dash">→</span>
                </Link>
                <Link to="/contact" className="service-inquire-btn" title="Discuss this service with an engineer">
                  Book Call
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Helper Bar */}
        <div className="services-slider-bottom-hint">
          <span className="hint-scroll">← Drag or swipe horizontally to explore all services →</span>
          <Link to="/services" className="hint-all-services-link">
            <span>View Full Capabilities Breakdown</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
