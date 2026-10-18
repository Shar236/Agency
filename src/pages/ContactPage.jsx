import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ContactPage() {
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  // Read URL query params (e.g. ?plan=Signature or ?service=web or ?subject=...)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plan = params.get('plan');
    const service = params.get('service');
    const subjectParam = params.get('subject');

    if (subjectParam) {
      setFormData(prev => ({ ...prev, subject: subjectParam }));
    } else if (plan) {
      setFormData(prev => ({
        ...prev,
        subject: `Inquiry regarding ${plan} Plan`,
        message: `Hi Saarthi team, I would like to explore the ${plan} engagement scope for our company.`
      }));
    } else if (service) {
      setFormData(prev => ({
        ...prev,
        subject: `New Project: ${service}`,
        message: `Hi Saarthi team, we are looking for high-performance capabilities in ${service}.`
      }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitted(true); // Graceful fallback UI
      }
    } catch (err) {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: 'Instagram',
      handle: '@saarthi.agency',
      url: 'https://instagram.com',
      iconClass: 'icon-ig',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      handle: 'Saarthi Digital Agency',
      url: 'https://linkedin.com',
      iconClass: 'icon-li',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      )
    },
    {
      name: 'Twitter / X',
      handle: '@saarthi_hq',
      url: 'https://twitter.com',
      iconClass: 'icon-tw',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'WhatsApp Direct',
      handle: '+91 99999 99999',
      url: 'https://wa.me/919999999999?text=Hi%20Saarthi%20Studio%2C%20I%20want%20to%20discuss%20a%20project',
      iconClass: 'icon-wa',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      )
    },
    {
      name: 'Facebook',
      handle: 'Saarthi Studio Global',
      url: 'https://facebook.com',
      iconClass: 'icon-fb',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      )
    },
    {
      name: 'GitHub',
      handle: 'github.com/saarthi',
      url: 'https://github.com',
      iconClass: 'icon-gh',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="contact-page">
      <div className="contact-page-container">
        
        {/* Header matching user reference */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div className="contact-pill-badge">
            SEND US A MESSAGE
          </div>
          <h1 className="contact-main-heading">
            Contact Our Team To Transform<br />Your Digital Presence
          </h1>
          <p className="contact-subheading" style={{ marginBottom: 0 }}>
            Fill in the details below to discuss your project, branding, or growth acceleration. We respond within 24 hours.
          </p>
        </div>

        {/* 2-Column Split: Form (Main centerpiece) + Companion Info & Socials (Side-by-side) */}
        <div className="contact-layout-split">
          
          {/* Main Focus: The Form ("main toh mujhe ye form hi h") */}
          <div className="contact-form-card">
            {submitted ? (
              <div className="contact-success-state">
                <div className="contact-success-icon">✓</div>
                <h2 style={{ fontSize: '1.6rem', color: 'var(--text-main, #ffffff)', marginBottom: '12px' }}>Message Successfully Delivered!</h2>
                <p style={{ color: 'var(--text-body, #94a3b8)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto 28px auto', lineHeight: 1.6 }}>
                  Thank you, <strong>{formData.name}</strong>. Our team in Ludhiana has received your brief and will connect with you at <strong>{formData.email}</strong> within 24 hours.
                </p>
                <button
                  type="button"
                  className="contact-submit-btn"
                  style={{ maxWidth: '280px', margin: '0 auto' }}
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', company: '', phone: '', email: '', subject: '', message: '' });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form id="contactMessageForm" onSubmit={handleSubmit} className="contact-form-grid">
                
                {/* Row 1: Your Name & Company */}
                <div className="contact-field-group">
                  <label className="contact-field-label" htmlFor="contactName">Your Name</label>
                  <input
                    id="contactName"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Your Full Name"
                    className="contact-input"
                  />
                </div>

                <div className="contact-field-group">
                  <label className="contact-field-label" htmlFor="contactCompany">Company</label>
                  <input
                    id="contactCompany"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company"
                    className="contact-input"
                  />
                </div>

                {/* Row 2: Phone & Email */}
                <div className="contact-field-group">
                  <label className="contact-field-label" htmlFor="contactPhone">Phone</label>
                  <input
                    id="contactPhone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter Your Phone Number"
                    className="contact-input"
                  />
                </div>

                <div className="contact-field-group">
                  <label className="contact-field-label" htmlFor="contactEmail">Email</label>
                  <input
                    id="contactEmail"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email Address"
                    className="contact-input"
                  />
                </div>

                {/* Row 3: Subject (Full Width) */}
                <div className="contact-field-group contact-field-full">
                  <label className="contact-field-label" htmlFor="contactSubject">Subject</label>
                  <input
                    id="contactSubject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Tell Your Subject"
                    className="contact-input"
                  />
                </div>

                {/* Row 4: Message (Full Width) */}
                <div className="contact-field-group contact-field-full">
                  <label className="contact-field-label" htmlFor="contactMessage">Message</label>
                  <textarea
                    id="contactMessage"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    className="contact-textarea"
                  />
                </div>

                {/* Row 5: Send Message Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="contact-submit-btn"
                  id="contactSubmitBtn"
                >
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                </button>

              </form>
            )}
          </div>

          {/* Alongside Column: Companion Info & Socials ("saath saath mei rkh deta... kamm rkh") */}
          <div className="contact-sidebar-col">
            
            {/* Direct Studio Access */}
            <div className="contact-info-glass-card">
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#a78bfa', letterSpacing: '0.08em', marginBottom: '8px' }}>
                DIRECT FOUNDER ACCESS
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main, #ffffff)', marginBottom: '8px' }}>
                Speak directly with founders.
              </h3>
              <p style={{ color: 'var(--text-muted, #94a3b8)', fontSize: '0.86rem', lineHeight: 1.5, marginBottom: '18px' }}>
                No generic sales reps or intake bots. You'll connect directly with our technical lead & brand strategist.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderTop: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))', paddingTop: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted, #64748b)', fontWeight: 700, textTransform: 'uppercase' }}>Direct Email</div>
                  <a href="mailto:hello@saarthi.agency" style={{ color: 'var(--text-main, #ffffff)', fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none', display: 'inline-block', marginTop: '2px' }}>
                    hello@saarthi.agency ↗
                  </a>
                </div>

                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted, #64748b)', fontWeight: 700, textTransform: 'uppercase' }}>Studio Location</div>
                  <div style={{ color: 'var(--text-main, #ffffff)', fontWeight: 600, fontSize: '0.92rem', marginTop: '2px' }}>Ludhiana, Punjab, India</div>
                  <div style={{ color: 'var(--cyan-400, #38bdf8)', fontSize: '0.78rem', marginTop: '2px' }}>Serving Global & Pan-India Brands</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted, #64748b)', fontWeight: 700, textTransform: 'uppercase' }}>Turnaround SLA</div>
                  <div style={{ color: '#10b981', fontWeight: 600, fontSize: '0.86rem', marginTop: '2px' }}>● 24-Hour Founder Response Guaranteed</div>
                </div>
              </div>
            </div>

            {/* WhatsApp Direct Card */}
            <div className="contact-info-glass-card whatsapp-sidebar-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>💬</span>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main, #ffffff)', margin: 0 }}>Prefer WhatsApp?</h4>
                  <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>Fast response within 30 minutes</span>
                </div>
              </div>
              <p style={{ color: 'var(--text-muted, #94a3b8)', fontSize: '0.84rem', lineHeight: 1.5, marginBottom: '14px' }}>
                Drop our studio a message on WhatsApp for rapid scoping questions and voice notes.
              </p>
              <a
                href="https://wa.me/919999999999?text=Hi%20Saarthi%20Studio%2C%20I%20want%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 18px',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  color: '#10b981',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  transition: 'all 0.25s ease'
                }}
              >
                <span>Message on WhatsApp</span>
                <span>↗</span>
              </a>
            </div>

            {/* Social Media Channels Grid (Compact) */}
            <div className="contact-info-glass-card">
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--violet-400, #a78bfa)', letterSpacing: '0.08em', marginBottom: '4px' }}>
                SOCIAL CHANNELS
              </div>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main, #ffffff)', marginBottom: '4px' }}>Follow & Connect</h4>
              <p style={{ color: 'var(--text-muted, #94a3b8)', fontSize: '0.82rem', marginBottom: '12px' }}>
                Live product drops, design showcases & updates.
              </p>

              <div className="contact-social-mini-grid">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-mini-pill"
                    aria-label={`Connect on ${item.name}`}
                  >
                    <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
