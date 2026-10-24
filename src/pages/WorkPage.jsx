import React from 'react';
import { Link } from 'react-router-dom';

export default function WorkPage() {
  const caseStudies = [
    {
      id: 'apexvouchers',
      number: '01',
      title: 'Apex Vouchers',
      tagline: 'Discounted Official Exam Voucher Engine & Automated Delivery',
      category: 'FinTech E-Commerce & EdTech',
      year: '2026',
      badge: 'Next.js 14 · Pearson Partner Directory · Razorpay / UPI',
      sector: 'Exam Vouchers & EdTech',
      liveUrl: 'https://apexvouchers.com',
      displayUrl: 'apexvouchers.com',
      img: '/images/project-apexvouchers.jpg',
      desc: 'Built an official exam voucher marketplace listed in Pearson’s Registered Partner Directory. Solves upfront testing fees for students by offering official PTE, TOEFL, IELTS, and Duolingo vouchers with 10-second automated dispatch, instant score calculators, and Razorpay/UPI gateway integration.',
      deliverables: [
        'Pearson Partner Directory Listed',
        '10s Automated Code Dispatch Engine',
        'Dynamic PTE Score Calculators',
        'Razorpay & Instant UPI Gateway'
      ],
      metricNum: '10s',
      metricText: 'instant delivery with ₹14,999 guaranteed lowest PTE voucher pricing in India',
      reverse: false
    },
    {
      id: 'janetrade',
      number: '02',
      title: 'JaneTrade',
      tagline: 'Privacy-Preserving MSME Invoice Financing Platform',
      category: 'Web3 FinTech & DeFi Factoring',
      year: '2026',
      badge: 'Next.js 14 · Avalanche Blockchain · ZK-Proof Privacy',
      sector: 'Decentralized Invoice Factoring',
      liveUrl: 'https://jane-trade.vercel.app/',
      displayUrl: 'jane-trade.vercel.app',
      img: '/images/project-janetrade.jpg',
      desc: 'Engineered a next-generation decentralized invoice financing platform for Indian MSMEs facing 45–90 day payment delays. Using Avalanche smart contracts and Zero-Knowledge (ZK) credit proofs, suppliers tokenize unpaid receivables and unlock instant non-dilutive liquidity.',
      deliverables: [
        'ZK Privacy-Preserving Scoring',
        'Avalanche Escrow Smart Contracts',
        'Instant Liquidity Factoring Protocol',
        'Non-Custodial Web3 MSME Telemetry'
      ],
      metricNum: 'ZK-Proof',
      metricText: 'instant liquidity unlocked with zero client contract data exposure',
      reverse: true
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
            Selected live projects where thoughtful engineering, strategic design, and automated systems deliver measurable growth and real commercial impact.
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
                    <h2 className="case-headline">{item.title} — {item.tagline}</h2>
                    <p className="case-description">{item.desc}</p>

                    {item.deliverables && (
                      <ul className="case-deliverables">
                        {item.deliverables.map((del, dIdx) => (
                          <li key={dIdx} className="case-deliverable-item">
                            <span className="check-icon">✓</span>
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="case-metric-highlight">
                      <span className="metric-num serif-italic gradient-coral-text">{item.metricNum}</span>
                      <span className="metric-text">{item.metricText}</span>
                    </div>

                    <div className="case-actions-row">
                      <a 
                        href={item.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-live-deploy"
                        id={`btnLive-${item.id}`}
                      >
                        <span>Visit Live Platform</span>
                        <span className="arrow-ext">↗</span>
                      </a>
                      <Link to="/contact" className="btn btn-glass">
                        Discuss Similar Project →
                      </Link>
                    </div>
                  </div>

                  <div className="case-study-visual">
                    <div className="browser-frame-clean">
                      <div className="browser-header">
                        <div className="window-dots"><span className="dot"></span><span className="dot"></span><span className="dot"></span></div>
                        <div className="browser-address-bar">
                          <a 
                            href={item.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="browser-address-bar-link"
                          >
                            <span>https://{item.displayUrl}</span>
                            <span className="ext-icon">↗</span>
                          </a>
                        </div>
                        <div className="case-number-badge">{item.number}</div>
                      </div>
                      <div className="case-img-container">
                        <a 
                          href={item.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="case-img-link"
                          title={`Open ${item.title} live in new tab`}
                        >
                          <img src={item.img} alt={`${item.title} Preview`} className="case-main-img" loading="lazy" />
                          <div className="case-preview-hover-tag">
                            <span>Open Live Website ↗</span>
                          </div>
                        </a>
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
                        <div className="browser-address-bar">
                          <a 
                            href={item.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="browser-address-bar-link"
                          >
                            <span>https://{item.displayUrl}</span>
                            <span className="ext-icon">↗</span>
                          </a>
                        </div>
                        <div className="case-number-badge">{item.number}</div>
                      </div>
                      <div className="case-img-container">
                        <a 
                          href={item.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="case-img-link"
                          title={`Open ${item.title} live in new tab`}
                        >
                          <img src={item.img} alt={`${item.title} Preview`} className="case-main-img" loading="lazy" />
                          <div className="case-preview-hover-tag">
                            <span>Open Live Website ↗</span>
                          </div>
                        </a>
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
                    <h2 className="case-headline">{item.title} — {item.tagline}</h2>
                    <p className="case-description">{item.desc}</p>

                    {item.deliverables && (
                      <ul className="case-deliverables">
                        {item.deliverables.map((del, dIdx) => (
                          <li key={dIdx} className="case-deliverable-item">
                            <span className="check-icon">✓</span>
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="case-metric-highlight">
                      <span className="metric-num serif-italic gradient-coral-text">{item.metricNum}</span>
                      <span className="metric-text">{item.metricText}</span>
                    </div>

                    <div className="case-actions-row">
                      <a 
                        href={item.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-live-deploy"
                        id={`btnLive-${item.id}`}
                      >
                        <span>Visit Live Platform</span>
                        <span className="arrow-ext">↗</span>
                      </a>
                      <Link to="/contact" className="btn btn-glass">
                        Discuss Similar Project →
                      </Link>
                    </div>
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
              Whether you need a high-converting web application, a scalable e-commerce marketplace, or custom Web3 architecture, our senior engineers are ready.
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
