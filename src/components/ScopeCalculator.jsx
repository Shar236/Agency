import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ScopeCalculator() {
  const [selectedServices, setSelectedServices] = useState(['web', 'seo']);
  const [timelineSpeed, setTimelineSpeed] = useState('standard'); // standard, expedited

  const serviceOptions = [
    { id: 'web', name: 'Custom Website / Web App', basePrice: 4200, time: 3 },
    { id: 'seo', name: 'SEO Architecture & Dominance', basePrice: 2800, time: 2 },
    { id: 'ads', name: 'Meta & Google Ads Engine', basePrice: 3200, time: 2 },
    { id: 'ai', name: 'AI Sales & CRM Automation', basePrice: 2500, time: 2 },
    { id: 'brand', name: 'Brand Identity & Design System', basePrice: 2200, time: 2 }
  ];

  const toggleService = (id) => {
    setSelectedServices(prev => 
      prev.includes(id) 
        ? (prev.length > 1 ? prev.filter(s => s !== id) : prev) 
        : [...prev, id]
    );
  };

  const totalPrice = selectedServices.reduce((sum, id) => {
    const s = serviceOptions.find(opt => opt.id === id);
    return sum + (s ? s.basePrice : 0);
  }, 0) * (timelineSpeed === 'expedited' ? 1.25 : 1);

  const totalWeeks = Math.max(...selectedServices.map(id => {
    const s = serviceOptions.find(opt => opt.id === id);
    return s ? s.time : 2;
  })) + (selectedServices.length > 2 ? 1 : 0) - (timelineSpeed === 'expedited' ? 1 : 0);

  return (
    <section className="section calc-section" id="calculator">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '44px' }}>
          <div className="section-tag">
            <span>✦</span>
            <span>TRANSPARENT ESTIMATOR</span>
          </div>
          <h2 className="section-title">
            Interactive Project <span className="serif-italic gradient-coral-text">Scope & Investment</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Select your required deliverables to calculate realistic production timelines and estimated investment tiers.
          </p>
        </div>

        <div className="calc-card glass-card" style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 32px', borderRadius: '28px' }}>
          {/* Services Selector */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', color: '#CBD5E1', marginBottom: '14px', letterSpacing: '0.04em' }}>
              1. SELECT REQUIRED CAPABILITIES
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {serviceOptions.map(srv => {
                const isSelected = selectedServices.includes(srv.id);
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => toggleService(srv.id)}
                    className="calc-chip"
                    style={{
                      background: isSelected ? 'linear-gradient(135deg, rgba(255,94,98,0.2), rgba(139,92,246,0.25))' : 'rgba(255,255,255,0.04)',
                      borderColor: isSelected ? 'var(--coral-500)' : 'rgba(255,255,255,0.1)',
                      color: isSelected ? '#FFFFFF' : '#94A3B8',
                      padding: '10px 18px',
                      borderRadius: '999px',
                      cursor: 'pointer',
                      fontSize: '0.86rem',
                      fontWeight: '600',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <span>{isSelected ? '✓ ' : '+ '}</span>
                    {srv.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline Speed Selector */}
          <div style={{ marginBottom: '36px' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', color: '#CBD5E1', marginBottom: '14px', letterSpacing: '0.04em' }}>
              2. TIMELINE VELOCITY
            </label>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setTimelineSpeed('standard')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '12px',
                  background: timelineSpeed === 'standard' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${timelineSpeed === 'standard' ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)'}`,
                  color: timelineSpeed === 'standard' ? '#FFFFFF' : '#94A3B8',
                  fontWeight: '600',
                  fontSize: '0.86rem',
                  cursor: 'pointer'
                }}
              >
                Standard Sprint Delivery
              </button>
              <button
                type="button"
                onClick={() => setTimelineSpeed('expedited')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '12px',
                  background: timelineSpeed === 'expedited' ? 'rgba(255, 94, 98, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${timelineSpeed === 'expedited' ? 'var(--coral-500)' : 'rgba(255, 255, 255, 0.1)'}`,
                  color: timelineSpeed === 'expedited' ? '#FFFFFF' : '#94A3B8',
                  fontWeight: '600',
                  fontSize: '0.86rem',
                  cursor: 'pointer'
                }}
              >
                ⚡ Fast-Track Priority (+25%)
              </button>
            </div>
          </div>

          {/* Real-Time Outcome Summary */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            paddingTop: '28px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>
                ESTIMATED INVESTMENT
              </span>
              <div style={{ fontSize: '2.4rem', fontWeight: '800', color: '#FFFFFF', fontFamily: 'var(--font-heading)' }}>
                ${Math.round(totalPrice).toLocaleString()}
                <span style={{ fontSize: '0.9rem', color: '#94A3B8', fontWeight: '500', marginLeft: '6px' }}>USD</span>
              </div>
              <span style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: '600' }}>
                ⏱ Estimated Delivery: ~{totalWeeks} weeks
              </span>
            </div>

            <Link
              to="/contact"
              className="btn btn-primary magnetic-btn"
              style={{ padding: '14px 28px' }}
            >
              <span className="btn-shine" />
              <span>Lock Scope & Book Call →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
