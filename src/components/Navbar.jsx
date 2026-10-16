import { useState, useEffect } from 'react';
import { IconBolt, IconX, IconArrowRight } from './Icons';

export function Navbar({ navigate, currentPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', target: 'hero-section' },
    { label: 'Featured', target: 'featured-section' },
    { label: 'How It Works', target: 'hiw-section' },
    { label: 'Categories', target: 'categories-section' },
    { label: 'About', target: 'about-section' },
    { label: 'Upcoming', target: 'upcoming-section' },
    { label: 'Browse All', page: 'events' },
  ];

  const handleNavClick = (link) => {
    if (link.page) {
      navigate(link.page);
      setMobileOpen(false);
      return;
    }
    if (currentPage === 'home') {
      const el = document.getElementById(link.target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('home');
      setTimeout(() => {
        const el = document.getElementById(link.target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
    setMobileOpen(false);
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          {/* Logo */}
          <div
            className="navbar-logo"
            onClick={() => {
              navigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            role="link"
            tabIndex={0}
            aria-label="CampusPulse home"
            onKeyDown={(e) => e.key === 'Enter' && navigate('home')}
          >
            <div className="navbar-logo-icon" aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>
              <IconBolt size={18} style={{ color: 'var(--khaki)' }} />
            </div>
            <span className="navbar-logo-text">CampusPulse</span>
          </div>

          {/* Desktop Nav */}
          <div className="navbar-nav" role="list">
            {navLinks.map((link) => (
              <button
                key={link.label}
                className="nav-link"
                onClick={() => handleNavClick(link)}
                role="listitem"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="navbar-actions">
            <button
              id="nav-explore-btn"
              className="btn-primary"
              onClick={() => navigate('events')}
              aria-label="Explore all events"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              Explore Events <IconArrowRight size={14} />
            </button>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile nav */}
      <div
        id="mobile-nav"
        className={`mobile-nav${mobileOpen ? ' open' : ''}`}
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
      >
        <button
          className="mobile-close-btn"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <IconX size={18} />
        </button>
        {navLinks.map((link) => (
          <button
            key={link.label}
            className="mobile-nav-link"
            onClick={() => handleNavClick(link)}
          >
            {link.label}
          </button>
        ))}
        <button
          className="btn-primary"
          style={{ marginTop: '1rem', padding: '0.85rem 2rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          onClick={() => { navigate('events'); setMobileOpen(false); }}
        >
          Explore Events <IconArrowRight size={14} />
        </button>
      </div>
    </>
  );
}
