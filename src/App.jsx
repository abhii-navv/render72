import { useState } from 'react';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { EventsListPage } from './pages/EventsListPage';
import Sidebar from './components/Sidebar';
import Crosshair from './components/Crosshair/Crosshair';
import { IconBolt, IconMenu } from './components/Icons';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = (page, eventId = null) => {
    setCurrentPage(page);
    setSelectedEventId(eventId);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-layout">
      {/* High-tech Crosshair Cursor */}
      <Crosshair color="#C6AC8F" opacity={0.6} />

      {/* Fixed left sidebar */}
      <Sidebar
        navigate={navigate}
        currentPage={currentPage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile top bar */}
      <header className="mobile-topbar" role="banner">
        <div
          className="mobile-topbar-logo"
          onClick={() => navigate('home')}
          role="link"
          tabIndex={0}
          aria-label="CampusPulse home"
          onKeyDown={e => e.key === 'Enter' && navigate('home')}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '6px' }}>
            <IconBolt size={18} style={{ color: 'var(--khaki)' }} />
          </span>
          <span className="mobile-topbar-logo-name">CampusPulse</span>
        </div>
        <button
          className="mobile-hamburger"
          onClick={() => setSidebarOpen(s => !s)}
          aria-label="Open navigation"
          aria-expanded={sidebarOpen}
          aria-controls="main-sidebar"
        >
          <IconMenu size={18} />
        </button>
      </header>

      {/* Main content */}
      <div className="main-content">
        {currentPage === 'home' && <LandingPage navigate={navigate} />}
        {currentPage === 'events' && <EventsListPage navigate={navigate} />}
        {currentPage === 'event-detail' && (
          <EventDetailPage eventId={selectedEventId} navigate={navigate} />
        )}
        <Footer navigate={navigate} />
      </div>
    </div>
  );
}

export default App;
