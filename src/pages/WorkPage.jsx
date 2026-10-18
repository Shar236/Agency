import React from 'react';
import { Link } from 'react-router-dom';

export default function WorkPage() {
  const caseStudies = [
    {
      id: 'caseStudy1',
      title: 'ApexFlow SaaS Flagship',
      tagline: 'High-speed cloud platform engineered to scale.',
      category: 'Web Engineering & SaaS',
      year: '2026',
      badge: 'React / Next.js + MERN Stack',
      sector: 'Enterprise Cloud',
      img: './images/project-1.jpg',
      desc: 'Bespoke full-stack web application engineered without template bloat, featuring custom interactive 3D WebGL components, real-time analytics dashboards, and sub-0.4s load times.',
      metricNum: '+145%',
      metricText: 'increase in self-serve onboarding conversion',
      reverse: false
    },
    {
      id: 'caseStudy2',
      title: 'LuxeAura DTC Scale Engine',
      tagline: 'High-ROAS Meta & Performance Max scaling.',
      category: 'Performance Ads & Commerce',
      year: '2026',
      badge: 'Meta CAPI + Shopify Plus',
      sector: 'Direct-to-Consumer',
      img: './images/project-2.jpg',
      desc: 'Full-funnel Meta & Google Performance Max acquisition campaign paired with server-side CAPI tracking, motion creatives, and headless Shopify Plus checkout conversion.',
      metricNum: '4.8×',
      metricText: 'verified blended ROAS across $680K+ spend',
      reverse: true
    },
    {
      id: 'caseStudy3',
      title: 'UrbanNest Lead Machine',
      tagline: 'Dominating organic search & automated inbound.',
      category: 'SEO & Inbound Lead Engine',
      year: '2026',
      badge: 'Technical SEO + AI Automation',
      sector: 'Commercial Services',
      img: './images/project-3.jpg',
      desc: 'Comprehensive technical SEO overhaul, JSON-LD schema architecture, and keyword clustering that secured #1 Google rankings for 30+ buyer-intent keywords with 24/7 AI WhatsApp lead qualification.',
      metricNum: '#1 Rank',
      metricText: 'across 34 commercial keywords & 3.4× inbound leads',
      reverse: false
    }
  ];

  return (
    <div className="work-page">
      {/* Work Hero */}
      <section className="section page-hero-section">
        <div className="container text-center">
          <div className="status-badge mx-auto" style={{ marginBottom: '24px' }}>
            <span className="status-dot-pulse"></span>
            <span className="status-text">Selected Client Flagships & Measurable Impact</span>
          </div>
          <h1 className="hero-title">
            Work that speaks<br />
            <span className="serif-italic gradient-coral-text">for itself.</span>
          </h1>
          <p className="hero-description mx-auto" style={{ maxWidth: '640px' }}>
            Selected projects where thoughtful design, clean code, and strategic marketing delivered measurable growth for our clients.
          </p>
        </div>
      </section>

      {/* Case Studies List */}
      <section className="section work-section" style={{ paddingTop: '0' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {caseStudies.map((item) => (
            <article
              key={item.id}
              className={`case-study-item ${item.reverse ? 'reverse-grid' : ''} glass-card spotlight-card`}
              id={item.id}
            >
              {item.reverse ? (
                <>
                  <div className="case-study-info">
                    <div className="case-meta">
                      <span className="case-client-tag">{item.category}</span>
                      <span className="case-year">{item.year}</span>
                    </div>
                    <h2 className="case-headline">{item.tagline}</h2>
                    <p className="case-description">{item.desc}</p>
                    <div className="case-metric-highlight">
                      <span className="metric-num serif-italic gradient-coral-text">{item.metricNum}</span>
                      <span className="metric-text">{item.metricText}</span>
                    </div>
                    <Link to="/contact" className="btn btn-glass">
                      Start a Similar Project →
                    </Link>
                  </div>
                  <div className="case-study-visual">
                    <div className="browser-frame-clean">
                      <div className="browser-header">
                        <div className="window-dots"><span className="dot"></span><span className="dot"></span><span className="dot"></span></div>
                        <div className="browser-address-bar"><span>saarthi-preview / {item.title.toLowerCase().replace(/\s+/g, '-')}</span></div>
                        <div className="case-number-badge">02</div>
                      </div>
                      <div className="case-img-container">
                        <img src={item.img} alt={item.title} className="case-main-img" loading="lazy" />
                        <div className="case-overlay-tags">
                          <span className="tag-left">{item.badge}</span>
                          <span className="tag-right">{item.sector}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="case-study-visual">
                    <div className="browser-frame-clean">
                      <div className="browser-header">
                        <div className="window-dots"><span className="dot"></span><span className="dot"></span><span className="dot"></span></div>
                        <div className="browser-address-bar"><span>saarthi-preview / {item.title.toLowerCase().replace(/\s+/g, '-')}</span></div>
                        <div className="case-number-badge">{item.id === 'caseStudy1' ? '01' : '03'}</div>
                      </div>
                      <div className="case-img-container">
                        <img src={item.img} alt={item.title} className="case-main-img" loading="lazy" />
                        <div className="case-overlay-tags">
                          <span className="tag-left">{item.badge}</span>
                          <span className="tag-right">{item.sector}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="case-study-info">
                    <div className="case-meta">
                      <span className="case-client-tag">{item.category}</span>
                      <span className="case-year">{item.year}</span>
                    </div>
                    <h2 className="case-headline">{item.tagline}</h2>
                    <p className="case-description">{item.desc}</p>
                    <div className="case-metric-highlight">
                      <span className="metric-num serif-italic gradient-coral-text">{item.metricNum}</span>
                      <span className="metric-text">{item.metricText}</span>
                    </div>
                    <Link to="/contact" className="btn btn-glass">
                      Start a Similar Project →
                    </Link>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="section cta-banner-section">
        <div className="container">
          <div className="cta-banner-card glass-card spotlight-card text-center" style={{ padding: '60px 32px', borderRadius: '28px' }}>
            <h2 className="cta-banner-title" style={{ fontSize: '2.2rem', color: 'var(--text-main, #ffffff)', marginBottom: '16px' }}>
              Want results like these for <span className="serif-italic gradient-coral-text">your business?</span>
            </h2>
            <p className="cta-banner-sub mx-auto" style={{ maxWidth: '580px', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: 1.6 }}>
              Whether you need a high-converting website, a memorable brand identity, or an ad campaign that actually generates profit, we're ready.
            </p>
            <Link to="/contact" className="btn btn-primary magnetic-btn" style={{ padding: '14px 32px', fontSize: '1rem' }}>
              <span>Discuss Your Project</span>
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
