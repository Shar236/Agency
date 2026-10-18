import React from 'react';
import { Link } from 'react-router-dom';
import Hero3DBackground from './Hero3DBackground';

export default function HeroSection() {
  return (
    <section className="section hero-section hero-section-centered" id="hero">
      {/* Pure 3D Ambient WebGL Animation Background */}
      <Hero3DBackground />

      {/* Atmospheric Dark Luxury Gradient & Cyber Matrix Mesh Overlay */}
      <div className="hero-bg-overlay" aria-hidden="true" />
      <div className="hero-bg-grid-mesh" aria-hidden="true" />

      <div className="container hero-centered-container">
        <div className="hero-content hero-content-centered">
          {/* Status Badge */}
          <div className="hero-platform-badge glass-chip">
            <span className="status-dot-pulse" />
            <span className="platform-badge-title">CREATIVE WEB & GROWTH STUDIO</span>
            <span className="platform-badge-divider">·</span>
            <span className="platform-badge-sub">LUDHIANA, PUNJAB</span>
          </div>

          {/* Balanced Centered Headline */}
          <h1 className="hero-title hero-title-centered">
            <span className="hero-line-1">From Starting a Business to</span>
            <span className="serif-italic gradient-coral-text hero-line-2">Growing It Online.</span>
          </h1>

          {/* Centered Subtitle */}
          <p className="hero-description hero-description-centered">
            We help ambitious businesses build memorable websites, distinctive brand identities, and high-converting marketing engines that turn visitors into paying customers.
          </p>

          {/* Centered CTA Buttons */}
          <div className="hero-cta-group hero-cta-centered">
            <Link to="/contact" className="btn btn-primary magnetic-btn" id="heroPrimaryBtn">
              <span className="btn-shine" />
              <span>Start Your Project</span>
              <svg className="arrow-icon" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="8" x2="13" y2="8" />
                <polyline points="9 4 13 8 9 12" />
              </svg>
            </Link>

            <Link to="/work" className="btn btn-glass" id="heroSecondaryBtn">
              <span>View Selected Work</span>
              <span className="btn-arrow-subtle">↗</span>
            </Link>

            <Link to="/process" className="btn btn-glass" id="heroProcessBtn">
              <span>How We Work</span>
              <span className="btn-arrow-subtle">→</span>
            </Link>
          </div>

          {/* Studio Focus Tags (Centered) */}
          <div className="hero-tags hero-tags-centered">
            <span className="tag-pill">Strategy</span>
            <span className="tag-arrow">·</span>
            <span className="tag-pill">Design</span>
            <span className="tag-arrow">·</span>
            <span className="tag-pill">Development</span>
            <span className="tag-arrow">·</span>
            <span className="tag-pill">SEO</span>
            <span className="tag-arrow">·</span>
            <span className="tag-pill highlight-pill">Growth</span>
          </div>

          {/* Clean Capability Highlights Dock */}
          <div className="hero-platform-dock glass-card">
            <div className="dock-core-node">
              <span className="core-dot active-dot" />
              <span className="core-label">Custom Web Development</span>
            </div>
            <span className="dock-divider">·</span>
            <div className="dock-core-node">
              <span className="core-dot active-dot" />
              <span className="core-label">Brand & Visual Identity</span>
            </div>
            <span className="dock-divider">·</span>
            <div className="dock-core-node">
              <span className="core-dot active-dot" />
              <span className="core-label">Search Engine Optimization</span>
            </div>
            <span className="dock-divider">·</span>
            <div className="dock-core-node">
              <span className="core-dot active-dot" />
              <span className="core-label">Meta & Google Ads</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
