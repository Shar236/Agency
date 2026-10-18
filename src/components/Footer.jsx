import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    } catch (err) {
      setSubscribed(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" id="footer">
      <div className="container">
        {/* Top Highlight Row */}
        <div className="footer-top-row">
          <div className="footer-brand-col">
            <Link to="/" className="brand-logo" aria-label="Saarthi - Home">
              <div className="brand-icon-box">
                <span className="brand-icon-spark">✦</span>
              </div>
              <span className="saarthi-brand-modern" style={{ fontSize: '1.4rem' }}>Saarthi</span>
            </Link>
            <p className="footer-tagline">
              A digital design & development studio based in Ludhiana, Punjab. We craft memorable websites, brand identities, and growth strategies for ambitious businesses.
            </p>
          </div>

          <div className="footer-email-col">
            <span className="footer-inquiries-label">NEW BUSINESS INQUIRIES</span>
            <a href="mailto:hello@saarthi.agency" className="footer-email-link">
              hello@saarthi.agency ↗
            </a>
          </div>
        </div>

        {/* 4-Column Links & Newsletter Grid */}
        <div className="footer-links-grid">
          {/* Navigation Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services & Capabilities</Link></li>
              <li><Link to="/work">Selected Client Work</Link></li>
              <li><Link to="/process">Our Process</Link></li>
              <li><Link to="/contact">Start a Project</Link></li>
            </ul>
          </div>

          {/* Capabilities Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Capabilities</h4>
            <ul className="footer-links">
              <li><Link to="/services#web">Web Engineering</Link></li>
              <li><Link to="/services#brand">Brand Identity & Design</Link></li>
              <li><Link to="/services#seo">SEO & Search Visibility</Link></li>
              <li><Link to="/services#ads">Meta & Google Ads Engine</Link></li>
              <li><Link to="/services#ai">AI WhatsApp Automations</Link></li>
              <li><Link to="/services#retainer">Dedicated Growth Retainer</Link></li>
            </ul>
          </div>

          {/* Direct & Social Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Social & Connect</h4>
            <ul className="footer-links">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram ↗</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter / X ↗</a></li>
              <li><a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">WhatsApp Direct ↗</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook ↗</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub ↗</a></li>
              <li><a href="mailto:hello@saarthi.agency">hello@saarthi.agency ↗</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer-col footer-newsletter-box">
            <h4 className="footer-col-title">The Studio Dispatch</h4>
            <p className="footer-newsletter-desc">
              Occasional practical insights on web craft, conversion design, and scaling digital brands. No spam.
            </p>
            <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="footer-input-field"
                placeholder="founder@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="footer-subscribe-btn" aria-label="Subscribe to newsletter">
                <span>→</span>
              </button>
            </form>
            {subscribed && (
              <p style={{ color: '#34D399', fontSize: '0.78rem', marginTop: '6px', fontWeight: 600 }}>
                ✓ You are on the priority dispatch list. Welcome!
              </p>
            )}
          </div>
        </div>

        {/* Bottom Legal & Back to Top Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Saarthi Studio · Crafted in Ludhiana, Punjab. Working with ambitious brands worldwide.
          </div>

          <div className="footer-legal-links">
            <Link to="/contact">Privacy Policy</Link>
            <span style={{ color: 'var(--border-subtle, rgba(255,255,255,0.2))' }}>·</span>
            <Link to="/contact">Terms of Engagement</Link>
          </div>

          <button
            type="button"
            className="footer-back-to-top-btn"
            id="backToTopBtn"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <span style={{ fontSize: '0.9rem' }}>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
