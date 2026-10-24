import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ServicesWheel from '../components/ServicesWheel';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "What makes Saarthi different from traditional agencies?",
      a: "Unlike traditional agencies that pass your project through layers of junior account reps, at Saarthi you work directly with senior designers and engineers. We keep our client roster small so every project gets dedicated focus, direct communication, and rapid turnaround."
    },
    {
      q: "How long does a typical project take from start to launch?",
      a: "Most custom websites and brand identities launch within 4 to 8 weeks. For urgent launches or focused single-page landing platforms, we can deliver a production-ready website in 2 to 3 weeks without cutting corners."
    },
    {
      q: "Do you use WordPress/templates, or is everything custom coded?",
      a: "Everything is custom crafted and custom coded using modern React and clean CSS. We avoid bloated off-the-shelf templates and heavy plugins. The result is a lightning-fast, secure website that loads in under 1 second and ranks effortlessly on Google."
    },
    {
      q: "Can you help us with SEO and paid ads after the website goes live?",
      a: "Absolutely. A great website needs visitors. We handle full-funnel digital marketing: technical Google SEO to bring steady organic leads, and high-converting Meta and Google ad campaigns to scale sales predictably."
    },
    {
      q: "How do we stay in touch and track progress during the build?",
      a: "We set up a shared Slack or WhatsApp group directly with the team working on your project. You get regular Loom video walkthroughs, live staging links to test on your phone, and quick, direct answers whenever you have a question."
    }
  ];

  return (
    <div className="home-page">
      {/* 1. Centered Hero Section with Instant Zero-Delay 3D Work Platform Video Background */}
      <HeroSection />

      {/* 2. Trust Marquee & Animated Metrics Counters */}
      <section className="section trust-section" id="trust">
        <div className="container text-center">
          <p className="trust-heading">Trusted by ambitious businesses, tech founders & direct-to-consumer brands</p>
        </div>

        {/* 2-Row Animated Brand Logo Showcase */}
        <div className="trust-marquee-showcase">
          <div className="trust-marquee-wrapper trust-row-1" aria-label="Client & Partner Brands Row 1">
            <div className="marquee-track marquee-track-ltr-35">
              <div className="marquee-group">
                <div className="brand-item glass-chip"><span className="brand-logo-icon">▲</span><span className="brand-name font-serif-logo">NORTH / CO</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">◼</span><span className="brand-name font-slab-logo">FORMA</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">◎</span><span className="brand-name font-bold-logo">KINSHIP</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">⌒</span><span className="brand-name font-mono-logo">ARC WORKS</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">✦</span><span className="brand-name font-serif-logo serif-italic">STILL</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">⬡</span><span className="brand-name font-clean-logo">FIELD</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">▮</span><span className="brand-name font-bold-logo">MONOLITH</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">△</span><span className="brand-name font-slab-logo">APEX</span></div>
              </div>
              <div className="marquee-group" aria-hidden="true">
                <div className="brand-item glass-chip"><span className="brand-logo-icon">▲</span><span className="brand-name font-serif-logo">NORTH / CO</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">◼</span><span className="brand-name font-slab-logo">FORMA</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">◎</span><span className="brand-name font-bold-logo">KINSHIP</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">⌒</span><span className="brand-name font-mono-logo">ARC WORKS</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">✦</span><span className="brand-name font-serif-logo serif-italic">STILL</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">⬡</span><span className="brand-name font-clean-logo">FIELD</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">▮</span><span className="brand-name font-bold-logo">MONOLITH</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">△</span><span className="brand-name font-slab-logo">APEX</span></div>
              </div>
            </div>
          </div>

          <div className="trust-marquee-wrapper trust-row-2" aria-label="Client & Partner Brands Row 2">
            <div className="marquee-track marquee-track-rtl-42">
              <div className="marquee-group">
                <div className="brand-item glass-chip"><span className="brand-logo-icon">★</span><span className="brand-name font-clean-logo">NOVA</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">◈</span><span className="brand-name font-mono-logo">VERTEX</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">●</span><span className="brand-name font-bold-logo">LUMA</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">⨁</span><span className="brand-name font-clean-logo">ORBIT</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">✦</span><span className="brand-name font-serif-logo">NORTHSTAR</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">✳</span><span className="brand-name font-slab-logo">ASTER</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">≋</span><span className="brand-name font-serif-logo serif-italic">MORROW</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">▼</span><span className="brand-name font-bold-logo">VANTA</span></div>
              </div>
              <div className="marquee-group" aria-hidden="true">
                <div className="brand-item glass-chip"><span className="brand-logo-icon">★</span><span className="brand-name font-clean-logo">NOVA</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">◈</span><span className="brand-name font-mono-logo">VERTEX</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">●</span><span className="brand-name font-bold-logo">LUMA</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">⨁</span><span className="brand-name font-clean-logo">ORBIT</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">✦</span><span className="brand-name font-serif-logo">NORTHSTAR</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">✳</span><span className="brand-name font-slab-logo">ASTER</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">≋</span><span className="brand-name font-serif-logo serif-italic">MORROW</span></div>
                <div className="brand-item glass-chip"><span className="brand-logo-icon">▼</span><span className="brand-name font-bold-logo">VANTA</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Rotating Services Wheel Showcase */}
      <ServicesWheel />

      {/* 4. Studio Growth & Expertise Overview (Modelled after Reference) */}
      <section className="section studio-growth-section" id="studio-overview">
        <div className="container">
          <div className="studio-growth-grid">
            {/* Left Column: Visual Studio & Team Mosaic (Slides in from Left) */}
            <div className="studio-visual-mosaic reveal-left">
              {/* Left Tall Card: Designer at Desk */}
              <div className="studio-mosaic-card card-tall glass-card">
                <div className="mosaic-img-box">
                  <img 
                    src="./images/agency-designer.jpg" 
                    alt="Creative Strategy & Engineering Desk" 
                    loading="lazy"
                  />
                  <div className="mosaic-pills-overlay">
                    <span className="mosaic-chip">Creative Strategy</span>
                    <span className="mosaic-chip">Performance Optimization</span>
                    <span className="mosaic-chip">Market Insight</span>
                    <span className="mosaic-chip">Content Excellence</span>
                  </div>
                </div>
              </div>

              {/* Right Subcolumn: Team Collaboration + Experience Stat Card */}
              <div className="studio-mosaic-subcol">
                <div className="studio-mosaic-card card-team glass-card">
                  <img 
                    src="./images/agency-team.jpg" 
                    alt="Saarthi Engineering & Growth Team" 
                    loading="lazy"
                  />
                </div>

                <div className="studio-stat-card glass-card">
                  <div className="stat-card-badge">
                    <span className="stat-num gradient-coral-text">8+</span>
                    <span className="stat-label">Years of Experience</span>
                  </div>
                  <p className="stat-desc">
                    8+ years of helping ambitious brands succeed and scale online.
                  </p>
                  <div className="stat-card-icon" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H8M17 7V16" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative & Strategic Positioning (Slides in from Right) */}
            <div className="studio-growth-content reveal-right">
              <div className="section-tag studio-tag">
                <span className="status-dot-pulse"></span>
                <span>OUR SERVICES & EXPERTISE</span>
              </div>

              <h2 className="studio-main-heading">
                Driving brand growth in a <br />
                <span className="serif-italic gradient-coral-text">digital-first world.</span>
              </h2>

              <p className="studio-lead-text">
                Saarthi helps brands thrive in today's digital-first world by blending creativity, strategy, and technology. As a trusted premier Digital Marketing & Web Engineering Agency, we craft impactful digital experiences—from branding and UI/UX to web design and marketing solutions—that engage audiences, strengthen brand identity, and drive measurable growth.
              </p>

              <p className="studio-body-text">
                Every project is thoughtfully designed to be visually compelling, lightning-fast, and strategically aligned, helping businesses stand out and succeed online.
              </p>

              {/* Capability bullet points */}
              <div className="studio-highlights-list">
                <div className="studio-highlight-item">
                  <span className="highlight-check">✓</span>
                  <div>
                    <strong>Direct Senior Team:</strong> Zero middleman account managers; you collaborate directly with senior engineers and growth architects.
                  </div>
                </div>
                <div className="studio-highlight-item">
                  <span className="highlight-check">✓</span>
                  <div>
                    <strong>Full-Funnel Alignment:</strong> Seamlessly connecting custom web engineering, Google SEO dominance, and high-ROAS paid media scaling.
                  </div>
                </div>
              </div>

              <div className="studio-cta-row">
                <Link to="/contact" className="btn btn-primary magnetic-btn studio-contact-btn">
                  <span>Got a project in mind?</span>
                  <span className="arrow">→</span>
                </Link>
                <Link to="/services" className="btn btn-glass studio-explore-btn">
                  <span>Explore Capabilities</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Interactive FAQ Accordion */}
      <section className="section faq-section" id="faq">
        <div className="container">
          <div className="section-header text-center">
            <div className="section-tag">FREQUENTLY ASKED QUESTIONS</div>
            <h2 className="section-title">
              Clear answers before <span className="serif-italic gradient-coral-text">we begin.</span>
            </h2>
          </div>

          <div style={{ maxWidth: '820px', margin: '36px auto 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((item, idx) => (
              <div
                key={idx}
                className="faq-item glass-card"
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
              >
                <div className="faq-question-row">
                  <h3 className="faq-question-title">{item.q}</h3>
                  <span className="faq-toggle-icon" style={{ transform: openFaq === idx ? 'rotate(45deg)' : 'none' }}>+</span>
                </div>
                {openFaq === idx && (
                  <div className="faq-answer-content">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final Launch CTA Banner */}
      <section className="section cta-banner-section">
        <div className="container">
          <div className="cta-banner-card glass-card spotlight-card text-center">
            <div className="status-badge mx-auto">
              <span className="status-dot-pulse"></span>
              <span className="status-text">Accepting New Client Projects · Ludhiana & Worldwide</span>
            </div>
            <h2 className="cta-banner-title">
              Have an idea or an existing business?<br />
              <span className="serif-italic gradient-coral-text">Let's build something people remember.</span>
            </h2>
            <p className="cta-banner-sub mx-auto">
              Tell us about your project, timeline, and goals. We'll share honest feedback, practical recommendations, and an actionable roadmap to get you there.
            </p>
            <div className="cta-banner-actions">
              <Link to="/contact" className="btn btn-primary magnetic-btn">
                <span>Start a Project</span>
                <span className="arrow">→</span>
              </Link>
              <Link to="/services" className="btn btn-glass">
                <span>Explore Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
