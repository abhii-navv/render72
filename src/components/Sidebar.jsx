import { useEffect, useState } from 'react';
import LineSidebar from './LineSidebar/LineSidebar';
import { IconBolt, IconX } from './Icons';

const NAV_ITEMS = [
  'Home',
  'Featured Events',
  'How It Works',
  'Categories',
  'About CampusPulse',
  'Upcoming Events',
  'Browse All',
];

const SECTION_IDS = [
  'hero-section',
  'featured-section',
  'hiw-section',
  'categories-section',
  'about-section',
  'upcoming-section',
];

export default function Sidebar({ navigate, currentPage, isOpen, onClose }) {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  // Scroll spy on the Landing Page to sync active navigation item
  useEffect(() => {
    if (currentPage !== 'home') return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSectionIndex(i);
            return;
          }
        }
      }
      setActiveSectionIndex(0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const activeIndex = currentPage === 'events' ? 6 : activeSectionIndex;

  const handleItemClick = (index) => {
    if (index === 6) {
      navigate('events');
      onClose();
      return;
    }

    const targetId = SECTION_IDS[index];
    if (currentPage === 'home') {
      if (index === 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('home');
      setTimeout(() => {
        if (index === 0) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
    setActiveSectionIndex(index);
    onClose();
  };

  return (
    <aside
      id="main-sidebar"
      className={`sidebar${isOpen ? ' sidebar--open' : ''}`}
      aria-label="Main navigation"
    >
      {/* Header with Logo and Mobile Close */}
      <div className="sidebar-header">
        <div
          className="sidebar-logo"
          onClick={() => {
            navigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            onClose();
          }}
          role="link"
          tabIndex={0}
          aria-label="CampusPulse home"
          onKeyDown={(e) => e.key === 'Enter' && navigate('home')}
        >
          <div className="sidebar-logo-mark" aria-hidden="true">
            <IconBolt size={18} style={{ color: 'var(--almond)' }} />
          </div>
          <span className="sidebar-logo-name">CampusPulse</span>
        </div>

        <button
          className="sidebar-close-btn"
          onClick={onClose}
          aria-label="Close navigation sidebar"
        >
          <IconX size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav" aria-label="Site navigation">
        <LineSidebar
          items={NAV_ITEMS}
          value={activeIndex}
          accentColor="#C6AC8F"
          textColor="#EAE0D5"
          markerColor="#5E503F"
          markerLength={24}
          markerGap={8}
          maxShift={14}
          itemGap={14}
          fontSize={0.82}
          proximityRadius={75}
          smoothing={80}
          onItemClick={handleItemClick}
        />
      </nav>

      {/* Footer info */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-label">Campus Events</div>
        <div className="sidebar-footer-sub">Render Hackathon 2026</div>
      </div>
    </aside>
  );
}
