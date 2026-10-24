import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onOpenAudit }) {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((window.scrollY / docHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollProgress}%`, opacity: scrolled ? 1 : 0 }} 
        aria-hidden="true" 
      />

      <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`} id="siteHeader">
        <div className="header-container">
          {/* Brand Logo Lockup */}
          <div className="nav-brand-group">
            <Link to="/" className="brand-logo" id="brandLogo" aria-label="the oblique - Home">
              <img 
                src={theme === 'light' ? '/the-oblique-lockup-light.png' : '/the-oblique-lockup-dark.png'} 
                srcSet={theme === 'light'
                  ? '/the-oblique-lockup-light-mobile.png 261w, /the-oblique-lockup-light.png 957w'
                  : '/the-oblique-lockup-dark-mobile.png 261w, /the-oblique-lockup-dark.png 957w'
                }
                sizes="(max-width: 600px) 140px, 175px"
                alt="the oblique" 
                className="brand-lockup-img" 
                width="160" 
                height="42" 
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Home
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Services
            </NavLink>
            <NavLink to="/work" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Work
            </NavLink>
            <NavLink to="/process" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Process
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Contact
            </NavLink>
          </nav>

          {/* Header Action CTAs */}
          <div className="header-actions">
            {/* Theme Toggle Button */}
            <button
              type="button"
              id="themeToggleBtn"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? (
                <svg className="theme-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg className="theme-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>

            <Link to="/contact" className="btn-start-project magnetic-btn" id="headerCtaBtn">
              <span className="btn-shine" />
              <span>Start a Project</span>
              <svg className="arrow-icon" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="8" x2="13" y2="8" />
                <polyline points="9 4 13 8 9 12" />
              </svg>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button 
              className={`mobile-menu-toggle ${mobileOpen ? 'is-active' : ''}`}
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label="Toggle navigation menu" 
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Mobile Drawer Backdrop */}
        {mobileOpen && (
          <div 
            className="mobile-drawer-backdrop" 
            onClick={() => setMobileOpen(false)}
            aria-hidden="true" 
          />
        )}

        {/* Mobile Drawer Navigation */}
        <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`} id="mobileDrawer">
          <nav className="mobile-nav">
            <NavLink to="/" end className="mobile-link" onClick={() => setMobileOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/services" className="mobile-link" onClick={() => setMobileOpen(false)}>
              Services
            </NavLink>
            <NavLink to="/work" className="mobile-link" onClick={() => setMobileOpen(false)}>
              Selected Work
            </NavLink>
            <NavLink to="/process" className="mobile-link" onClick={() => setMobileOpen(false)}>
              Our Process
            </NavLink>
            <NavLink to="/contact" className="mobile-link cta-mobile" onClick={() => setMobileOpen(false)}>
              Start a Project →
            </NavLink>

            <div className="mobile-theme-bar">
              <span className="mobile-theme-label">Theme Appearance</span>
              <button
                type="button"
                className="mobile-theme-pill-btn"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <span className="pill-theme-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
                <span className="pill-theme-text">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
