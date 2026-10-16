import { IconBolt } from './Icons';

export function Footer({ navigate }) {
  const handleAboutClick = () => {
    navigate('home');
    setTimeout(() => {
      const el = document.getElementById('about-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const quickLinks = [
    { label: 'Home', action: () => { navigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { label: 'Browse Events', action: () => navigate('events') },
    { label: 'About CampusPulse', action: handleAboutClick },
  ];

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div
              className="footer-brand-name"
              onClick={() => navigate('home')}
              role="link"
              tabIndex={0}
              aria-label="CampusPulse home"
              onKeyDown={e => e.key === 'Enter' && navigate('home')}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <IconBolt size={20} style={{ color: 'var(--khaki)' }} />
              CampusPulse
            </div>
            <p className="footer-brand-desc">
              Your campus events directory — from technical hackathons and skill workshops
              to cultural performances and sports. Discover what's happening around you.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="footer-col-title">Navigation</div>
            <nav className="footer-links" aria-label="Footer navigation">
              {quickLinks.map(link => (
                <button
                  key={link.label}
                  className="footer-link"
                  onClick={link.action}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* About */}
          <div>
            <div className="footer-col-title">About</div>
            <div className="footer-links">
              {['About', 'Contact', 'Privacy', 'Terms'].map(item => (
                <span key={item} className="footer-link" role="presentation">{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} CampusPulse · Render Hackathon 2026
          </p>
          <p className="footer-copy">
            API · render72.pages.dev
          </p>
        </div>
      </div>
    </footer>
  );
}
