import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import WorkPage from './pages/WorkPage';
import ProcessPage from './pages/ProcessPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <div className="agency-app">
      {/* Scroll restoration on route changes */}
      <ScrollToTop />

      {/* Luxury Ambient Lighting Glow */}
      <div className="ambient-glow-wrapper" aria-hidden="true">
        <div className="glow-orb orb-primary"></div>
        <div className="glow-orb orb-secondary"></div>
        <div className="grid-overlay-mesh"></div>
      </div>

      {/* Main Luxury Header */}
      <Navbar />

      {/* Multi-Page Client-Side Routes */}
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Main Global Footer */}
      <Footer />
    </div>
  );
}
