import React from 'react';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  const services = [
    {
      id: 'web',
      pill: '01 · WEB ENGINEERING',
      color: '#38bdf8',
      bg: 'rgba(56, 189, 248, 0.15)',
      border: 'rgba(56, 189, 248, 0.3)',
      title: 'Bespoke Websites & Digital Flagships',
      desc: 'Fast, resilient digital flagships built without template bloat. Every line of code is optimized for 95+ Google PageSpeed, instant interactivity, and seamless mobile conversions.',
      bullets: [
        '95+ Core Web Vitals speed guarantee & instant response',
        'Custom interactive 3D WebGL components & micro-craft',
        'Intuitive headless CMS for effortless team updates',
        'Server-side security, SSL & global edge CDN deployment'
      ],
      linkText: 'Discuss Web Engineering'
    },
    {
      id: 'brand',
      pill: '02 · IDENTITY & CRAFT',
      color: '#c084fc',
      bg: 'rgba(167, 139, 250, 0.15)',
      border: 'rgba(167, 139, 250, 0.3)',
      title: 'Brand Identity & Design Systems',
      desc: 'A distinctive brand language that commands premium pricing. From iconic vector logo systems and typography pairings to comprehensive design guidelines.',
      bullets: [
        'Vector logo suites, glyphs & favicon packages',
        'Editorial typography systems & color science',
        'Social media visual kits & ad creative templates',
        'Complete brand guidelines book & vector source files'
      ],
      linkText: 'Discuss Brand Strategy'
    },
    {
      id: 'seo',
      pill: '03 · ORGANIC INBOUND',
      color: '#34d399',
      bg: 'rgba(52, 211, 153, 0.15)',
      border: 'rgba(52, 211, 153, 0.3)',
      title: 'Google Search Dominance (SEO)',
      desc: 'High-intent organic search rankings that capture buyers before competitors. Clean technical site architecture, JSON-LD schema, and keyword topical authority.',
      bullets: [
        'Commercial intent keyword mapping & content roadmaps',
        'Technical site indexing, canonicals & sitemap architecture',
        'Rich Google snippets, schema & local business dominance',
        'Monthly ranking trajectory reports & continuous backlink sprints'
      ],
      linkText: 'Discuss SEO Ranking'
    },
    {
      id: 'ads',
      pill: '04 · PAID ACQUISITION',
      color: '#fb923c',
      bg: 'rgba(251, 146, 60, 0.15)',
      border: 'rgba(251, 146, 60, 0.3)',
      title: 'Meta & Google Performance Ads',
      desc: 'Predictable customer acquisition engines built on server-side tracking (CAPI), high-converting ad creative angles, and rigorous ROAS optimization.',
      bullets: [
        'Meta CAPI server-side pixel tracking & Google Tag Manager',
        'High-converting creative static & motion ad variations',
        'Funnel split testing & landing page conversion rate testing',
        'Daily bid adjustments, audience scaling & ROAS tracking'
      ],
      linkText: 'Discuss Paid Ads Engine'
    },
    {
      id: 'ai',
      pill: '05 · INTELLIGENT SYSTEMS',
      color: '#f472b6',
      bg: 'rgba(244, 114, 182, 0.15)',
      border: 'rgba(244, 114, 182, 0.3)',
      title: 'AI Automations & WhatsApp API',
      desc: 'Turn website visitors into closed deals around the clock. Custom WhatsApp chatbots, CRM lead routing, and intelligent booking workflows.',
      bullets: [
        'Official Meta WhatsApp Business API integration',
        'Automated lead qualification & calendar appointment booking',
        'Instant SMS, email & CRM notification cascades',
        'Continuous conversational model training on your business docs'
      ],
      linkText: 'Discuss AI Automations'
    },
    {
      id: 'retainer',
      pill: '06 · CONTINUOUS EVOLUTION',
      color: '#fbbf24',
      bg: 'rgba(251, 191, 36, 0.15)',
      border: 'rgba(251, 191, 36, 0.3)',
      title: 'Growth Partner Retainer',
      desc: 'An elite digital product team at your disposal. Bi-weekly sprints, ongoing CRO testing, ad campaigns, and continuous feature updates without hiring in-house.',
      bullets: [
        'Bi-weekly executive sprint planning & progress calls',
        'Dedicated Slack channel with guaranteed same-day SLA',
        'Continuous A/B split testing & conversion optimizations',
        'Priority developer & designer availability each month'
      ],
      linkText: 'Discuss Retainer Partnership'
    }
  ];

  return (
    <div className="services-page">
      {/* Services Hero */}
      <section className="section page-hero-section">
        <div className="container text-center">
          <div className="status-badge mx-auto" style={{ marginBottom: '24px' }}>
            <span className="status-dot-pulse"></span>
            <span className="status-text">Core Capabilities & Deliverables</span>
          </div>
          <h1 className="hero-title">
            Everything your business needs to<br />
            <span className="serif-italic gradient-coral-text">look sharp and win online.</span>
          </h1>
          <p className="hero-description mx-auto" style={{ maxWidth: '640px' }}>
            We combine custom web engineering with thoughtful brand identities, Google SEO ranking, and data-backed digital advertising.
          </p>
        </div>
      </section>

      {/* Services Detailed Grid */}
      <section className="section services-detail-section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className="services-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '28px' }}>
            {services.map((svc) => (
              <article key={svc.id} className="service-detail-card glass-card spotlight-card" id={svc.id} style={{ padding: '32px 24px', borderRadius: '24px' }}>
                <div style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  background: svc.bg,
                  border: `1px solid ${svc.border}`,
                  color: svc.color,
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  marginBottom: '18px'
                }}>
                  {svc.pill}
                </div>
                <h2 style={{ fontSize: '1.6rem', color: 'var(--text-main, #ffffff)', marginBottom: '14px' }}>{svc.title}</h2>
                <p style={{ color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '24px' }}>
                  {svc.desc}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {svc.bullets.map((b, i) => (
                    <li key={i} style={{ color: 'var(--text-body, #94a3b8)', fontSize: '0.9rem' }}>
                      <span style={{ color: svc.color, marginRight: '8px' }}>✓</span> {b}
                    </li>
                  ))}
                </ul>
                <Link to={`/contact?service=${svc.id}`} className="btn btn-glass">
                  {svc.linkText} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="section cta-banner-section">
        <div className="container">
          <div className="cta-banner-card glass-card spotlight-card text-center" style={{ padding: '60px 32px', borderRadius: '28px' }}>
            <h2 className="cta-banner-title" style={{ fontSize: '2.2rem', color: 'var(--text-main, #ffffff)', marginBottom: '16px' }}>
              Ready to take your business to the <span className="serif-italic gradient-coral-text">next level?</span>
            </h2>
            <p className="cta-banner-sub mx-auto" style={{ maxWidth: '580px', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: 1.6 }}>
              Whether you're starting from scratch or redesigning an existing platform, let's talk about what will create real results.
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
