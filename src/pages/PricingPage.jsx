import React from 'react';
import { Link } from 'react-router-dom';

export default function PricingPage() {
  const tiers = [
    {
      id: 'foundation',
      name: 'Foundation',
      price: 'Custom Scope',
      desc: 'For emerging founders ready to launch their digital presence with a bespoke brand identity and custom website.',
      timeline: '6–8 weeks delivery',
      featured: false,
      features: [
        'Domain registration & enterprise email setup',
        'Complete brand identity & vector logo system',
        'Up to 6 custom responsive pages with CMS',
        'Technical SEO & Core Web Vitals 95+',
        '30 days post-launch warranty & training'
      ],
      btnText: 'Discuss Foundation Scope',
      planQuery: 'Foundation'
    },
    {
      id: 'signature',
      name: 'Signature Growth',
      price: 'Full-Funnel Scope',
      desc: 'For ambitious brands ready to build a high-converting digital flagship with an active ad acquisition engine.',
      timeline: '10–14 weeks delivery',
      featured: true,
      features: [
        'Deep commercial strategy & brand guidelines',
        'Custom flagship website with dynamic CMS & animations',
        'Full SEO ranking setup & local search domination',
        'Complete Meta & Google Ads acquisition launch',
        'Server-side CAPI tracking & GA4 executive dashboard',
        '90 days dedicated post-launch optimization sprints'
      ],
      btnText: 'Discuss Signature Growth',
      planQuery: 'Signature'
    },
    {
      id: 'growth',
      name: 'Growth Partner',
      price: 'Dedicated Retainer',
      desc: 'For scaling companies needing a dedicated team managing ads, SEO ranking, conversion rate tests, and web evolution.',
      timeline: 'Ongoing monthly partnership',
      featured: false,
      features: [
        'Full-funnel Meta & Google Ads management',
        'Monthly SEO content sprints & backlink authority',
        'Continuous A/B conversion rate testing (CRO)',
        'Ongoing feature development & speed maintenance',
        'Bi-weekly executive ROI & growth review calls'
      ],
      btnText: 'Discuss Partner Retainer',
      planQuery: 'Retainer'
    }
  ];

  const comparisonRows = [
    { deliverable: 'Bespoke Custom Frontend & CMS', f: 'Up to 6 Pages', s: 'Comprehensive Flagship', g: 'Continuous Releases' },
    { deliverable: '95+ Google PageSpeed Guarantee', f: '✓', s: '✓', g: '✓' },
    { deliverable: 'Custom Interactive 3D WebGL', f: 'Basic micro-craft', s: 'Advanced WebGL', g: 'Full 3D Ecosystem' },
    { deliverable: 'Brand Identity & Vector Logos', f: 'Core Package', s: 'Complete Brand System', g: 'Ongoing Creative Assets' },
    { deliverable: 'Technical SEO & JSON Schema', f: 'Foundation Indexing', s: 'Topical Authority', g: 'Monthly Content Sprints' },
    { deliverable: 'Meta & Google Ads Management', f: '—', s: 'Full Setup & Launch', g: 'Continuous Scaling' },
    { deliverable: 'Meta CAPI Server-Side Tracking', f: '—', s: '✓', g: '✓' },
    { deliverable: 'Dedicated Private Slack Channel', f: 'Standard Email', s: 'Direct Slack Access', g: 'Priority Slack & Calls' },
    { deliverable: 'Weekly Sprint Strategy Syncs', f: 'Bi-weekly', s: 'Weekly Live Video', g: 'Bi-weekly Executive Reviews' },
    { deliverable: 'Post-Launch Warranty & Support', f: '30 Days', s: '90 Days', g: 'Ongoing Retainer' }
  ];

  return (
    <div className="pricing-page">
      {/* Pricing Hero */}
      <section className="section page-hero-section">
        <div className="container text-center">
          <div className="status-badge mx-auto" style={{ marginBottom: '24px' }}>
            <span className="status-dot-pulse"></span>
            <span className="status-text">Transparent Value-Based Investment</span>
          </div>
          <h1 className="hero-title">
            Choose the right way<br />
            <span className="serif-italic gradient-coral-text">to partner with Saarthi.</span>
          </h1>
          <p className="hero-description mx-auto" style={{ maxWidth: '640px' }}>
            Every engagement is scoped transparently around your exact business inflection point and growth objectives. Zero hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing 3-Tier Grid */}
      <section className="section pricing-section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className="pricing-grid">
            {tiers.map((t) => (
              <div
                key={t.id}
                className={`pricing-card glass-card spotlight-card ${t.featured ? 'featured-tier' : ''}`}
                data-tier={t.id}
              >
                {t.featured && (
                  <div className="featured-badge-pill">MOST POPULAR ENGAGEMENT</div>
                )}
                <div className="pricing-card-top">
                  <h2 className="tier-name" style={{ fontSize: '1.5rem' }}>{t.name}</h2>
                  <div className="tier-price font-serif-num">{t.price}</div>
                  <p className="tier-desc">{t.desc}</p>
                  <div className="tier-timeline">{t.timeline}</div>
                </div>

                <div className="tier-features">
                  {t.features.map((feat, i) => (
                    <div key={i} className="tier-feature-item">
                      <span className="feature-arrow coral-text">↳</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pricing-card-bottom">
                  <Link
                    to={`/contact?plan=${t.planQuery}`}
                    className={`btn ${t.featured ? 'btn-primary magnetic-btn' : 'btn-glass'} btn-full select-plan-btn`}
                  >
                    <span>{t.btnText}</span>
                    {t.featured && <span className="arrow">→</span>}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Matrix Table */}
      <section className="section matrix-section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="section-header text-center">
            <div className="section-tag">FULL DELIVERABLES MATRIX</div>
            <h2 className="section-title">
              Compare all deliverables <span className="serif-italic gradient-coral-text">side-by-side.</span>
            </h2>
          </div>

          <div className="table-responsive glass-card" style={{ marginTop: '36px', padding: '24px', borderRadius: '20px', overflowX: 'auto' }}>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <th style={{ padding: '16px', color: '#94a3b8', fontSize: '0.85rem' }}>Deliverables & Support</th>
                  <th style={{ padding: '16px', color: '#ffffff', fontSize: '0.9rem' }}>Foundation</th>
                  <th style={{ padding: '16px', color: '#f97316', fontSize: '0.95rem' }}>Signature Growth</th>
                  <th style={{ padding: '16px', color: '#ffffff', fontSize: '0.9rem' }}>Growth Partner</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '14px 16px', color: '#e2e8f0', fontSize: '0.88rem' }}>{row.deliverable}</td>
                    <td style={{ padding: '14px 16px', color: '#94a3b8', fontSize: '0.85rem' }}>{row.f}</td>
                    <td style={{ padding: '14px 16px', color: '#f97316', fontSize: '0.88rem', fontWeight: 600 }}>{row.s}</td>
                    <td style={{ padding: '14px 16px', color: '#cbd5e1', fontSize: '0.85rem' }}>{row.g}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="section cta-banner-section">
        <div className="container">
          <div className="cta-banner-card glass-card spotlight-card text-center" style={{ padding: '60px 32px', borderRadius: '28px' }}>
            <h2 className="cta-banner-title" style={{ fontSize: '2.2rem', color: '#ffffff', marginBottom: '16px' }}>
              Need a tailored arrangement or custom milestone roadmap?
            </h2>
            <p className="cta-banner-sub mx-auto" style={{ maxWidth: '560px', color: 'var(--text-muted)', marginBottom: '32px' }}>
              Let's talk through your business requirements and craft a proposal tailored specifically to your objectives.
            </p>
            <Link to="/contact" className="btn btn-primary magnetic-btn" style={{ padding: '14px 32px', fontSize: '1rem' }}>
              <span>Request Custom Proposal</span>
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
