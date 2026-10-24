import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" id="footer">
      <div className="container">
        {/* Top Highlight Row */}
        <div className="footer-top-row">
          <div className="footer-brand-col">
            <Link to="/" className="brand-logo" aria-label="the oblique - Home">
              <img 
                src={theme === 'light' ? '/the-oblique-lockup-light.png' : '/the-oblique-lockup-dark.png'} 
                srcSet={theme === 'light'
                  ? '/the-oblique-lockup-light-mobile.png 261w, /the-oblique-lockup-light.png 957w'
                  : '/the-oblique-lockup-dark-mobile.png 261w, /the-oblique-lockup-dark.png 957w'
                }
                sizes="(max-width: 600px) 140px, 185px"
                alt="the oblique" 
                className="brand-lockup-img footer-lockup-img" 
                width="170" 
                height="46" 
              />
            </Link>
            <p className="footer-tagline">
              A digital design & development studio based in Ludhiana, Punjab. We craft memorable websites, brand identities, and growth strategies for ambitious businesses.
            </p>
          </div>

          <div className="footer-email-col">
            <span className="footer-inquiries-label">NEW BUSINESS INQUIRIES</span>
            <a href="mailto:theobligue@gmail.com" className="footer-email-link">
              theobligue@gmail.com ↗
            </a>
          </div>
        </div>

        {/* 3-Column Links Grid */}
        <div className="footer-links-grid footer-links-grid-3col">
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
              <li>
                <a href="https://www.instagram.com/theobligue/" target="_blank" rel="noopener noreferrer">
                  Instagram (@theobligue) ↗
                </a>
              </li>
              <li>
                <a href="https://wa.me/917717453630" target="_blank" rel="noopener noreferrer">
                  WhatsApp Direct (+91 77174 53630) ↗
                </a>
              </li>
              <li>
                <a href="mailto:theobligue@gmail.com">
                  theobligue@gmail.com ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Back to Top Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © {new Date().getFullYear()} the oblique · Crafted in Ludhiana, Punjab. Working with ambitious brands worldwide.
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
