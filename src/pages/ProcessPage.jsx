import React from 'react';
import { Link } from 'react-router-dom';

export default function ProcessPage() {
  const steps = [
    {
      num: '01',
      period: 'WEEKS 1–2',
      color: '#a78bfa',
      title: 'Discover & Foundation',
      desc: 'We audit your business model, customer psychology, domain options, and competitive positioning before writing a line of code.',
      items: [
        '↳ Technical stack roadmap',
        '↳ Competitor gap analysis',
        '↳ Information architecture'
      ]
    },
    {
      num: '02',
      period: 'WEEKS 3–6',
      color: '#38bdf8',
      title: 'Brand & Build',
      desc: 'Bespoke visual identity, conversion-focused layout design, and responsive frontend engineering working in seamless tandem.',
      items: [
        '↳ High-fidelity interactive UI',
        '↳ Lightweight, semantic code',
        '↳ Interactive 3D & micro-craft'
      ]
    },
    {
      num: '03',
      period: 'WEEKS 7–8',
      color: '#34d399',
      title: 'Optimize & Launch',
      desc: 'Rigorous technical SEO implementation, pixel tracking, Core Web Vitals speed tests, and high-availability cloud cutover.',
      items: [
        '↳ 95+ PageSpeed audit pass',
        '↳ Server-side Meta CAPI tracking',
        '↳ Zero-downtime DNS cutover'
      ]
    },
    {
      num: '04',
      period: 'ONGOING',
      color: '#fb923c',
      title: 'Market & Scale',
      desc: 'Targeted Meta & Google Ads acquisition, recurring content marketing sprints, and ongoing conversion rate optimization.',
      items: [
        '↳ Ad creative split tests',
        '↳ Continuous CRO optimization',
        '↳ Executive ROI sprint calls'
      ]
    }
  ];

  return (
    <div className="process-page">
      {/* Process Hero */}
      <section className="section page-hero-section">
        <div className="container text-center">
          <div className="status-badge mx-auto" style={{ marginBottom: '24px' }}>
            <span className="status-dot-pulse"></span>
            <span className="status-text">How We Work · Simple & Transparent</span>
          </div>
          <h1 className="hero-title">
            From your first idea to<br />
            <span className="serif-italic gradient-coral-text">a live, converting website.</span>
          </h1>
          <p className="hero-description mx-auto" style={{ maxWidth: '640px' }}>
            No endless meetings, no jargon, and no surprise delays. We break your project down into clear, structured milestones so you always know what's happening and when.
          </p>
        </div>
      </section>

      {/* 4-Stage Grid */}
      <section className="section process-section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className="process-timeline" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {steps.map((st) => (
              <div key={st.num} className="process-step glass-card spotlight-card" style={{ padding: '32px 24px', borderRadius: '20px', display: 'flex', flexDirection: 'column' }}>
                <div className="step-node" style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.06)', border: `1px solid ${st.color}`, color: 'var(--text-main, #ffffff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: '16px' }}>
                  {st.num}
                </div>
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: st.color, letterSpacing: '0.08em', marginBottom: '8px' }}>
                  {st.period}
                </div>
                <h2 className="step-title" style={{ fontSize: '1.3rem', color: 'var(--text-main, #ffffff)', marginBottom: '12px' }}>
                  {st.title}
                </h2>
                <p className="step-desc" style={{ color: 'var(--text-body)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  {st.desc}
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.8rem', color: 'var(--text-muted, #94a3b8)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {st.items.map((it, idx) => (
                    <span key={idx}>{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communication & Collaboration Standards */}
      <section className="section sla-section" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="section-header text-center">
            <div className="section-tag">COMMUNICATION & COLLABORATION</div>
            <h2 className="section-title">
              How we collaborate <span className="serif-italic gradient-coral-text">during builds.</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '24px', marginTop: '36px' }}>
            <div className="glass-card spotlight-card" style={{ padding: '28px', borderRadius: '20px' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '12px' }}>💬</div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main, #ffffff)', marginBottom: '10px' }}>Direct Communication</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Shared Slack or WhatsApp group directly with your lead designer and engineer. No junior middlemen or lost messages.
              </p>
            </div>
            <div className="glass-card spotlight-card" style={{ padding: '28px', borderRadius: '20px' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '12px' }}>⚡</div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main, #ffffff)', marginBottom: '10px' }}>Fast Response Times</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Questions and requests are answered within hours during the workday. Clear communication with zero guesswork.
              </p>
            </div>
            <div className="glass-card spotlight-card" style={{ padding: '28px', borderRadius: '20px' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '12px' }}>📅</div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main, #ffffff)', marginBottom: '10px' }}>Weekly Live Previews</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Quick weekly video walk-throughs and live private staging links so you can test updates on your own mobile and laptop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="section cta-banner-section">
        <div className="container">
          <div className="cta-banner-card glass-card spotlight-card text-center" style={{ padding: '60px 32px', borderRadius: '28px' }}>
            <h2 className="cta-banner-title" style={{ fontSize: '2.2rem', color: 'var(--text-main, #ffffff)', marginBottom: '16px' }}>
              Ready to work with a team that <span className="serif-italic gradient-coral-text">genuinely cares?</span>
            </h2>
            <p className="cta-banner-sub mx-auto" style={{ maxWidth: '560px', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: 1.6 }}>
              Tell us about your project and goals. We'll outline a clear timeline and milestone delivery plan.
            </p>
            <Link to="/contact" className="btn btn-primary magnetic-btn" style={{ padding: '14px 32px', fontSize: '1rem' }}>
              <span>Start Your Project</span>
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
